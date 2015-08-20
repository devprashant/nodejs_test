var http = require("http");
var url = require("url");
var controller = function(req, res) {
    var message = '';
    switch(req.method){
        case 'GET': message = "Thats GET message"; break;
        case 'POST': message = "That's POST message"; break;
        case 'PUT': message = "That's PUT message"; break;
        case 'DELETE' : message = "That's DELETE message"; break;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(message + "\n");
}
http.createServer(controller).listen(process.env.PORT, process.env.IP);
console.log('Server running at http://'+ process.env.IP + ":"+process.env.PORT);