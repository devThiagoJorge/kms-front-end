var kennelName = null;
var kennelId = null;

$(document).ready(function () {
  buscaCanil();
});

function buscaCanil() {

  const kennelAdm = localStorage.getItem('_id');

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.get('http://localhost:3001/kennel/search?kennelAdm=' + kennelAdm, config)
    .then(function (response) {
      const kennel = response.data;
      kennelName = kennel.name;
      kennelId = kennel._id;

      Object.keys(kennel).forEach(function (attr) {
        $('#' + attr).val(kennel[attr]);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

$('#editarCanil').click(function () {
  window.location.href = 'editar-canil.html';
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