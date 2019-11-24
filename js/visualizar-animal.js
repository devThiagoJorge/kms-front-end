$(document).ready(function () {
  const dogId = localStorage.getItem('dogId');
  console.log(dogId);
  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.get('http://localhost:3001/dog/' + dogId, config)
    .then(function (response) {
      const dog = response.data;                  
      var birthday = response.data.birthday;
      var yearDog ="";
      for(var i=0; i < 4 ; i++){
        yearDog += birthday[i];
      }

      var currentTime = new Date()
      var currentYear = currentTime.getFullYear()

      var ageDog = parseInt(currentYear) - parseInt(yearDog);
      
      $("#age").val(ageDog);
      Object.keys(dog).forEach(function (attr) {
        $('#' + attr).val(dog[attr]);
      });

      return dog;
    })
    .catch(function (error) {
      console.log(error);
    });

    
});

$('#btnVoltar').click(function () {
  // window.location.href = 'meu-canil.html';
  window.history.back();
})


