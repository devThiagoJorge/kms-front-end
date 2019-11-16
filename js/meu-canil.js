var kennelName = null;
var kennelId = null;

$(document).ready(function () {
  buscaCanil()
    .then(kennel => {
      calculaIdade(kennel);
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
  if (window.prompt(message) == kennelName) {
    excluirCanil();
  } else {
    alert('Nome inválido!')
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

  console.log(kennel.dogs);

  let i = 0;
  kennel.dogs.forEach(dog => {
    i++;
    $("#data").append(
      '<tr>' +
      '<td>' + parseInt(i) + '</td>' +
      '<td>' +
      '<img id="imagem" src="../images/cachorro.jpg" alt="dog-image">' + dog.name +
      ' </td>' +
      '<td> ' + dog.breed + ' </td>' +
      '<td>' + dog.age + '</td>' +
      '<td>' + dog.size + '</td>' +
      '<td>' +
      '<button onclick="viewDog('+`dog._id`+')"> <i class="material-icons m-1" style="cursor: pointer; color: #007bff;">&#xE417;</i> </button>' +
      '<i id="editDog" class="material-icons m-1" style="cursor: pointer;">edit</i>' +
      '<i id="deleteDog" class="material-icons m-1" style="cursor: pointer; color: #dc3545;">delete</i>' +
      '</td>' +
      '<td>' + dog._id + '</td>' +
      '</tr>'
    );
  });
}

function calculaIdade(kennel) {
  kennel.dogs.forEach(dog => {
    // let date = dog.birthday.split('-');
    // // console.log(date[0], date[1], date[2]);

    // let dd = date[2].split('T');
    // let mm = date[1];
    // let yyyy = date[0];

    // let birthday = dd[0] + '-' + mm + '-' + yyyy

    // console.log(birthday)

    // // var today = new Date();
    // // dd = today.getDate();
    // // mm = 1 + today.getMonth();
    // // yyyy = today.getFullYear();
    // // today = dd + '-' + mm + '-' + yyyy;        

    // // console.log(today)
  });
}

function viewDog(id) {
  alert(id);
}