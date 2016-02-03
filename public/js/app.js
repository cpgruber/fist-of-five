var pathname = window.location.pathname;
var socket = io();
socket.emit("join room", pathname)

var fingers = document.querySelectorAll(".votes li");
var hand = document.querySelector("#hand");
for(var i=0;i<fingers.length;i++){
  fingers[i].addEventListener("click", function(){
    var selected = document.querySelector(".selected");
    if (selected){
      selected.className = "";
    }
    this.className = "selected";
    var vote = this.getAttribute("value");
    socket.emit("vote", vote);
  })
}

function processPoll(poll){
  var votes = 0;
  Object.keys(poll).forEach(function(key) {
    votes+= poll[key];
  });
  var sum = poll.one+(poll.two*2)+(poll.three*3)+(poll.four*4)+(poll.five*5);
  var mean = Math.round(sum/votes);
  var text = (mean==0)?"zero":(mean==1)?"one":(mean==2)?"two":(mean==3)?"three":(mean==4)?"four":"five";
  if (votes == 0){
    text = "zero";
  }
  hand.className = text;
}

function countPoll(poll){
  Object.keys(poll).forEach(function(key){
    var ct = document.querySelector(".counts li[value="+key+"]");
    ct.textContent = (poll[key]>0)?poll[key]:"";
  })
}

socket.on("poll", function(poll){
  processPoll(poll);
  countPoll(poll);
})

socket.on("count", function(count){
  var c = document.querySelector("#count");
  c.textContent = count;
})
