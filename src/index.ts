// const http = require('http');

// const port = 8000

// const server = http.createServer((req, res) => {
//    if(req.method === 'GET' && req.url === '/'){ 
//     res.statusCode = 400
//     res.end('success')}
// })

// server.listen(port, () => { return `Server listening on ${port}`})

import app  from './server'
//you have to do this to make your secrets accessible to the entirety of your server.
import * as dotenv from 'dotenv'
dotenv.config()

const port = 8000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})