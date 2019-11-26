$(document).ready(function () {
  $("#cellphone").mask("(00)00000-0000");
  $("#homePhone").mask("(00)0000-0000");
  $("#cep").mask("00000-000");
});

$('#cep').keyup(function () {
  var cep = $('#cep').val();
  if (cep.length === 9) {
    axios.get('https://viacep.com.br/ws/' + cep + '/json/')
      .then(function (response) {
        if (!(response.data.erro)) {
          var state = response.data.uf;
          var city = response.data.localidade;
          $('#state').val(state);
          $('#city').val(city);
        }
        else {
          alert("Cep não encontrado");
          $('#cep').val("");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
});

$(document).ready(function () {
  $('#form input').each(function () {
    $(this).val(localStorage.getItem($(this).attr('id')));
  });
});

$('#btnSave').click(function () {
  if (validaCampos()) {  
    atualizaUser();
  }
});

function validaCampos() {
  let continua = true;
  $('#form input').each(function () {
    if ($(this).val() == '' && ( $(this).attr('id') != 'cellphone' && $(this).attr('id') != 'homePhone') ){
      $(this).css('border-color', 'red');
      continua = false;
    }
  });
  return continua;
}

function atualizaUser() {
  let alteracao = false;
  $('#form input').each(function () {
    if ($(this).val() != localStorage.getItem($(this).attr("id"))) {
      alteracao = true;
    }
  });

  if (alteracao == true) {
    const user = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      email: $('#email').val(),
      cellphone: $('#cellphone').val(),
      homePhone: $('#homePhone').val(),
      cep: $('#cep').val(),
      state: $('#state').val(),
      city: $('#city').val()
    }

    const config = {
      headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
    };

    axios.put('http://localhost:3001/user/' + localStorage.getItem('email'), user, config)
      .then(function (response) {
        if (response.data.error != undefined) {
          console.log(response.data.error);
        } else {
          Object.keys(user).forEach(function (property) {
            localStorage.setItem(property, user[property]);
          });

          alert('Dados salvos com sucesso!');

          location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    alert('Dados salvos com sucesso!');
  }
}

$('#btnCancel').click(function(){
  window.history.back();
});

$('#form input').each(function () {
  $(this).click(function(){
    $(this).css('border-color', '#ced4da');
  });
});