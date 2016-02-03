$(document).ready(function(){
  var baseUrl = window.location.origin;
  $(".generate").on("click", function(e){
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


  var copy = document.querySelector('.copy');
  copy.addEventListener('click', function(e) {
    e.preventDefault();
    var copyTextarea = document.querySelector('input');
    copyTextarea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  });

})
