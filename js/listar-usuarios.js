$("#btnSearch").click(function () {
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
      var tamanho = obj.length;
      if (tamanho == 0) {
        alert("Usuário não cadastrado");
      } else {
        for (var i = 0; i < tamanho; i++) {
          obj = response.data.users.docs[i];
          $("#lista").append(
            "<tr>" +
            "<td>" +
            parseInt(i + 1) +
            "</td>" +
            "<td>" +
            obj.firstName +
            " " +
            obj.lastName +
            "</td>" +
            "<td>" +
            obj.email +
            "</td>" +
            "<td>" +
            obj.cellPhone +
            "</td>" +
            "<td>" +
            obj.city +
            "</td>" +
            "<td>" +
            obj.state +
            "</td>" +
            "</tr>"
          );

        }
        tamanho = response.data.users.total;
        console.log(tamanho);
        var quantidadeRegistros = response.data.users.docs.length;
        paginacao(tamanho, quantidadeRegistros);

        console.log(tamanhoArray);
        console.log(tamanho)
        console.log(quantidadeRegistros)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function paginacao(tamanho, quantidadeRegistros) {
  var tamanhoArray = tamanho / quantidadeRegistros;
  tamanhoArray = parseInt(tamanhoArray);
  var number = 1;
  if (tamanhoArray % 5 == 0) {
    number++;

    criaPaginação(tamanhoArray - 1, number, quantidadeRegistros, tamanho);
  }


}

function criaPaginação(tamanhoArray, number, quantidadeRegistros, tamanho) {
  for (var i = 1; i <= tamanhoArray; i += 5) {

    $("#paginacao").append(
      '<li class="page-item"><button onclick="searchUser(' +
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

function empty() {
  $("#message").empty();
  $("#lista").empty();
  $("#paginacao").empty();
}
