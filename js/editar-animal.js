$(document).ready(function () {
  const dogId = localStorage.getItem('dogId');
 
  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.get('http://localhost:3001/dog/' + dogId, config)
    .then(function (response) {
      const dog = response.data;

      var birthday = localStorage.getItem('birthday');
      $("#age").val(ageDog(birthday));
    
      Object.keys(dog).forEach(function (attr) {
        $('#' + attr).val(dog[attr]);
     
      });

      switch (dog.size) {
        case 'Pequeno':
          $('#size').val(0);
          break;
        case 'Médio':
          $('#size').val(1);
          break;
        case 'Grande':
          $('#size').val(2);
          break;
      }

      Object.keys(dog).forEach(function (item) {
        if (item != '__v' && item != '_id') {
          localStorage.setItem(item, dog[item]);
        }
      });

     
      return dog;
    })
    .catch(function (error) {
      console.log(error);
    });
});

$('#btnCancel').click(function () {
  window.location.href = 'meu-canil.html';
});

$('#btnSave').click(function () {
  let alteracao = false;

  const dog = {
    name: localStorage.getItem('name'),
    breed: localStorage.getItem('breed'),
    birthday: localStorage.getItem('birthday'),
    size: localStorage.getItem('size'),
    coatColor: localStorage.getItem('coatColor'),
    weight: localStorage.getItem('weight'),
    baia: localStorage.getItem('baia')
  }

  $('#form input').each(function () {
    if ($(this).val() != localStorage.getItem($(this).attr('id')) && $(this).attr('id') != 'age') {
      dog[$(this).attr('id')] = $(this).val();
      alteracao = true;
    }
  });

  if ($('#size option:selected').text() != localStorage.getItem('size')) {
    dog.size = $('#size option:selected').text();
    alteracao = true;
  }

  if (alteracao == true) {
    const config = {
      headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
    };

    axios.put('http://localhost:3001/dog/' + localStorage.getItem('dogId'), dog, config)
      .then(function (response) {
        if (response.data.error != undefined) {
          console.log(response.data.error);
        } else {
          Object.keys(user).forEach(function (property) {
            localStorage.setItem(property, user[property]);
          });

          alert('Dados salvos com sucesso!');

          window.location.href = 'meu-canil.html';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    window.history.back()
  }
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