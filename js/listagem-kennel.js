var kennels = [];

$(document).ready(function() {
  $("#inputSearch").val(localStorage.getItem("searched"));
  $("#searched").text(localStorage.getItem("searched"));
  searchKennels(1);
});

function searchKennels(page) {
  empty();
<<<<<<< HEAD
  const config = {
    headers: { Authorization: "bearer " + localStorage.getItem("token") }
=======
  const config = {  
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
>>>>>>> b679880bae3d31b7635073f3efc1853355c87f94
  };

  var q = "&name=" + $("#inputSearch").val();

  axios
    .get("http://localhost:3001/kennel/search?page=" + page + q, config)
    .then(function(response) {
      var obj = response.data.kennels.docs;

      kennels = [];

      obj.forEach(kennel => {
        kennels.push(kennel);
      });

<<<<<<< HEAD
      console.log(obj);

=======
>>>>>>> b679880bae3d31b7635073f3efc1853355c87f94
      var tamanho = obj.length;

      for (var i = 0; i < tamanho; i++) {
        obj = response.data.kennels.docs[i];
        $("#data").append(
          "<tr>" +
            "<td>" +
            parseInt(i + 1) +
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
      
      paginacao(pages, quantidadeRegistros, total);
    })
    .catch(function(error) {
      console.log(error);
    });
}


function paginacao(pages,quantidadeRegistros,tamanho) {
  var array = new Array();
  for(var i=1; i <= pages; i++){
    array [i] = i;
      $("#paginacao").append(
        '<li class="page-item"><button onclick="searchKennels(' +
           array[i]+
          ');"  class="page-link">' +
           array[i]+
          "</button></li>"
      );
  }
  $("#message").append(
    "Mostrando <b>" +
      quantidadeRegistros  +
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
