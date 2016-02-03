var express = require("express");
var hbs = require("hbs");
var randomString = require("random-string");
var app = express();
var Poll = require("./models/poll");

app.set('view engine', 'hbs');
app.set("views","./views");
app.use(express.static(__dirname + '/public'));

function generateCode(){
  return new Promise(function(resolve,reject){
    var usercode = randomString().toUpperCase();
    Poll.findOne({code:usercode}, function(err,doc){
      if(!err && doc){
        generateCode();
      }else{
        resolve(usercode);
      }
    })
  })
}

app.get("/:id", function(req,res){
  Poll.findOne({code:req.params.id}, function(err,doc){
    if(!err && doc){
      res.render("poll.hbs");
    }else{
      res.send("Whoops, that poll isn't here")
    }
  })
})

// function addVote(room,vote){
//   return new Promise(function(resolve,reject){
//     Poll.findOne({code:room.replace("/","")}, function(err, poll){
//       if (!err && poll){
//         poll.fist[vote]++;
//         poll.save(function(err){
//           if(!err){
//             resolve(poll);
//           }
//         })
//       }
//     })
//   })
// }

// app.post("/:id", function(req,res){
//   Poll.findOne({code:req.params.id}, function(err,poll){
//     if(!err && poll){
//       poll.fist[req.query.vote]++;
//       poll.save(function(err){
//         res.json(poll)
//       })
//     }else{
//       res.send("Whoops, that poll isn't here")
//     }
//   })
// })

app.get("/", function(req,res){
  res.render("index.hbs")
})

app.post("/", function(req,res){
  var fist = {
    zero:0,
    one:0,
    two:0,
    three:0,
    four:0,
    five:0
  }
  generateCode().then(function(usercode){
    var newPoll = new Poll({createdAt:new Date(),count:0,code:usercode,fist:fist})
    newPoll.save(function(err, doc){
      if(!err){
        res.json({code:doc.code})
      }
    })
  })
})

var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = {};
var rooms = {};

function makeNewPoll(){
  return {zero:0,one:0,two:0,three:0,four:0,five:0};
}

io.on('connection', function(socket){
  socket.on("join room", function (room) {
    socket.join(room);
    console.log("joined "+room);
    clients[socket.id] = {room:room,vote:null,lastVote:null};
    if (!rooms[room]){
      rooms[room] = {count:1,poll:makeNewPoll()}
    }else{
      rooms[room].count++;
    }
    console.log("Welcome, "+rooms[room].count+" in room.")
    io.in(room).emit("count",rooms[room].count)
    io.in(room).emit("poll",rooms[room].poll)
  })

  socket.on("vote",function(vote){
    var roomId = clients[socket.id].room;
    var room = rooms[roomId];
    var last = clients[socket.id].vote;
    if (last == null){
      clients[socket.id].lastVote = last;
    }else{
      room.poll[last]--;
    }
    clients[socket.id].vote = vote;
    room.poll[vote]++;
    io.in(roomId).emit("poll", room.poll);
  })

  socket.on("disconnect", function(){
    var roomId = clients[socket.id].room;
    console.log("left "+roomId)
    rooms[roomId].count--;
    console.log("Goodbye. Now "+rooms[clients[socket.id].room].count+" in room.");
    io.in(roomId).emit("count",rooms[roomId].count)
    if (rooms[clients[socket.id].room].count == 0){
      delete rooms[clients[socket.id].room];
    }
    delete clients[socket.id];
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:'+port);
});
