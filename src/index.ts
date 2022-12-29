// const http = require('http');

// const port = 8000

// const server = http.createServer((req, res) => {
//    if(req.method === 'GET' && req.url === '/'){ 
//     res.statusCode = 400
//     res.end('success')}
// })

// server.listen(port, () => { return `Server listening on ${port}`})

import app  from './server'

const port = 8000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})