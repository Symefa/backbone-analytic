const allDocs = [

]
let apiDoc = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "Analytic Documentation",
    },
    servers: [
        {
            url: "/api/v1",
        },
    ],
    paths: {},
    components: {
        schemas: {
            ErrorResponse: {
                type: "object",
                properties: {
                    statusesId: {
                        type: "string",
                    },
                    message: {
                        type: "string",
                    },
                },
            },
        },
    },
}
allDocs.forEach((doc) => {
    apiDoc.paths = Object.assign(Object.assign({},apiDoc.paths),doc.paths)
    apiDoc.components.schemas = Object.assign(Object.assign({},apiDoc.components.schemas),doc.schema)
})
exports.default = () => {
    return apiDoc
}
