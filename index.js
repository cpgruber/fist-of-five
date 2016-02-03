var express = require("express");
var hbs = require("hbs");
var randomString = require("random-string");
var app = express();

app.set('view engine', 'hbs');
app.set("views","./views");
app.use(express.static(__dirname + '/public'));

app.get("/:id", function(req,res){
  res.render("poll.hbs")
})

app.get("/", function(req,res){
  res.render("index.hbs")
})

app.post("/", function(req,res){
  res.json({code:randomString()})
})

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('user connected');
  socket.on("start stream", function(b){
    console.log("b="+b)
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:'+port);
});
