const util = require('../utils/api')
const tag = "DataController"
const schema = {
    dataSchema: {
        title: "Data HighChart",
        type: "object",
        properties: {
            categories: {
                type: "array",
                items: {}
            },
            series: {
                type: "array",
                items: {
                    properties: {
                        name: {
                            type: "string"
                        },
                        data: {
                            type: "array",
                            items: {}
                        }
                    }
                }
            }
        }
    },
}
const paths = {
    "/data": {
        get: {
            tags: [tag],
            parameters: [
                {
                    name: 'analytic_id',
                    in: 'query',
                    schema: {
                        type: 'integer'
                    },
                    required: true
                },
                {
                    name: 'component_id',
                    in: 'query',
                    schema: {
                        type: 'integer'
                    },
                    required: true
                },
            ],
            responses: {
                200: {
                    description: "Target Data",
                    content: {
                        "application/json": {
                            schema: util.getSchemaResponse("dataSchema", "dataSchema", "object")
                        }
                    }
                }
            }
        },
    },
}
exports.default = {schema, paths}
