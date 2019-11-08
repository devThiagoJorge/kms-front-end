
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
    if (tamanho == 0 || lastName == '') {
        lastName = undefined;
    }
    return lastName;
}

function searchUser(page) {
    $("#lista").empty();
    var firstName, lastName;
    firstName = splitReturnFirstName(firstName);
    lastName = splitReturnLastName(lastName);
    var q = '&firstName=' + firstName;
    if (lastName != undefined) {
        q = q + "&lastName=" + lastName;
    }
    // var page = 1;

    console.log(page);
    axios.get("http://localhost:3001/user/search?page=" + page + q)
        .then(function (response) {
            var obj = response.data.users.docs;
            console.log(obj);
            var tamanho = obj.length;
            for (var i = 0; i < tamanho; i++) {
                obj = response.data.users.docs[i];
                $("#lista").append(
                    '<tr>' +
                    '<td>' + parseInt(i + 1) + '</td>' +
                    '<td>' + obj.firstName + ' ' + obj.lastName + '</td>' +
                    '<td>' + obj.email + '</td>' +
                    '<td>' + obj.cellPhone + '</td>' +
                    '<td>' + obj.city + '</td>' +
                    '<td>' + obj.state + '</td>' +
                    '</tr>'
                )
            }
            var tamanho = response.data.users.total;
            
            var quantidadeRegistros = response.data.users.docs.length;
    
            paginacao(tamanho, page, quantidadeRegistros);

        })
        .catch(function (error) {
            console.log(error);
        });
}


function paginacao(tamanho, number,quantidadeRegistros) {
    $("#paginacao").empty();
   
    $("#message").empty();
   
    for (var i = 0; i < tamanho; i += 7) {
        $("#paginacao").append('<li class="page-item"><button onclick="searchUser(' + parseInt(number) + ');"  class="page-link">' + parseInt(number) + '</button></li>');
        number++;
    }
    $("#message").append("Mostrando <b>"+quantidadeRegistros+"</b> resultados de <b>" + tamanho + "</b>");

}

