let selected_color = '#666666';
let white = '#ffffff';

let light_color1 = '#5194ac';
let light_color2 = '#939eac';
let light_color3 = '#93a8b6';
let light_color4 = '#93a8c0';
let light_color5 = '#93a8ca';
let light_color6 = '#93a8a2';
let light_color7 = '#93a898';
let light_color8 = '#93a88e';

let color1 = '#294857';
let color2 = '#485157';
let color3 = '#465257';
let color4 = '#404b57';
let color5 = '#3e4457';
let color6 = '#505a55';
let color7 = '#4d5850';
let color8 = '#4c5749';

var cyto_styles = [
    {
        selector: 'node',
        style: {
            'text-valign': 'center',
            'color': 'white',
            'width': 200,
            'height': 40,
            'shape': 'roundrectangle'
        }
    },
    {
        selector: 'node:selected',
        style: {
            'border-width': 3,
            'border-color': selected_color

        }
    },
    {
        selector: "node[root = 'Input Layers']",
        style: {
            'background-color': light_color1,
        }
    },
    {
        selector: "node[root = 'Input Layers']:selected",
        style: {
            'background-color': color1,
        }
    },

    {
        selector: "node[root = 'Convolutional Layers']",
        style: {
            'background-color': light_color2,
        }
    },
    {
        selector: "node[root = 'Convolutional Layers']:selected",
        style: {
            'background-color': color2,
        }
    },
    {
        selector: "node[root = 'Merge Layers']",
        style: {
            'background-color': light_color3,
        }
    },
    {
        selector: "node[root = 'Merge Layers']:selected",
        style: {
            'background-color': color3,
        }
    },
    {
        selector: "node[root = 'Normalization Layers']",
        style: {
            'background-color': light_color4,
        }
    },

    {
        selector: "node[root = 'Normalization Layers']:selected",
        style: {
            'background-color': color4,
        }
    },
    {
        selector: "node[root = 'Pooling Layers']",
        style: {
            'background-color': light_color5,
        }
    },
    {
        selector: "node[root = 'Pooling Layers']:selected",
        style: {
            'background-color': color5,
        }
    },
   {
        selector: "node[root = 'Recurrent Layers']",
        style: {
            'background-color': light_color6,
        }
    },
    {
        selector: "node[root = 'Recurrent Layers']:selected",
        style: {
            'background-color': color6,
        }
    },

      {
        selector: "node[root = 'Advanced Activations Layers']",
        style: {
            'background-color': light_color7,
        }
    },
    {
        selector: "node[root = 'Advanced Activations Layers']:selected",
        style: {
            'background-color': color7,
        }
    },


     {
        selector: "node[root = 'Core Layers']",
        style: {
            'background-color': light_color8,
        }
    },
   {
        selector: "node[root = 'Core Layers']:selected",
        style: {
            'background-color': color8,
        }
    },

     {
        selector: "node[root = 'Loss Functions']",
        style: {
            'background-color': light_color8,
        }
    },
   {
        selector: "node[root = 'Loss Functions']:selected",
        style: {
            'background-color': color8,
        }
    },

    {
        selector: 'edge',
        style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
        }
    },
    {
        selector: '.eh-handle',
        style: {
            'background-color': selected_color,
            'width': 20,
            'height': 20,
            'shape': 'ellipse',
            'overlay-opacity': 0,
            'border-width': 12, // makes the handle easier to hit
            'border-opacity': 0
        }
    },
    {
        selector: '.eh-hover',
        style: {
            'background-color': selected_color
        }
    },
    {
        selector: '.eh-source',
        style: {
            'border-width': 2,
            'border-color': selected_color
        }
    },
    {
        selector: '.eh-target',
        style: {
            'border-width': 2,
            'border-color': selected_color
        }
    },
    {
        selector: '.eh-preview, .eh-ghost-edge',
        style: {
            'background-color': selected_color,
            'line-color': selected_color,
            'target-arrow-color': selected_color,
            'source-arrow-color': selected_color
        }
    },
    {
        selector: '.eh-ghost-edge .eh-preview-active',
        style: {
            'opacity': 0
        }
    }
];