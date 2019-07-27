var http = require("http")
var app = require('./app')
var server = http.createServer(app)
var port = process.env.PORT || 8080

server.listen(port,()=>{
    console.log("Server running on "+port);
})