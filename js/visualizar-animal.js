$(document).ready(function () {
  const dogId = localStorage.getItem('dogId');

  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.get('http://localhost:3001/dog/' + dogId, config)
    .then(function (response) {
      const dog = response.data;                  

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
  window.location.href = 'meu-canil.html';
})