$(document).ready(function(){
  var baseUrl = window.location.origin;
  $(".generate").on("click", function(e){
    e.preventDefault();
    var prompt = $("input[name=prompt]").val();
    $.ajax({
      url: baseUrl,
      method: "POST",
      data: JSON.stringify({prompt:prompt}),
      contentType : "application/json"
    }).then(function(response){
      var code = response.code;
      var url = baseUrl+"/"+code;
      $("input[name=url]").val(url);
    })
  });

  $(".copy").on('click', function(e) {
    e.preventDefault();
    $("input[name=url]").select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  });

})
