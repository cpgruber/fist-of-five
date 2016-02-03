var pathname = window.location.pathname;
var socket = io();
socket.emit("join room", pathname)

var fingers = document.querySelectorAll("li");
var hand = document.querySelector("#hand");
for(var i=0;i<fingers.length;i++){
  fingers[i].addEventListener("click", function(){
    var vote = this.getAttribute("value");
    hand.className = vote;
    var selected = document.querySelector(".selected");
    selected.className = "";
    this.className = "selected";
    socket.emit("vote", vote);
  })
}

socket.on("vote", function(vote){
  console.log(vote)
  console.log("got a vote for "+vote)
  hand.className = vote;
  var selected = document.querySelector(".selected");
  selected.className = "";
  var finger = document.querySelector("li[value="+vote+"]");
  finger.className = "selected";
})
