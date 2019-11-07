$(document).ready(function () {
  localStorage.clear();
});

$("#btnRequest").click(function () {
  var inputEmail = $("#inputEmail").val();
  var inputPassword = $("#inputPassword").val();

  axios
    .post("http://localhost:3001/login/", {
      email: inputEmail,
      password: inputPassword
    })
    .then(function (response) {
      if (response.data.error != undefined) {
        if (response.data.errorId == "1") {
          //Troca cor do campo email para vermelho
          alert("E-mail inválido.");
        } else {
          //Troca cor do campo senha para vermelho
          alert("Senha inválida.");
        }
      } else {
        var obj = response.data.user;

        Object.keys(obj).forEach(function (item) {
          localStorage.setItem(item, obj[item]);
        });

        localStorage.setItem('token', response.data.token);

        verificaCanil();
      }
    })
    .catch(function (error) {
      alert(error);
    });
});

function verificaCanil() {
  
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
        localStorage.setItem("hasKennel", true);        
      }
      window.location = "index.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}