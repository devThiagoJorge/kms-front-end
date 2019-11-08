var kennelName = null;
var kennelId = null;

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
  console.log(kennel.dogs);
  let i = 0;
  kennel.dogs.forEach(dog => {
    i++;
    $("#data").append(
      '<tr>' +
      '<td>' + parseInt(i) + '</td>' +
      '<td id="imagem">' + 
        '<img src="../images/cachorro.jpg" alt="dog-image"></img>' +
        '<p>' + dog.name + '</p>' +
      '</td>' +
      '<td>' + dog.breed + '</td>' +
      '<td>' + dog.birthday + '</td>' +
      '<td>' + dog.size + '</td>' +
      '<td>' +
      '<i class="material-icons m-1" style="cursor: pointer; color: #007bff;">&#xE417;</i>' +
      '<i class="material-icons m-1" style="cursor: pointer;">edit</i>' +
      '<i class="material-icons m-1" style="cursor: pointer; color: #dc3545;">delete</i>' +
      '</td>' +
      '</tr>'
    );
  });
}

{/* <td id="imagem">
  <img src="../images/cachorro.jpg" alt="">
    <p>Tobias Top </p>
                                </td> */}

{/* <td>
  <i class="material-icons m-1" style="cursor: pointer; color: #007bff;">&#xE417;</i>
  <i class="material-icons m-1" style="cursor: pointer;">edit</i>
  <i class="material-icons m-1" style="cursor: pointer; color: #dc3545;">delete</i>
</td> */}