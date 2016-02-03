var fingers = document.querySelectorAll("li");
var hand = document.querySelector("#hand");
for(var i=0;i<fingers.length;i++){
  fingers[i].addEventListener("click", function(){
    hand.className = this.getAttribute("value");
    var selected = document.querySelector(".selected");
    selected.className = "";
    this.className = "selected";
  })
}
