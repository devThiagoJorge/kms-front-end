$(document).ready(function () {
  var firstName = localStorage.getItem('firstName');
  var lastName = localStorage.getItem('lastName');
  $("#user").text(firstName + " " + lastName);
});

$('#btnMeuCanil').click(function () {
  if (localStorage.getItem('hasKennel') == 'true') {
    window.location.href = 'meu-canil.html';
  } else {
    window.location.href = 'meu-canil-cadastre.html';
  }
});