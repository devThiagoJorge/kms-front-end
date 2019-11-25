var dogs = [];

$(document).ready(function () {
  searchDogs(1);
});

function searchDogs(page) {
  empty();

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios
    .get("http://localhost:3001/dog/all?page=" + page, config)
    .then(function (response) {
      var obj = response.data.dogs.docs;

      dogs = [];

      obj.forEach(dog => {
        dogs.push(dog);
      });

      var tamanho = obj.length;

      for (var i = 0; i < tamanho; i++) {
        obj = response.data.dogs.docs[i];
        console.log(obj);
        $("#data").append(
          "<tr>" +
          "<td>" +
          parseInt(i + 1) +
          "</td>" +
          "<td>" +
          '<img id="imagem" src="../images/dog-2.png" alt="dog-image">' +
          obj.name +
          "</td>" +
          "<td>" +
          obj.breed +
          "</td>" +
          "<td>" +
          'idade' +
          "</td>" +
          "<td>" +
          obj.size +
          "</td>" +
          '<td>' +
          '<button id=' + i + ' onclick="viewDog(this)"> <i class="material-icons m-1" style="cursor: pointer; color: #007bff;">&#xE417;</i> </button>' +
          '</td>' +
          "</tr>"
        );
      }

      tamanho = response.data.dogs.total;
      console.log(tamanho);
      var quantidadeRegistros = response.data.dogs.docs.length;
      paginacao(tamanho, quantidadeRegistros);

    })
    .catch(function (error) {
      console.log(error);
    });
}

function paginacao(tamanho, quantidadeRegistros) {
  var tamanhoArray = tamanho / quantidadeRegistros;
  tamanhoArray = parseInt(tamanhoArray);

  var array = new Array();
  array = new Array(tamanhoArray);

  if (quantidadeRegistros >= 5) {
    tamanhoArray++;

    for (var i = 1; i <= tamanhoArray; i++) {
      array[i] = i;
      $("#paginacao").append(
        '<li class="page-item"><button onclick="searchDogs(' +
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

  } else {
    var number = 1;
    for (var i = 1; i <= tamanhoArray; i += 5) {

      $("#paginacao").append(
        '<li class="page-item"><button onclick="searchDogs(' +
        number +
        ');"  class="page-link">' +
        number +
        "</button></li>"
      );
      number++;
    }
    $("#message").append(
      "Mostrando <b>" +
      quantidadeRegistros +
      "</b> resultados de <b>" +
      tamanho +
      "</b>"
    );
  }
}

function empty() {
  $("#message").empty();
  $("#data").empty();
  $("#paginacao").empty();
}

function viewDog(button) {
  localStorage.setItem('dogId', dogs[button.id]._id);
  localStorage.setItem('kennelId', dogs[button.id].kennel);
  window.location = "visualizar-animal-canil.html";
}