var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.post("/pdfservice", (request, response) => {
    console.log("Body:" + JSON.stringify(request.body))
    console.log("/pdfservice")
    var pdf = fs.readFileSync('test.pdf', 'utf8');
    response.setHeader("Content-type", "application/pdf")

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
