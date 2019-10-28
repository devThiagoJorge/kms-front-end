$("#inputSearch").focusout(function() {
  var firstName, lastName;
  firstName = splitReturnFirstName(firstName);
  lastName = splitReturnLastName(lastName);

    axios.get("http://localhost:3001/user/search?firstName=" + firstName + "&lastName=" + lastName)
    .then(function(response) {
      

      var obj = response.data.users;
      Object.keys(obj).forEach(function(item) {
        console.log(item, obj[item]);
      });
    })
    
    .catch(function(error) {
      console.log(error);
    });
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
  console.log(tamanho);
  lastName = stringSplit[tamanho];
  if(tamanho == 0){
      lastName = " ";
  }
  return lastName;
}

/*
    Recuperar o first and last name
    conectar com a api 
    retornar os resultados
*/
