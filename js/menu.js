$(document).ready(function () {
  var firstName = localStorage.getItem('firstName');
  var lastName = localStorage.getItem('lastName');
  $("#user").text(firstName + " " + lastName);
});

$('#btnMeuCanil').click(function () {    
  buscaCanil();
});

function buscaCanil() {
  const kennelAdm = localStorage.getItem('_id');  
  const config = {
    headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
  };

  axios.get('http://localhost:3001/kennel/search?kennelAdm=' + kennelAdm, config)
    .then(function (response) {
      const kennel = response.data;
    if (kennel == '') {                
      localStorage.setItem("hasKennel", false);
      } else {        
        console.log(kennel._id);
        localStorage.setItem("hasKennel", true);
        localStorage.setItem("kennel", JSON.stringify(kennel));        
      }
      window.location.href = "meu-canil.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

