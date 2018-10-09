function create_layers(corelayers) {
    Object.keys(corelayers).forEach(function (key) {
        let card = $('<div></div>').attr('id', 'card-' + key);
        $('#accordion').append(card);
        $(`#card-${key}`).addClass('card');

        let card_header = $('<div></div>').attr('id', `card-header-${key}`);
        card.append(card_header);

        let button = $('<button></button>');
        button
            .attr('data-toggle', 'collapse')
            .attr('data-target', "#collapse-" + key)
            .attr('aria-expanded', 'false')
            .attr('aria-controls', 'collapse-' + key)
            .attr('data-parent', "#accordion")
            .attr('id', key);
        let i = $('<i class="' + fa_corelayers[key] + '"></i><br>');

        $(`[id='card-header-${key}']`).append(button);
        $(`[id='${key}']`)
            .append(i)
            .append(key);

        // COLLAPSE
        let collapsible = $('<div></div>');
        collapsible
            .attr('id', 'collapse-' + key)
            .attr('aria-labelledby', 'card-header-' + key)
            .attr('data-parent', "#accordion");

        $(`[id='card-${key}']`).append(collapsible);
        collapsible.addClass('collapse show card-body');

        Object.keys(corelayers[key]).forEach(function (val) {

            const label = $('<label>');
            const input = $('<input>');
            input.attr('id', val)
                .attr('type', 'radio')
                .attr('name', 'radio');
            label.append(input);

            const span = $('<span>');
            span.html(val);
            label.append(span);
            collapsible.append(label);

        });
    });
    $('.collapse').collapse();
}


let fn_dic = {
    'select': (key, item, value) => add_input_select(key, item['options'], value),
    'boolean': (key, item, value) => add_input_select(key, ['true', 'false'], value),
    'integer': (key, item, value) => add_input_number(key, value, item, '1'),
    'float': (key, item, value) => add_input_number(key, value, item, 'any'),
    'text': (key, item, value) => add_input(key, value, 'text'),
    'integer_list': (key, item, value) => add_input(key, value, 'integer_list')
};

function show_properties(content, id) {
    for (let key in content) {
        if (content.hasOwnProperty(key)) {
            const item = content[key];
            if (key !== 'class_name') {
                fn_dic[item.type](key, item, item['value']);
            }
        }
    }
    let x = $('<input>').attr('value', id).attr('id', 'node_name');
    $('#properties').append(x);
    $('#node_name').hide();
}

function clear_properties() {
    $('.properties').empty();
}

function add_input(label_name, default_value, type_input) {
    add_label(label_name);

    let x = $('<input>');
    x
        .attr("type", 'text')
        .attr("id", label_name)
        .attr("name", label_name)
        .attr("value", default_value);

    $('.properties').append(x);
    if (!(is_valid(type_input, default_value))) {
        x.addClass('invalid');
        $('#download_model').prop('disabled', true);
        $('#validate_model').prop('disabled', true);
    }

}

function add_input_number(label_name, default_value, content, input_step) {
    add_label(label_name);

    let x = $("<input>")
        .attr("type", "number")
        .attr("id", label_name)
        .attr("name", label_name)
        .attr("value", default_value);

    if ('min' in content) {
        x.attr("min", content['min']);
    }

    x.attr("step", input_step);
    let properties = $(".properties");
    properties.append(x);

    let sp = $('<span>').addClass('validity');
    properties.append(sp);

}

function add_input_select(label_name, options, value) {
    add_label(label_name);

    let selectList = $("<select>")
        .attr('id', label_name)
        .attr('name', label_name);

    let option_list = options.map((key) => $('<option>').val(key).text(key));
    selectList.append(option_list);
    $('.properties').append(selectList);
    $('#' + label_name).val(String(value));
}

function add_label(label_name) {
    let label = document.createTextNode(label_name);
    $('.properties').append(label);
}

function encode(s) {
    let enc = new TextEncoder();
    return enc.encode(s);
}

function download(data) {
    let blob = new Blob([data], {
        type: 'application/octet-stream'
    });
    let url = URL.createObjectURL(blob);
    let link = $('<a>')
        .attr('href', url)
        .attr('download', 'model.json');
    link[0].click();
    URL.revokeObjectURL(url);
    link.remove();
}

// TODO validate different types
function is_valid(type, value) {
    if (type === 'integer_list') {
        let list_number = RegExp('^\[[0-9]+(,[0-9]+)*\]$');
        let only_number =  new RegExp('^[0-9]+$');
        return list_number.test(value) || only_number.test(value) || value===null || value===''
    }
    return true;
}

