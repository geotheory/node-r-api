var restify = require('restify');
var exec = require('child_process').exec;

function respond(req, res, next) {
    exec('Rscript api.R', (error, stdout, stderr) => {
        if (error) {
            console.log('exec error: ${error}');
            return;
        }
        // do something with the result from stdout & stderr
        res.header("Access-Control-Allow-Origin", "*");
        res.send(stdout);
        next();
    });
}

var server = restify.createServer();
server.get('/', respond);
server.head('/', respond);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
