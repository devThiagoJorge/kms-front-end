var users = [];

$(document).ready(function () {
  $('#inputSearch').val(localStorage.getItem('searched'));
  $('#searched').text(localStorage.getItem('searched'));
  searchUser(1);
});

function splitReturnFirstName(firstName) {
  var inputSearch = $("#inputSearch").val();
  var stringSplit = inputSearch.split(" ");
  firstName = stringSplit[0];
  return firstName;
}
function splitReturnLastName(lastName) {
  var inputSearch = $("#inputSearch").val();
  var stringSplit = inputSearch.split(" ");

  var tamanho = stringSplit.length;
  tamanho = tamanho - 1;

  lastName = stringSplit[tamanho];
  if (tamanho == 0 || lastName == "") {
    lastName = undefined;
  }
  return lastName;
}

function searchUser(page) {
  empty();
  var firstName, lastName;
  firstName = splitReturnFirstName(firstName);
  lastName = splitReturnLastName(lastName);
  var q = "&firstName=" + firstName;
  if (lastName != undefined) {
    q = q + "&lastName=" + lastName;
  }

  axios
    .get("http://localhost:3001/user/search?page=" + page + q)
    .then(function (response) {
      var obj = response.data.users.docs;

      users = [];

      obj.forEach(user => {
        users.push(user);
      });

      var tamanho = obj.length;

      // alert("Usuário não cadastrado");

      for (var i = 0; i < tamanho; i++) {
        var index = parseInt(i + 1);
        index = index + 5 * (page - 1);
        obj = response.data.users.docs[i];
        $("#data").append(
          "<tr>" +
          "<td>" +
          index +
          "</td>" +
          "<td>" +
          '<img id="imagem" src="../images/user.jpg" alt="dog-image">' +
          obj.firstName +
          " " +
          obj.lastName +
          "</td>" +
          "<td>" +
          obj.email +
          "</td>" +
          "<td>" +
          obj.city +
          "</td>" +
          "<td>" +
          obj.state +
          "</td>" +
          '<td>' +
          '<button id=' + i + ' onclick="viewUser(this)"> <i class="material-icons m-1" style="cursor: pointer; color: #007bff;">&#xE417;</i> </button>' +
          '</td>' +
          "</tr>"
        );
      }


      var pages = response.data.users.pages;
      var total = response.data.users.total;
      var quantidadeRegistros = response.data.users.docs.length;

      paginacao(pages, quantidadeRegistros, total);

    })
    .catch(function (error) {
      console.log(error);
    });
}


function paginacao(pages, quantidadeRegistros, tamanho) {
  var array = new Array();
  for (var i = 1; i <= pages; i++) {
    array[i] = i;
    $("#paginacao").append(
      '<li class="page-item"><button onclick="searchUser(' +
      array[i] +
      ');"  class="page-link">' +
      array[i] +
      "</button></li>"
    );
  }
  $("#message").append(
    "Mostrando <b>" +
    quantidadeRegistros +
    "</b> resultados de <b>" +
    tamanho +
    "</b>"
  );
}

function empty() {
  $("#message").empty();
  $("#data").empty();
  $("#paginacao").empty();
}

function viewUser(button) {
  localStorage.setItem('userId', users[button.id]._id);
  window.location = "visualizar-perfil.html";
}