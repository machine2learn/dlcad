var fa_corelayers = {
    'Advanced Activations Layers': 'fas fa-signature',
    'Convolutional Layers': 'fas fa-th',
    'Core Layers': 'fas fa-sitemap',
    'Input Layers': 'fas fa-arrow-right',
    'Merge Layers': 'fas fa-bezier-curve',
    'Normalization Layers': 'fas fa-chart-bar',
    'Pooling Layers': 'fas fa-th-large',
    'Recurrent Layers': 'fas fa-server',
    'Loss Functions': 'fas fa-arrow-left',
};

var corelayers = {
    "Input Layers": {
        "InputLayer": {
            "input_shape": {"type": "integer_list", "value": "[1,10]"},
            "dtype": {
                "type": "select",
                "options": ["float32", "float64", "int32"],
                "value": "float32"
            },
            "sparse": {"type": "boolean", "value": false},
            "class_name": "InputLayer"
        },
    },

    "Core Layers": {

        "Activation": {
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            }, "class_name": "Activation"
        },


        "Dense": {
            "units": {"type": "integer", "value": 100, "min": 1},
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "use_bias": {"type": "boolean", "value": true},
            "trainable": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },

            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null,  "l1l2"], "value": null},
            "class_name": "Dense"
        },

        "Dropout": {
            "rate": {"type": "float", "value": 0, "min": 0, "max": 1},
            "noise_shape": {"type": "integer_list", "value": null},
            // "seed": {"type": "integer", "value": null, "min": 0}, TODO
            "class_name": "Dropout"
        },


        "Embedding": {
            "input_dim": {"type": "integer", "value": 1, "min": 1},
            "output_dim": {"type": "integer", "value": 1, "min": 0},
            "embeddings_initializer": {
                "type": "select",
                "options": [null, "glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": null
            },
            "embeddings_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "embeddings_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "mask_zero": {"type": "boolean", "value": false},
            "inputLength": {"type": "integer_list", "value": null},
            "class_name": "Embedding"
        },

        "Flatten": {
            "input_shape": {"type": "integer_list", "value": null},
            "batchInputShape": {"type": "integer_list", "value": null},
            "batchSize": {"type": "integer", "value": null, "min": 0},
            "dtype": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "trainable": {"type": "boolean", "value": false},
            "updatable": {"type": "boolean", "value": false},
            "inputDType": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "class_name": "Flatten"
        },

        "RepeatVector": {
            "n": {"type": "integer", "value": 1, "min": 0},
            "class_name": "RepeatVector"
        },
        "Permute": {
            "dims": {"type": "integer_list", "value": null},
            "class_name": "Permute"
        },
        "Reshape": {
            "targetShape": {"type": "integer_list", "value": null},
            "class_name": "Reshape"
        }
    },


    "Convolutional Layers": {

        "Conv1D": {
            "kernel_size": {"type": "integer_list", "value": null},
            "filters": {"type": "integer", "value": 1, "min": 1},
            "strides": {"type": "integer_list", "value": null},
            "padding": {"type": "select", "options": ["valid", "causal", "same"], "value": "valid"},
            "dataFormat": {"type": "select", "options": [null, "channels_last", "channels_first"], "value": null},
            "dilationRate": {"type": "integer_list", "value": null},

            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "class_name": "Conv1D"
        },

        "Conv2D": {
            "kernel_size": {"type": "integer_list", "value": null},
            "filters": {"type": "integer", "value": 1, "min": 1},
            "strides": {"type": "integer_list", "value": null},
            "padding": {"type": "select", "options": ["valid", "causal", "same"], "value": "valid"},
            "dataFormat": {"type": "select", "options": [null, "channels_last", "channels_first"], "value": null},
            "dilationRate": {"type": "integer_list", "value": null},

            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "class_name": "Conv2D"
        },


        "Conv2DTranspose": {
            "kernel_size": {"type": "integer_list", "value": null},
            "filters": {"type": "integer", "value": 1, "min": 1},
            "strides": {"type": "integer_list", "value": null},
            "padding": {"type": "select", "options": ["valid", "causal", "same"], "value": "valid"},
            "dataFormat": {"type": "select", "options": [null, "channels_last", "channels_first"], "value": null},
            "dilationRate": {"type": "integer_list", "value": null},

            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "class_name": "Conv2DTranspose"
        },


        "DepthwiseConv2D": {
            "kernel_size": {"type": "integer_list", "value": null},
            "filters": {"type": "integer", "value": 1, "min": 1},
            "strides": {"type": "integer_list", "value": null},
            "padding": {"type": "select", "options": ["valid", "causal", "same"], "value": "valid"},
            "dataFormat": {"type": "select", "options": [null, "channels_last", "channels_first"], "value": null},
            "dilationRate": {"type": "integer_list", "value": null},

            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "class_name": "DepthwiseConv2D"
        },

    },


    "Merge Layers": {
        "Add": {
            "dtype": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "trainable": {"type": "boolean", "value": false},
            "updatable": {"type": "boolean", "value": false},

            "class_name": "Add"
        },

        "Average": {
            "dtype": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "trainable": {"type": "boolean", "value": false},
            "updatable": {"type": "boolean", "value": false},

            "class_name": "Average"
        },

        "Concatenate": {
            "axis": {"type": "integer", "value": -1},
            "class_name": "Concatenate"
        },


        "Maximum": {
            "dtype": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "trainable": {"type": "boolean", "value": false},
            "updatable": {"type": "boolean", "value": false},

            "class_name": "Maximum"
        },

        "Minimum": {
            "dtype": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "trainable": {"type": "boolean", "value": false},
            "updatable": {"type": "boolean", "value": false},

            "class_name": "Minimum"
        },


        "Multiply": {
            "dtype": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "trainable": {"type": "boolean", "value": false},
            "updatable": {"type": "boolean", "value": false},
            "class_name": "Multiply"
        },

    },

    "Normalization Layers": {
        "BatchNormalization": {
            "axis": {"type": "integer", "value": -1},
            "momentum": {"type": "float", "value": 0.99},
            "epsilon": {"type": "float", "value": 0.001},
            "center": {"type": "boolean", "value": true},
            "scale": {"type": "boolean", "value": true},
            "beta_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "gamma_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "ones"
            },
            "moving_mean_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "moving_variance_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "ones"
            },
            "beta_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "gamma_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "beta_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "gamma_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "class_name": "BatchNormalization"
        },
    },


    "Pooling Layers": {
        "AveragePooling1D": {
            "pool_size": {"type": "integer", "value": null},
            "strides": {"type": "integer", "value": null},
            "padding": {"type": "select", "options": ["valid", "causal", "same"], "value": "valid"},
            "class_name": "AveragePooling1D"
        },
        "AveragePooling2D": {
            "pool_size": {"type": "integer_list", "value": null},
            "strides": {"type": "integer_list", "value": null},
            "padding": {"type": "select", "options": ["valid", "causal", "same"], "value": "valid"},
            "data_format": {"type": "select", "options": [null, "channels_last", "channels_first"], "value": null},
            "class_name": "AveragePooling2D"
        },

        "GlobalAveragePooling1D": {

            "dtype": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "trainable": {"type": "boolean", "value": false},
            "updatable": {"type": "boolean", "value": false},

            "class_name": "GlobalAveragePooling1D"
        },


        "GlobalAveragePooling2D": {
            "data_format": {
                "type": "select",
                "options": [null, "channels_last", "channels_first"],
                "value": null
            }, "class_name": "GlobalAveragePooling2D"
        },

        "GlobalMaxPooling1D": {

            "dtype": {
                "type": "select",
                "options": ["float32", "int32", "bool"],
                "value": "float32"
            },
            "trainable": {"type": "boolean", "value": false},
            "updatable": {"type": "boolean", "value": false},

            "class_name": "GlobalMaxPooling1D"
        },

        "GlobalMaxPooling2D": {
            "data_format": {
                "type": "select",
                "options": [null, "channels_last", "channels_first"],
                "value": null
            }, "class_name": "GlobalMaxPooling2D"
        },

        "MaxPooling1D": {
            "pool_size": {"type": "integer", "value": null},
            "strides": {"type": "integer", "value": null},
            "padding": {"type": "select", "options": ["valid", "causal", "same"], "value": "valid"},
            "class_name": "MaxPooling1D"
        },
        "MaxPooling2D": {
            "pool_size": {"type": "integer_list", "value": null},
            "strides": {"type": "integer_list", "value": null},
            "padding": {"type": "select", "options": ["valid", "causal", "same"], "value": "valid"},
            "data_format": {"type": "select", "options": [null, "channels_last", "channels_first"], "value": null},
            "class_name": "MaxPooling2D"
        }

    },

    "Recurrent Layers": {
        "GRU": {
            "units": {"type": "integer", "value": 100, "min": 1},
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "recurrent_activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "hardSigmoid"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "recurrent_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "orthogonal"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "recurrent_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "recurrent_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "dropout": {"type": "float", "value": 0.0},
            "recurrent_dropout": {"type": "float", "value": 0.0},
            "return_sequences": {"type": "boolean", "value": false},
            "return_state": {"type": "boolean", "value": false},
            "go_backwards": {"type": "boolean", "value": false},
            // "stateful": {"type": "boolean", "value": false},
            "unroll": {"type": "boolean", "value": false},
            "reset_after": {"type": "boolean", "value": false},
            "class_name": "GRU"
        },

        "GRUCell": {
            "units": {"type": "integer", "value": 100, "min": 1},
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "recurrent_activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "hardSigmoid"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "recurrent_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "orthogonal"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "recurrent_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "recurrent_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "dropout": {"type": "float", "value": 0.0},
            "recurrent_dropout": {"type": "float", "value": 0.0},
            "reset_after": {"type": "boolean", "value": false},
            "class_name": "GRUCell"
        },

        "LSTM": {
            "units": {"type": "integer", "value": 100, "min": 1},
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "recurrent_activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "hard_sigmoid"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "recurrent_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "orthogonal"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "unit_forget_bias": {"type": "boolean", "value": true},
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "recurrent_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "recurrent_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "dropout": {"type": "float", "value": 0.0},
            "recurrent_dropout": {"type": "float", "value": 0.0},
            "return_sequences": {"type": "boolean", "value": false},
            "return_state": {"type": "boolean", "value": false},
            "go_backwards": {"type": "boolean", "value": false},
            "stateful": {"type": "boolean", "value": false},
            "unroll": {"type": "boolean", "value": false},
            "class_name": "LSTM"
        },
        "LSTMCell": {
            "units": {"type": "integer", "value": 100, "min": 1},
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "recurrent_activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "hard_sigmoid"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "recurrent_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "orthogonal"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "unit_forget_bias": {"type": "boolean", "value": true},
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "recurrent_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "recurrent_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "dropout": {"type": "float", "value": 0.0},
            "recurrent_dropout": {"type": "float", "value": 0.0},
            "class_name": "LSTMCell"
        },

        "RNN": {
            "return_sequences": {"type": "boolean", "value": false},
            "return_state": {"type": "boolean", "value": false},
            "go_backwards": {"type": "boolean", "value": false},
            "stateful": {"type": "boolean", "value": false},
            "unroll": {"type": "boolean", "value": false},
            "class_name": "RNN"
        },
        "SimpleRNN": {
            "units": {"type": "integer", "value": 100, "min": 1},
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "recurrent_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "orthogonal"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "recurrent_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            //"activity_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "recurrent_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "dropout": {"type": "float", "value": 0.0},
            "recurrent_dropout": {"type": "float", "value": 0.0},
            "return_sequences": {"type": "boolean", "value": false},
            "return_state": {"type": "boolean", "value": false},
            "go_backwards": {"type": "boolean", "value": false},
            "stateful": {"type": "boolean", "value": false},
            "unroll": {"type": "boolean", "value": false},
            "class_name": "SimpleRNN"
        },

        "SimpleRNNCell": {
            "units": {"type": "integer", "value": 100, "min": 1},
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "recurrent_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "orthogonal"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "recurrent_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "recurrent_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "dropout": {"type": "float", "value": 0.0},
            "recurrent_dropout": {"type": "float", "value": 0.0},
            "class_name": "SimpleRNNCell"
        },

        "StackedRNNCells": {
            "units": {"type": "integer", "value": 100, "min": 1},
            "activation": {
                "type": "select",
                "options": ["elu", "hardSigmoid", "linear", "relu", "relu6", "selu", "sigmoid", "softmax", "softplus", "softsign", "tanh"],
                "value": "relu"
            },
            "use_bias": {"type": "boolean", "value": true},
            "kernel_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "glorotUniform"
            },
            "recurrent_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "orthogonal"
            },
            "bias_initializer": {
                "type": "select",
                "options": ["glorotNormal", "glorotUniform", "heNormal", "identity", "leCunNormal", "ones", "orthogonal", "randomNormal", "randomUniform", "truncatedNormal", "varianceScaling", "zeros"],
                "value": "zeros"
            },
            "kernel_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "recurrent_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "bias_regularizer": {"type": "select", "options": [null, "l1l2"], "value": null},
            "kernel_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "recurrent_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "bias_constraint": {
                "type": "select",
                "options": [null, "maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
                "value": null
            },
            "dropout": {"type": "float", "value": 0.0},
            "recurrent_dropout": {"type": "float", "value": 0.0},
            "class_name": "StackedRNNCells"
        },
    },
    //TODO
    // "Layers wrappers": {
    //     "Bidirectional": {
    //         "merge_mode": {
    //             "type": "select",
    //             "options": ["concat", "sum", "mul", "ave", null],
    //             "value": "concat"
    //         }, "class_name": "Bidirectional"
    //     },
    //     "TimeDistributed": {"class_name": "TimeDistributed"}
    //
    // },

    "Advanced Activations Layers": {
        "ELU": {
            "alpha": {
                "type": "float",
                "value": 1.0
            },
            "class_name": "ELU"
        },
        "LeakyReLU": {
            "alpha": {
                "type": "float",
                "value": 1.0
            },
            "class_name": "LeakyReLU"
        },
        "Softmax": {
            "axis": {
                "type": "integer",
                "value": -1
            },
            "class_name": "Softmax"
        },
        "ThresholdedReLU": {
            "theta": {
                "type": "float",
                "value": null
            },
            "class_name": "ThresholdedReLU"
        }
    },

    "Loss Functions": {
        "Loss": {
            "function": {
                "type": "select",
                "options": ["mean_squared_error", "mean_absolute_error", "mean_absolute_percentage_error", "mean_squared_logarithmic_error", "squared_hinge", "hinge", "categorical_hinge", "logcosh", "categorical_crossentropy", "sparse_categorical_crossentropy", "binary_crossentropy", "kullback_leibler_divergence", "poisson", "cosine_proximity"],
                "value": "mean_squared_error"
            },
            "class_name": "Loss"
        },
    }
};
