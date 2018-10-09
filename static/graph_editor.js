document.addEventListener('DOMContentLoaded', function () {
    create_layers(corelayers);
    let cy = cytoscape({
        container: document.getElementById('cy'), // container to render in
        elements: [],
        style: cyto_styles
    });

    let edge_bending_options = {
        // this function specifies the positions of bend points
        bendPositionsFunction: function (ele) {
            return ele.data('bendPointPositions');
        },
        // whether to initilize bend points on creation of this extension automatically
        initBendPointsAutomatically: true,
        // whether the bend editing operations are undoable (requires cytoscape-undo-redo.js)
        undoable: false,
        // the size of bend shape is obtained by multipling width of edge with this parameter
        bendShapeSizeFactor: 6,
        // whether to start the plugin in the enabled state
        enabled: true,
        // title of add bend point menu item (User may need to adjust width of menu items according to length of this option)
        addBendMenuItemTitle: "Add Bend Point",
        // title of remove bend point menu item (User may need to adjust width of menu items according to length of this option)
        removeBendMenuItemTitle: "Remove Bend Point",
        // whether the bend point can be moved by arrow keys
        moveSelectedBendPointsOnKeyEvents: function () {
            return true;
        }
    };

    cy.edgeBendEditing(edge_bending_options);
    center_layout(cy);

    let options = {
        // List of initial menu items
        menuItems: [
            {
                id: 'remove', // ID of menu item
                content: 'remove', // Display content of menu item
                tooltipText: 'remove', // Tooltip text for menu item
                selector: 'node, edge',
                onClickFunction: function (event) { // The function to be executed on click
                    let target = event.target || event.cyTarget;
                    target.remove();
                    $('#' + target.id()).remove();
                    restart_validate_button();
                },
                disabled: false, // Whether the item will be created as disabled
                hasTrailingDivider: true, // Whether the item will have a trailing divider
                coreAsWell: false // Whether core instance have this item on cxttap
            },
            {
                id: 'add-node',
                content: 'add node',
                tooltipText: 'add node',
                selector: 'node',
                coreAsWell: true,
                onClickFunction: function (event) {
                    add_new_node(event);

                }
            }
        ]
    };
    cy.contextMenus(options);
    cy.edgehandles({snap: true});


    let ur = cy.undoRedo({
        undoableDrag: false
    });
    cy.clipboard();

    document.addEventListener("keydown", function (e) {
        restart_validate_button();
        if ((e.ctrlKey || e.metaKey) && e.target.nodeName === 'BODY') {
            if (e.which === 67) // CTRL + C
                cy.clipboard().copy(cy.$(":selected"));
            else if (e.which === 86) // CTRL + V
                ur.do("paste");
            else if (e.which === 65) { // + A
                cy.elements().select();
                e.preventDefault();
            }
        } else if (e.which === 46 || e.which === 8) { // + Remove
            if ($(":focus").length === 0) {
                var node = cy.nodes().filter((node) => (node.selected()));
                node.remove();
                $('#' + node.id()).remove();
            }
        }
    });

    cy.on('tap', function (event) {
        let evtTarget = event.target;
        if (evtTarget === cy) {
            add_new_node(event);
        }
    });

    cy.on('tap', 'node', function (evt) {
        clear_properties();
        show_properties(evt.target.data().content, evt.target.id());
    });

    cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
        if (targetNode.data().name === 'InputLayer') {
            addedEles.remove();
        } else if (targetNode.indegree() > 1 && !(targetNode.data().name in corelayers['Merge Layers'])) {
            addedEles.remove();
        }
        restart_validate_button();
    });


    $('#properties').bind('input', function (e) {
        let id = $('#node_name').val();
        let new_value_id = e.target.id;
        let cy_element = cy.getElementById(id).data().content[new_value_id];
        if (is_valid(cy_element['type'], e.target.value)) {
            e.target.classList.remove('invalid');
            $('#download_model').prop('disabled', false);
            $('#validate_model').prop('disabled', false);
        } else {
            e.target.classList.add('invalid');
            $('#download_model').prop('disabled', true);
            $('#validate_model').prop('disabled', true);
        }
        cy_element['value'] = e.target.value;
        restart_validate_button();
    });

    function add_new_node(event) {
        let radio_checked = document.querySelector('input[name="radio"]:checked');
        if (radio_checked) {
            let id_checked = document.querySelector('input[name="radio"]:checked').id;
            let root = Object.keys(corelayers).find(key => id_checked in corelayers[key]);
            Object.keys(corelayers).forEach(function (key) {
                if (id_checked in corelayers[key]) {
                    let new_node = cy.add({
                        group: "nodes",
                        data: {
                            name: id_checked,
                            root: root,
                            weight: 75,
                            content: $.extend(true, {}, corelayers[key][id_checked])
                        },
                        position: event.position
                    });
                    restart_validate_button();
                }
                add_icons_nodes();
            });
        }
    }

    function add_icons_nodes() {
        cy.nodeHtmlLabel(Object.keys(fa_corelayers).map(function (key) {
                return {
                    query: "node[root = '" + key + "']",
                    tpl: function (data) {
                        return "<p class='icon_layer'> <i class='" + fa_corelayers[data.root] + "'> </i>" + data.name + "</p>"
                    }
                }
            })
        );
    }

    function check_input_output() {
        let input_nodes = cy.filter('node[name = "InputLayer"]');
        let output_nodes = cy.filter('node[name = "Loss"]');
        if (input_nodes.length < 1 || output_nodes.length !== 1)
            return false;
        return true;
    }

    $('#validate_model').on('click', async function () {
        if (!check_input_output()) {
            alert("Just one Input and one Loss layers required");
            restart_validate_button();
            return false;
        } else {
            cy.remove(cy.nodes().filter((node) => (!('name' in node.data()))));
            let loss_node = cy.nodes().filter((node) => (node.data('name') === 'Loss'));
            let edges = loss_node.connectedEdges();
            let loss_function = loss_node.data('content')['function'].value;
            cy.remove(loss_node);
            let sorted_nodes = sort_nodes(cy);
            let models = create_json_model(sorted_nodes);
            cy.add(loss_node);
            cy.add(edges);
            await tf_load_model(sorted_nodes, models, loss_function, cy, loss_node);
        }
    });

    $('#zoom_handler').on('click', function () {
        center_layout(cy);
    });

    $('#zoom_plus').on('click', function () {
        let zoom = cy.zoom();
        cy.zoom({level: zoom + 0.1});
    });

    $('#zoom_minus').on('click', function () {
        let zoom = cy.zoom();
        cy.zoom({level: zoom - 0.1});
    });

    $('#download_model').on('click', function () {
        let $validate_model = $('#validate_model');
        if (!($validate_model.attr('class').includes('success'))) {
            alert('Your model is not validate, please validate before download.')
        } else {
            var model = localStorage.getItem('model');
            let model_json = JSON.parse(model);
            download(encode(JSON.stringify(model_json, null, 4)));
        }
    });

    $('#download_ex').on('click', function () {
        let link = $('<a>')
            .attr('href', 'static/files/example.html')
            .attr('download', 'example.html');
        link[0].click();
        link.remove();
    });
});

async function tf_load_model(nodes, models, loss_function, cy, loss_node) {
    let blob = new Blob([encode(JSON.stringify(models['tensorflowjs_json'], null, 4))], {
        type: 'application/octet-stream'
    });
    let url = URL.createObjectURL(blob);
    try {
        const model = await tf.loadModel(url);
        var topology = model.toJSON(null, false);
        var model_json = {"modelTopology": topology};
        localStorage.setItem('model', JSON.stringify(model_json));

        create_poppers(model.layers, nodes, cy, loss_node);
        $('#submit').prop('disabled', false);
        $('#validate_model').addClass('btn-success');
        return true;
    } catch (error) {
        alert(error);
        restart_validate_button();
        return false;
    }
}
