var express = require("express");
var hbs = require("hbs");
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set("views","./views");

app.get("/", function(req,res){
  res.render("index.hbs")
})

app.get("/poll", function(req,res){
  res.render("poll.hbs")
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
