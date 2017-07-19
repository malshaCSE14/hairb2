/**
 * Created by malsha_h on 7/13/2017.
 */
var express     = require('express');
var app         = express();
var port        = process.env.PORT || 8080;
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var assert      = require('assert');
var router      = express.Router();
var appRoutes   = require('./app/routes/api')(router);
var path        = require('path');
// var User        = require('./app/models/user');


app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use('/api',appRoutes);
app.use(express.static(__dirname + '/public'));
app.use(appRoutes);

mongoose.connect('mongodb://localhost:27017/test',function (err) {
    if (err){
        console.log('Not connected to the database '+ err);

    }else {
        console.log('Successfully connected to mongoDB');
    }
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
});


app.listen(port,function () {
    console.log('Running the server on port '+port);
});