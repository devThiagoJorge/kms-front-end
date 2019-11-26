var dogs = [];

$(document).ready(function () {
  $('#inputSearch').val(localStorage.getItem('searched'));
  $('#searched').text(localStorage.getItem('searched'));
  searchDogs(1);
});

function searchDogs(page) {
  empty();
  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  var q = "&name=" + $('#inputSearch').val();

  axios
    .get("http://localhost:3001/dog/all?page=" + page + q, config)
    .then(function (response) {
      var obj = response.data.dogs.docs;

      dogs = [];

      obj.forEach(dog => {
        dogs.push(dog);
      });

      var tamanho = obj.length;
     
      for (var i = 0; i < tamanho; i++) {
        var index = parseInt(i + 1);
        index = index + 5 * (page - 1);
        obj = response.data.dogs.docs[i];
        $("#data").append(
          "<tr>" +
          "<td>" +
          index +
          "</td>" +
          "<td>" +
          '<img id="imagem" src="../images/dog-2.png" alt="dog-image">' +
          obj.name +
          "</td>" +
          "<td>" +
          obj.breed +
          "</td>" +
          "<td>" +
          ageDog(obj.birthday) +
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

      

      var pages = response.data.dogs.pages;
      var total = response.data.dogs.total;
      var quantidadeRegistros = response.data.dogs.docs.length;

      paginacao(pages,quantidadeRegistros,total);

    })
    .catch(function (error) {
      console.log(error);
    });
}

function paginacao(pages,quantidadeRegistros,tamanho) {
  var array = new Array();
  for(var i=1; i <= pages; i++){
    array [i] = i;
      $("#paginacao").append(
        '<li class="page-item"><button onclick="searchDogs(' +
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
  localStorage.setItem('dogId', dogs[button.id]._id);
  localStorage.setItem('kennelId', dogs[button.id].kennel);
  window.location.href = "visualizar-animal-canil.html";
}


function ageDog(birthday){
  var year = "";

  for(var i=0; i < 4; i++){
      year += birthday;
  }

  var currentTime = new Date()
  var currentYear = currentTime.getFullYear()

  var ageDog = parseInt(currentYear) - parseInt(year);

  if(ageDog == 0){
      year = "";
      year += birthday[5];
      year += birthday[6];
      
      currentYear = currentTime.getMonth();

      ageDog = parseInt(currentYear) - parseInt(year);

      return ageDog + " meses";
  }

  return ageDog + " anos";

}