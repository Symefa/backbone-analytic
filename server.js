const http = require('http')
const app = require('./server/app')
require('dotenv').config()

const port = process.env.PORT || '4001'
const server = http.createServer(app)

server.listen(port, async () => {
    console.log(`Server running at port ${port}`)
})
