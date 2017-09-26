var express = require('express');
var app = express();
app.listen(9000);

app.get('*',function (req,res) {
        console.log(req.originalUrl);
});

