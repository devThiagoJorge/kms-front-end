$(document).ready(function () {
  if (localStorage.getItem('hasKennel') == 'true') {
    // const kennel = JSON.parse(localStorage.getItem('kennel'));
    // console.log(kennel._id);    
    // Object.keys(kennel).forEach(function (item) {
    //   let id = '#' + item;
    //   let content = kennel[item];            
    //   $(id).val(content);
    // });

  } else {
    // $('#form').empty();
    // $('#form').append('Você não possui nenhum canil.');
  }
});

// $(document).ready(function () {
//   $("#cellPhone").mask("(00)00000-0000");
//   $("#homePhone").mask("(00)0000-0000");
//   $("#cep").mask("00000-000");  
// });

// $('#cep').keyup(function () {
//   var cep = $('#cep').val();
//   if (cep.length === 9) {
//     axios.get('https://viacep.com.br/ws/' + cep + '/json')
//       .then(function (response) {
//         if (!(response.data.erro)) {
//           var estado = response.data.uf;
//           var cidade = response.data.localidade;
//           var bairro = response.data.bairro;
//           var logradouro = response.data.logradouro;
//           $('#estado').val(estado);
//           $('#cidade').val(cidade);
//           $('#bairro').val(bairro);
//           $('#rua').val(logradouro);
//         }
//         else {
//           alert("Cep não encontrado");
//           $('#cep').val("");
//           $('#state').val('');
//           $('#city').val('');
//           $('#bairro').val('');
//           $('#rua').val('');
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       })
//   }
// });

// // $(document).ready(function () {
// //   $('#form input').each(function () {
// //     $(this).val(localStorage.getItem($(this).attr('id')));
// //   });
// // });

// $('#btnSave').click(function () {
//   validaCampos();
//   if (validaCampos()) {
//     create();
//   }
// });

// function validaCampos() {
//   let continua = true;
//   $('#form input').each(function () {
//     if ($(this).val() == '' && ($(this).attr('id') != 'cellPhone' && $(this).attr('id') != 'homePhone' && $(this).attr('readonly') == undefined)) {
//       $(this).css('border-color', 'red');
//       continua = false;
//     }
//   });

//   if ($('#cellPhone').val() == '' && $('#homePhone').val() == '') {
//     $('#cellPhone, #homePhone')
//       .css('border-color', 'red')
//       .attr('placeholder', 'Obrigatório um celular ou telefone');
//     continua = false;
//   }
//   return continua;
// }

// function create() {
//   const kennel = {
//     name: $('#name').val(),
//     email: $('#email').val(),
//     cep: $('#cep').val(),
//     estado: $('#estado').val(),
//     cidade: $('#cidade').val(),
//     bairro: $('#bairro').val(),
//     rua: $('#rua').val(),
//     numero: $('#numero').val(),
//     cellPhone: $('#cellPhone').val(),
//     homePhone: $('#homePhone').val()
//   }

//   const config = {
//     headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
//   };

//   axios.post('http://localhost:3001/kennel', kennel, config)
//     .then(function (response) {
//       console.log(response.data);
//       if (response.data.error != undefined) {
//         alert('Erro ao criar canil');
//       } else {
//         alert('Canil criado com sucesso!');
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// $('#form input').each(function () {
//   $(this).click(function () {
//     $(this)
//       .css('border-color', '#ced4da')
//       .attr('placeholder', '');
//     if ($(this).attr('id') == 'homePhone' || $(this).attr('id') == 'cellPhone') {
//       changeBorderColor($(this).attr('id'));
//     }
//   });
// });

// function changeBorderColor(inputId) {
//   if (inputId == 'homePhone') {
//     $('#cellPhone')
//       .css('border-color', '#ced4da')
//       .attr('placeholder', '');
//   } else {
//     $('#homePhone')
//       .css('border-color', '#ced4da')
//       .attr('placeholder', '');
//   }
// }