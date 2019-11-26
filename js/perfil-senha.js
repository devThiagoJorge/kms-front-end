$('#btnSave').click(function () {
  if (validaCampos()) {
    atualizaSenha();
  }
});

function validaCampos() {
  let continua = true;
  $('#form input').each(function () {
    if ($(this).val() == '') {
      $(this).css('border-color', 'red');
      continua = false;
    }
  });

  if (continua == true) {
    if ($('#newPassword').val() != $('#newPassword2').val()) {
      alert('Confirmação de nova senha não coincide, tente novamente.');
      continua = false;
    }    
  }

  return continua;
}

$('#form input').each(function () {
  $(this).click(function () {
    $(this).css('border-color', '#ced4da');
  });
});

function atualizaSenha() {

  const passwords = {
    currentPassword: $('#currentPassword').val(),
    newPassword: $('#newPassword').val()
  }

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.put('http://localhost:3001/user/' + localStorage.getItem('email') + '/password', passwords, config)
    .then(function (response) {
      if (response.data.error != undefined) {
        alert('Senha atual incorreta.')
      } else {
        alert('Senha atualizada com sucesso!');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

$('#btnCancel').click(function () {
  window.history.back();
});