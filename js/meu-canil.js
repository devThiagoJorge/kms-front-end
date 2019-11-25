var kennelName = null;
var kennelId = null;
var dogs = [];

$(document).ready(function () {
  buscaCanil()
    .then(kennel => {
     
      listDogs(kennel);
    })
});

function buscaCanil() {

  const kennelAdm = localStorage.getItem('_id');

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  return axios.get('http://localhost:3001/kennel/search?kennelAdm=' + kennelAdm, config)
    .then(function (response) {
      const kennel = response.data;
      kennelName = kennel.name;
      kennelId = kennel._id;

      Object.keys(kennel).forEach(function (attr) {
        $('#' + attr).val(kennel[attr]);
      });

      return kennel;
    })
    .catch(function (error) {
      console.log(error);
    });
}

$('#editarCanil').click(function () {
  window.location.href = 'editar-canil.html';
});

$('#addAnimal').click(function () {
  window.location.href = 'cadastro-animal.html';
});

$('#excluirCanil').click(function () {
  const message = "Para confirmar a exclusão, digite o nome do canil " + kennelName + '.'

  var kennelNameRes = window.prompt(message);

  if (kennelNameRes != null) {
    if (kennelNameRes == kennelName) {
      excluirCanil();
    } else {
      alert('Nome inválido!')
    }
  }
});

function excluirCanil() {
  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.delete('http://localhost:3001/kennel/' + kennelId, config)
    .then(function (response) {
      if (response.data.error != undefined) {
        alert('Erro ao excluir canil');
      } else {
        localStorage.setItem('hasKennel', false);
        alert('Canil excluído!');
        window.location.href = 'meu-canil-cadastre.html';
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function listDogs(kennel) {

  kennel.dogs.sort(function (a, b) {
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
  kennel.dogs.forEach(dog => {

    dogs.push(dog);

    i++;
    $("#data").append(
      '<tr>' +
      '<td>' + parseInt(i) + '</td>' +
      '<td>' +
      '<img id="imagem" src="../images/dog-2.png" alt="dog-image">' + dog.name +
      ' </td>' +
      '<td> ' + dog.breed + ' </td>' +
      '<td>' + ageDog(dog.birthday) + '</td>' +
      '<td>' + dog.size + '</td>' +
      '<td>' +
      '<button id="' + i + '" onclick="viewDog(this)"> <i class="material-icons m-1" style="cursor: pointer; color: #007bff;">&#xE417;</i> </button>' +
      '<button id="' + i + '" onclick="editDog(this)"> <i id="editDog" class="material-icons m-1" style="cursor: pointer;">edit</i> </button>' +
      '<button id="' + i + '" onclick="deleteDog(this)"> <i id="deleteDog" class="material-icons m-1" style="cursor: pointer; color: #dc3545;">delete</i> </button>' +
      '</td>' +
      '<td style="display: none;">' + dog._id + '</td>' +
      '</tr>'
    );
  });
}


function viewDog(button) {
  // console.log(dogs[button.id - 1]._id);
  localStorage.setItem('dogId', dogs[button.id - 1]._id);
  window.location = "visualizar-animal.html";
}

function editDog(button) {
  // console.log(dogs[button.id - 1]._id);
  localStorage.setItem('dogId', dogs[button.id - 1]._id);
  window.location = "editar-animal.html";
}

function deleteDog(button) {
  localStorage.setItem('dogId', dogs[button.id - 1]._id);

  const message = "Para confirmar a exclusão de " + dogs[button.id - 1].name + ", digite seu nome: ";

  var dogName = window.prompt(message);

  if (dogName != null) {
    if (dogName == dogs[button.id - 1].name) {
      const config = {
        headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
      };

      axios.delete('http://localhost:3001/dog/' + localStorage.getItem('dogId'), config)
        .then(function (response) {
          if (response.data.error != undefined) {
            alert('Erro ao excluir animal.');
          } else {
            alert('Animal excluído!');
            window.location.href = 'meu-canil.html';
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert('Nome inválido!')
    }
  }
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

