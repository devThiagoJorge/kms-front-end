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

$("#btnSearch").click(function () {
  if ($('#inputSearch').val() != '') {
    var urlArray = window.location.href.split('/')
    var length = urlArray.length;
    var url = urlArray[length - 1];

    localStorage.setItem('searched', $('#inputSearch').val());
    if (url != 'listagem-animais.html' && url != 'listagem-usuarios.html' && url != 'listagem-kennel.html') {
      window.location.href = 'listagem-animais.html'
    } else {
      window.location.reload();
    }
  }
});