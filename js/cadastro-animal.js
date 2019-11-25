$('#btnSave').click(function () {  
  buscaCanil()
    .then(kennel => {
      console.log(kennel)
      create(kennel);
    });
});

function validaCampos() {
  let continua = true;
  $('#form input, #form select').each(function () {
    if ($(this).val() == '') {
      $(this).css('border-color', 'red');
      continua = false;
    }
  });
  return continua;
}

function create(kennel) {
  const dog = {
    name: $('#name').val(),
    breed: $('#breed').val(),
    birthday: $('#birthday').val(),
    size: $('#size option:selected').text(),
    coatColor: $('#coatColor').val(),
    weight: $('#weight').val(),
    baia: $('#baia').val()
  }

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  kennel.dogs.push(dog);

  axios.put('http://localhost:3001/kennel/' + kennel._id, kennel, config)
    .then(function (response) {
      if (response.data.error == undefined) {
        alert('Animal cadastrado com sucesso!');
        window.location.href = 'meu-canil.html';        
      } else {
        console.log(response.data.error);
        alert('Erro ao cadastrar animal');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function buscaCanil() {

  const kennelAdm = localStorage.getItem('_id');

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  return axios.get('http://localhost:3001/kennel/search?kennelAdm=' + kennelAdm, config)
    .then(function (response) {
      const kennel = response.data;
      return kennel;
    })
    .catch(function (error) {
      console.log(error);
    });
}

$('#form input, #form select').each(function () {
  $(this).click(function () {
    $(this)
      .css('border-color', '#ced4da')
      .attr('placeholder', '');
  });
});

$('#btnCancel').click(function () {
  window.location.href = "meu-canil.html"
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

$("#birthday").change(function (e) { 
  e.preventDefault();
  
  var birthday = $("#birthday").val();

  $("#age").val(ageDog(birthday));

});



