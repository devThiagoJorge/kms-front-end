
$("#btnSearch").click(function () {
    searchUser();
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
    if (tamanho == 0) {
        lastName = " ";
    }
    return lastName;
}

function searchUser() {
    $("#lista").empty();
    var firstName, lastName;
    firstName = splitReturnFirstName(firstName);
    lastName = splitReturnLastName(lastName);

    axios.get("http://localhost:3001/user/search?firstName=" + firstName + "&lastName=" + lastName)
        .then(function (response) {

            var obj = response.data.users;

            var tamanho = obj.length;

            for (var i = 0; i < tamanho; i++) {
                obj = response.data.users[i];
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
        })
        .catch(function (error) {
            console.log(error);
        });
}


