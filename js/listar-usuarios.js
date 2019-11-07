page = 1;
$("#btnSearch").click(function () {
    searchUser();
    paginacao();
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

function searchUser() {
    $("#lista").empty();
    var firstName, lastName;
    firstName = splitReturnFirstName(firstName);
    lastName = splitReturnLastName(lastName);
    var q = '&firstName=' + firstName;
    if (lastName != undefined) {
        q = q + "&lastName=" + lastName;
    }
   
    console.log(page);
    axios.get("http://localhost:3001/user/search?page=" + page + q )
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
        })
        .catch(function (error) {
            console.log(error);
        });
}


function paginacao(){
    $("#paginacao").empty();
    var firstName, lastName;
    firstName = splitReturnFirstName(firstName);
    lastName = splitReturnLastName(lastName);
    var q = '&firstName=' + firstName;
    if (lastName != undefined) {
        q = q + "&lastName=" + lastName;
    }
    axios.get("http://localhost:3001/user/search?page=" + page + q )
        .then(function (response) {
            var tamanho = response.data.users.total;
            console.log(tamanho);
            var number = 1;
            for(var i=0; i < tamanho; i+=5){
                $("#paginacao").append('<li id="page" class="page-item"><a href="#" class="page-link">'+ parseInt(number) +'</a></li>');
                number ++;
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
}

