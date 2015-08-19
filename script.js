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
   } else if (req.url === 'api/user/new'){
       // Do actions like
       // reading POST parameters
       // storing the user into the database
       content = '{"sucess" : true}';
       type = 'application/json';
   }
   res.writeHead(200, { 'Content-Type' : type});
   res.end(content + '\n');
}).listen(process.env.PORT, process.env.IP);

console.log('Server running at ' + process.env.IP + ":" + process.env.PORT);