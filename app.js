var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs')

app.use(bodyParser.json());

app.post("/pdfservice", (request, response) => {
    var requestedPdf = request.body.requestedPdf
    console.log("Client Requested : " + requestedPdf)
    var filePath = path.join(__dirname, requestedPdf);
    var pdf = fs.statSync(filePath);
    var readStream = fs.createReadStream(filePath);
    response.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': pdf.size
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
