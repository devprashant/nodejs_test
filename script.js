//Architecting the Project
var http = require("http");
var fs = require("fs");
http.createServer(function (req, res){
   var content = "";
   var type = '';
   if (req.url === '/'){
       content = fs.readFileSync('web/page.html');
       type = "text/html";
   } else if (req.url === 'web/style.css'){
       content = fs.readFileSync('web/style.css');
       type = "text/css";
   }
   res.writeHead(200, { 'Content-Type' : type});
   res.end(content + '\n');
}).listen(1337, 'https://nodejst-prashantdawar.c9.io');

console.log('Server running at http://127.0.0.1:1337/');