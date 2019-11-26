var dogsArray = [];

$(document).ready(function () {
  buscaCanil()
    .then(kennel => {
      listDogs(kennel.dogs);
    })
});

function buscaCanil() {

  const kennelId = localStorage.getItem('kennelId');

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  return axios.get('http://localhost:3001/kennel/' + kennelId, config)
    .then(function (response) {
      const kennel = response.data;

      console.log(kennel)

      Object.keys(kennel).forEach(function (attr) {
        $('#' + attr).val(kennel[attr]);
      });

      return kennel;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function listDogs(dogs) {

  dogs.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  
  let i = 0;

  dogs.forEach(dog => {

    dogsArray.push(dog);

    i++;

    $("#data").append(
      '<tr>' +
      '<td>' + parseInt(i) + '</td>' +
      '<td>' +
      '<img id="imagem" src="../images/dog-2.png" alt="dog-image">' + dog.name +
      ' </td>' +
      '<td> ' + dog.breed + ' </td>' +
      '<td>' +  ageDog(dog.birthday)  + '</td>' +
      '<td>' + dog.size + '</td>' +
      '<td>' +
      '<button id="' + i + '" onclick="viewDog(this)"> <i class="material-icons m-1" style="cursor: pointer; color: #007bff;">&#xE417;</i> </button>' + 
      '</td>' +
      '<td style="display: none;">' + dog._id + '</td>' +
      '</tr>'
      );
    });
  }
  
  function viewDog(button) {
    localStorage.setItem('dogId', dogsArray[button.id - 1]._id);
    window.location = "visualizar-animal.html";
  }
  
  $('#btnVoltar').click(function () {
    window.history.back();
  });

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