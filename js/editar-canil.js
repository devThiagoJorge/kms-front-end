var kennel = null;

function buscaCanil() {
  
  const kennelAdm = localStorage.getItem('_id');

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.get('http://localhost:3001/kennel/search?kennelAdm=' + kennelAdm, config)
    .then(function (response) {
      kennel = response.data;
      Object.keys(kennel).forEach(function (attr) {
        $('#' + attr).val(kennel[attr]);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

$('#editarCanil').click(function(){
  window.location.href = 'editar-canil.html';
});

$(document).ready(function () {
  $("#cellPhone").mask("(00)00000-0000");
  $("#homePhone").mask("(00)0000-0000");
  $("#cep").mask("00000-000");
  buscaCanil();
});

$('#cep').keyup(function () {
  var cep = $('#cep').val();
  if (cep.length === 9) {
    axios.get('https://viacep.com.br/ws/' + cep + '/json')
      .then(function (response) {
        if (!(response.data.erro)) {
          var estado = response.data.uf;
          var cidade = response.data.localidade;
          var bairro = response.data.bairro;
          var logradouro = response.data.logradouro;
          $('#estado').val(estado);
          $('#cidade').val(cidade);
          $('#bairro').val(bairro);
          $('#rua').val(logradouro);
        }
        else {
          alert("Cep não encontrado");
          $('#cep').val("");
          $('#state').val('');
          $('#city').val('');
          $('#bairro').val('');
          $('#rua').val('');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
});

$('#btnSave').click(function () {
  validaCampos();
  if (validaCampos()) {
    update();
  }
});

function validaCampos() {
  let continua = true;
  $('#form input').each(function () {
    if ($(this).val() == '' && ($(this).attr('id') != 'cellPhone' && $(this).attr('id') != 'homePhone' && $(this).attr('readonly') == undefined)) {
      $(this).css('border-color', 'red');
      continua = false;
    }
  });

  if ($('#cellPhone').val() == '' && $('#homePhone').val() == '') {
    $('#cellPhone, #homePhone')
      .css('border-color', 'red')
      .attr('placeholder', 'Obrigatório um celular ou telefone');
    continua = false;
  }
  return continua;
}

function update() {

  kennel.name = $('#name').val(),
  kennel.email = $('#email').val(),
  kennel.cep = $('#cep').val(),
  kennel.estado = $('#estado').val(),
  kennel.cidade = $('#cidade').val(),
  kennel.bairro = $('#bairro').val(),
  kennel.rua = $('#rua').val(),
  kennel.numero = $('#numero').val(),
  kennel.cellPhone = $('#cellPhone').val(),
  kennel.homePhone = $('#homePhone').val()

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.put('http://localhost:3001/kennel/' + kennel._id, kennel, config)
    .then(function (response) {
      if (response.data.error != undefined) {
        alert('Erro ao editar canil');
      } else {
        alert('Canil editado com sucesso!');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

$('#form input').each(function () {
  $(this).click(function () {
    $(this)
      .css('border-color', '#ced4da')
      .attr('placeholder', '');
    if ($(this).attr('id') == 'homePhone' || $(this).attr('id') == 'cellPhone') {
      changeBorderColor($(this).attr('id'));
    }
  });
});

function changeBorderColor(inputId) {
  if (inputId == 'homePhone') {
    $('#cellPhone')
      .css('border-color', '#ced4da')
      .attr('placeholder', '');
  } else {
    $('#homePhone')
      .css('border-color', '#ced4da')
      .attr('placeholder', '');
  }
}

$('#btnCancel').click(function () {
  window.location.href = "meu-canil.html"
});