$(document).ready(function(){
  var baseUrl = window.location.origin;
  $("button").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: baseUrl,
      method: "POST",
      data: {},
      contentType : "application/json"
    }).then(function(response){
      var code = response.code;
      var url = baseUrl+"/"+code;
      $("input").val(url);
    })
  })
})
