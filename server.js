// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
// create the express app
var app = express();
var bodyParser = require('body-parser');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// post route for adding a user
app.post('/result', function(req, res) {
 console.log("POST DATA", req.body);
 // req.session.name = req.body.name;
 // req.session.location = req.body.location;
 // req.session.language = req.body.language;
 // req.session.comment = req.body.comment;
 req.session.body = req.body;
 res.redirect('/result');
})

app.get("/result", function (req, res){
  var user = {
    name: req.session.body.name,
    location: req.session.body.location,
    language: req.session.body.language,
    comment: req.session.body.comment
  };
    res.render("result", {user: user});
})


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