function create_json_model(nodes) {
    const js_json = {"modelTopology": {"keras_version": "2.1.6", "backend": "tensorflow", 'model_config': {}}};
    const py_json = {"keras_version": "2.2.0", "backend": "tensorflow", "class_name": "Model"};
    const config = {"name": "model_1", "layers": []};

    nodes = nodes.filter((node) => ('name' in node.data() && node.data('name') !== 'Loss')); //TODO: Remove the extra node from handling edges

    config['layers'] = nodes
        .map(function (node) {
            const inbound_nodes = node
                .incomers()
                .filter((ele) => ele.isNode())
                .map((ele) => [ele.id(), 0, 0, {}]);

            return {
                'class_name': node.data('name'),
                'name': node.id(),
                "inbound_nodes": [inbound_nodes],
                'config': create_layer_config(node.data('content'))
            };
        });

    config['input_layers'] = nodes
        .roots()
        .map((node) => [node.id(), 0, 0]);

    config['output_layers'] = nodes
        .leaves()
        .map((node) => [node.id(), 0, 0]);

    py_json['config'] = config;
    js_json['modelTopology']['model_config'] = {
        'config': config,
        'class_name': 'Model'
    };
    return {'keras_json': py_json, 'tensorflowjs_json': js_json}
}


let ly_dic = {
    'integer_list': (value) => JSON.parse(value),
    'float': (value) => parseFloat(value),
    'integer': (value) => parseInt(value),
    'boolean': (value) => {
        return value
    },
    'select': (value) => {
        return value
    },
    'text': (value) => {
        return value
    }
};

function create_layer_config(content) {
    let layer_config = {};
    Object.keys(content).map(function (param) {
        if (param !== 'class_name')
            layer_config[param] = ly_dic[content[param]['type']](content[param]['value']);
    });
    return layer_config;
}


function center_layout(cy) {
    let layout = cy.layout({name: 'dagre'});
    layout.run();
    let maxZoom = cy.maxZoom();
    cy.maxZoom(1.2)
        .fit()
        .maxZoom(maxZoom)
        .center();
}

function sort_nodes(cy) {
    let s = [];
    let explored = [];

    function dfs(node, explored, s) {
        explored.push(node);
        node.outgoers().forEach(n => {
            if (n.isNode() && explored.indexOf(n) < 0) {
                dfs(n, explored, s)
            }
        });
        s.push(node);
    }


    let input_nodes = cy.nodes().filter((node) => 'name' in node.data()).roots();
    input_nodes.forEach(node => {
        if (explored.indexOf(node) < 0) {
            dfs(node, explored, s);
        }

    });

    s.reverse().forEach(function (el, idx) {
        el.data()['depth'] = idx;
    });
    return cy.nodes().sort(function (a, b) {
        return a.data('depth') - b.data('depth');
    });
}


function restart_validate_button() {
    $('#validate_model').removeClass('btn-success');
    $("div.popper-div").remove();
}


function create_popper(cy, node, id, text) {
    let makeDiv = function (text, id) {
        var div = $('<div></div>').attr('id', id)
            .addClass('popper-div')
            .text('(' + text + ')')
            .appendTo('body');
        return div;
    };
    let popperA = node.popper({
        content: function () {
            return makeDiv(text, id);
        }
    });
    let updateA = function () {
        popperA.scheduleUpdate();
    };

    node.on('position', updateA);
    cy.on('pan zoom resize', updateA);
}

function create_poppers(layers, nodes, cy, loss_node) {
    $("div.popper-div").remove();
    let shapes = layers.map(function (layer) {
        if ('batchInputShape' in layer)
            return String(add_ba_size(layer.batchInputShape));
        if ('kernel' in layer)
            return String(add_ba_size(layer.kernel.shape));
        if ('outputShape' in layer)
            return String(add_ba_size(layer.outputShape));
        return ''
    });
    zip([shapes, nodes]).map(p => create_popper(cy, p[1], p[1].id(), p[0]));
    let last_shape = shapes[shapes.length - 1];
    let last_shape_split = last_shape.split(',');
    create_popper(cy, loss_node, loss_node.id(), 'None,' + last_shape_split[last_shape_split.length - 1])
}

function add_ba_size(shape) {
    if (shape[0] == null || shape[0] === "None")
        shape[0] = 'None';
    else
        shape.unshift("None");
    return shape
}

function zip(arrays) {
    return arrays[0].map(function (_, i) {
        return arrays.map(function (array) {
            return array[i]
        })
    });
}
