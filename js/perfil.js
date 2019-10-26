$(document).ready(function () {
  $("#cellPhone").mask("(00)00000-0000");
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


  // $('#firstName').val(localStorage.getItem('firstName'));
  // $('#lastName').val(localStorage.getItem('lastName'));
  // $('#email').val(localStorage.getItem('email'));
  // $('#cellPhone').val(localStorage.getItem('cellPhone'));
  // $('#homePhone').val(localStorage.getItem('homePhone'));
  // $('#cep').val(localStorage.getItem('cep'));
  // $('#state').val(localStorage.getItem('state'));
  // $('#city').val(localStorage.getItem('city'));
});

$('#btnSave').click(function () {
  let alteracao = false;
  $('#form input').each(function () {
    if ($(this).val() != localStorage.getItem($(this).attr("id"))) {
      alteracao = true;
    }
  });

  console.log(alteracao);

  if (alteracao == true) {

    const user = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      email: $('#email').val(),
      cellPhone: $('#cellPhone').val(),
      homePhone: $('#homePhone').val(),
      cep: $('#cep').val(),
      state: $('#state').val(),
      city: $('#city').val()
    }

    axios.put('http://localhost:3001/user/' + user.email, user)
      .then(function (response) {
        if (response.data.error != undefined) {
          console.log(response.data.error);
        }else{
          alert('Dados salvos com sucesso!');
        }
      })
      .catch(function(error){
        console.log(error);
      });

  } else {
    location.reload();
  }
});

/*
  1) Para cada input, comparar com sua respectiva key no local storage
  2) Se ao menos 1 input estiver diferente de sua respectiva key:
    3) Pegar todas as informações dos inputs, cria um objetivo e faz a requsição put no servidor para atualizar
  4)Se não:
    5)Refresh na tela
*/