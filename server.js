var http = require("http"), res;
var controller = function(request, response){
    res = response;
    if (request.url === '/on'){
        model.update(true);
    } else if (request.url === '/off'){
        model.update(false);
    } else {
        view.render();
    }
};
http.createServer(controller).listen(process.env.PORT, process.env.IP);
console.log('Server running at http://'+process.env.IP+":"+process.env.PORT);


var view = {
    render: function() {
        var html = '';
        html += '<!DOCTYPE html>';
        html += '<html>';
        html += '<head><title>Node.js byexample</title></head>';
        html += '<body>';
        html += '<h1>Status ' + (model.status ? 'on' : 'off') + '</h1>';
        html += '<a href="/on">switch on</a><br />';
        html += '<a href="/off">switch off</a><br />';
        html += '</body>';
        html += '</html>';
        res.writeHead(200, { 'Content-Type' : 'text/html'});
        res.end(html + '\n');
    }
};

var model = {
    status: false,
    update: function(s) {
        this.status = s;
        view.render();
    }
};