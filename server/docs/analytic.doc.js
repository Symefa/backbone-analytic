const util = require('../utils/api')
const tag = "AnalyticController"
const schema = {
    analyticsSchema : {
        title: "List Analytic",
        type: "array",
        items: {
            properties: {
                analytic: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer"
                        },
                        isDrilldown: {
                            type: "boolean"
                        },
                        chart: {
                            type: "string"
                        },
                        chartType: {
                            type: "string"
                        },
                        themeData: {
                            type: 'string'
                        },
                    }
                }
            }
        }
    },
    analyticSchema : {
        title: "Detail Analytic",
        type: "object",
        properties: {
            analytic: {
                type: "object",
                properties: {
                    id: {
                        type: "integer"
                    },
                    isDrilldown: {
                        type: "boolean"
                    },
                    chart: {
                        type: "string"
                    },
                    chartType: {
                        type: "string"
                    },
                    themeData: {
                        type: 'string'
                    },
                    components: {
                        type: "array",
                        items: {
                            properties: {
                                analyticId: {
                                    type: "integer"
                                },
                                queryStatement: {
                                    type: "string"
                                },
                                xAxisName: {
                                    type: "string"
                                },
                                yAxises: {
                                    type: "array",
                                    items: {
                                        properties: {
                                            componentId: {
                                                type: "integer"
                                            },
                                            name: {
                                                type: "string"
                                            },
                                            stackName: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    createAnalytic : {
        title: "Create Analytic",
        type: "object",
        properties: {
            is_drilldown: {
                type: "boolean"
            },
            chart_id: {
                type: "integer"
            },
            chart_type: {
                type: "integer"
            },
            theme_data: {
                type: 'string'
            },
            components: {
                type: "array",
                items: {
                    properties: {
                        query_statement: {
                            type: "string"
                        },
                        x_axis_name: {
                            type: "string"
                        },
                        y_axises: {
                            type: "array",
                            items: {
                                properties: {
                                    name: {
                                        type: "string"
                                    },
                                    column_name: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    updateAnalytic : {
        title: "Update Analytic",
        type: "object",
        properties: {
            analytic: {
                type: "object",
                properties: {
                    id: {
                        type: "integer"
                    },
                    is_drilldown: {
                        type: "boolean"
                    },
                    chart_id: {
                        type: "integer"
                    },
                    chart_type: {
                        type: "integer"
                    },
                    theme_data: {
                        type: 'string'
                    },
                    components: {
                        type: "array",
                        items: {
                            properties: {
                                query_statement: {
                                    type: "string"
                                },
                                x_axis_name: {
                                    type: "string"
                                },
                                y_axises: {
                                    type: "array",
                                    items: {
                                        properties: {
                                            name: {
                                                type: "string"
                                            },
                                            column_name: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    deleteAnalytic : {
        title: "delete Analytic",
        type: "object",
        properties: {
            analytic: {
                type: "object",
                properties: {
                    id: {
                        type: "integer"
                    },
                }
            }
        }
    },
}
const paths = {
    "/analytics": {
        get: {
            tags : [tag],
            responses: {
                200: {
                    description : "List All Analytic",
                    content: {
                        "application/json": {
                            schema: util.getSchemaResponse("analyticsSchema","analyticsSchema","object")
                        }
                    }
                }
            }
        }
    },
    "/analytic": {
        get: {
            tags:[tag],
            parameters: [
                {
                    name: 'id',
                    in: 'query',
                    schema: {
                        type: 'integer'
                    },
                    required: true
                }
            ],
            responses: {
                200: {
                    description : "Detail Analytic",
                    content: {
                        "application/json": {
                            schema: util.getSchemaResponse("analyticSchema","analyticSchema","object")
                        }
                    }
                }
            }
        },
        post: {
            tags: [tag],
            requestBody: {
                content: {
                    "application/json":{
                        schema: util.getSchemaRequest("createAnalytic")
                    }
                }
            },
            responses: {
                200 : {
                    description: "Create Analytic",
                    content: {
                        "application/json":{
                            schema: {
                                properties: {
                                    message: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: [tag],
            requestBody: {
                content: {
                    "application/json":{
                        schema: util.getSchemaRequest("updateAnalytic")
                    }
                }
            },
            responses: {
                200 : {
                    description: "Update Analytic",
                    content: {
                        "application/json":{
                            schema: {
                                properties: {
                                    message: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        delete: {
            tags: [tag],
            requestBody: {
                content: {
                    "application/json":{
                        schema: util.getSchemaRequest("deleteAnalytic")
                    }
                }
            },
            responses: {
                200 : {
                    description: "Delete Analytic",
                    content: {
                        "application/json":{
                            schema: {
                                properties: {
                                    message: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}
exports.default = {schema,paths}
