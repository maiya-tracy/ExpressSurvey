
var express = require("express");

var path = require("path");
var session = require('express-session');

var app = express();
var bodyParser = require('body-parser');
const server = app.listen(1337);
const io = require('socket.io')(server);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  var results = req.body;
  res.render("index", {magicbox:results});
})

io.on('connection', function (socket) {
  socket.on('sendingformdata', function(data) {
    console.log("rawr")
    console.log(data);
    socket.emit('returningformdata', {
      formdata: data
    });
    socket.emit('randomnum', {
      randomnumber: Math.floor(Math.random() * 1000)
    });
  });

});
