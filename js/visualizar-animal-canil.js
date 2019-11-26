$(document).ready(function () {
  const dogId = localStorage.getItem('dogId');

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.get('http://localhost:3001/dog/' + dogId, config)
    .then(function (response) {
      const dog = response.data;                  
      var birthday = response.data.birthday;
      $("#age").val(ageDog(birthday));
      Object.keys(dog).forEach(function (attr) {
        $('#' + attr).val(dog[attr]);
      });

      return dog;
    })
    .catch(function (error) {
      console.log(error);
    });

    const kennelId = localStorage.getItem('kennelId');

    axios.get('http://localhost:3001/kennel/' + kennelId, config)
      .then(function (response) {
        const kennel = response.data;                  
  
        console.log(kennel)

        $('#kennelName').val(kennel.name);
        $('#kennelEmail').val(kennel.email);
        $('#kennelCep').val(kennel.cep);
        $('#kennelEstado').val(kennel.estado);
        $('#kennelCidade').val(kennel.cidade);
        $('#kennelBairro').val(kennel.bairro);
        $('#kennelRua').val(kennel.rua);
        $('#kennelNumero').val(kennel.numero);
        $('#kennelCellPhone').val(kennel.cellPhone);
        $('#kennelHomePhone').val(kennel.homePhone);

        $("#kennelCellPhone").mask("(00)00000-0000");
        $("#kennelHomePhone").mask("(00)0000-0000");
        $("#kennelCep").mask("00000-000");

  
        return kennel;
      })
      .catch(function (error) {
        console.log(error);
      });



});

$('#btnVoltar').click(function () {
  // window.location.href = 'meu-canil.html';
  window.history.back();
})

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