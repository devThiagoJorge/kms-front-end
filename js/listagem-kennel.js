var kennels = [];

$(document).ready(function () {
  $("#inputSearch").val(localStorage.getItem("searched"));
  $("#searched").text(localStorage.getItem("searched"));
  searchKennels(1);
});

function searchKennels(page) {
  empty();
  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  var q = "&name=" + $("#inputSearch").val();

  axios
    .get("http://localhost:3001/kennel/search?page=" + page + q, config)
    .then(function (response) {
      var obj = response.data.kennels.docs;

      kennels = [];

      obj.forEach(kennel => {
        kennels.push(kennel);
      });

      console.log(obj);

      var tamanho = obj.length;

      console.log(response.data)

      for (var i = 0; i < tamanho; i++) {
        var index = parseInt(i + 1);
        index = index + 5 * (page - 1);
        obj = response.data.kennels.docs[i];
        $("#data").append(
          "<tr>" +
          "<td>" +
          index +
          "</td>" +
          "<td>" +
          '<img id="imagem" src="../images/kennel-2.png" alt="dog-image">' +
          obj.name +
          "</td>" +
          "<td>" +
          obj.email +
          "</td>" +
          "<td>" +
          obj.cidade +
          "</td>" +
          "<td>" +
          obj.estado +
          "</td>" +
          "<td>" +
          "<button id=" +
          i +
          ' onclick="viewDog(this)"> <i class="material-icons m-1" style="cursor: pointer; color: #007bff;">&#xE417;</i> </button>' +
          "</td>" +
          "</tr>"
        );
      }

      var pages = response.data.kennels.pages;
      var total = response.data.kennels.total;
      var quantidadeRegistros = response.data.kennels.docs.length;

      console.log(quantidadeRegistros)

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
      '<li class="page-item"><button onclick="searchKennels(' +
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

function viewDog(button) {
  localStorage.setItem("kennelId", kennels[button.id]._id);
  window.location = "visualizar-canil.html";
}
