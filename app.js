var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs')
var fileType = require('file-type');
var readChunk = require('read-chunk');

app.use(bodyParser.json());

app.post("/fileservice", (request, response) => {
    var requestedFile = request.body.requestedFile
    console.log("Client Requested : " + requestedFile)
    var filePath = path.join(__dirname, requestedFile);
    var f = fs.statSync(filePath);
    var readStream = fs.createReadStream(filePath);
    const buffer = readChunk.sync(requestedFile, 0, 4100);
    var mime = fileType(buffer).mime
    response.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': f.size
    });
    readStream.pipe(response);
})

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
