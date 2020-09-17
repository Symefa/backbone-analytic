const express = require('express')
const cors = require('cors')
const jsend = require('jsend')
const app = express()
const router = express.Router()
const swaggerUI = require('swagger-ui-express')
const openApiDoc = require('./docs')


//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(jsend.middleware)


//DOC
app.use('/api/v1',router)
app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(openApiDoc.default()))
app.get('*', (req, res, next) => {
    res.status(200).json({
        message: "Server Analytic ON",
        status: 200
    })
})

module.exports = app
