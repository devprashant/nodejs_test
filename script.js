//Managing child processes using spawn

var spawn = require("child_process").spawn;
var command = spawn('git', ['push']);
command.stdout.on('data', function (data){
    console.log('stdout: ' + data);
});

command.stderr.on('data', function (data){
    console.log('stderr: ' + data);
});

command.on('close', function (code){
    console.log('child process exited with code ' + code) ;
});