var express = require('express');

const app = express();
const routes = require('./routes/V1/User');
const connection = require('./library/EsConnection');

app.use('/api/user', routes);

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})