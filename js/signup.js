$(document).ready(function () {
    $("#inputCellphone").mask("(00)00000-0000");
    $("#inputHomePhone").mask("(00)0000-0000");
    $("#inputCep").mask("00000-000");
    localStorage.clear();
});

$("#inputCep").keyup(function() {
  var cep = $("#inputCep").val();
  if (cep.length === 9) {
    axios
      .get("https://viacep.com.br/ws/" + cep + "/json/")
      .then(function(response) {
        if (!response.data.erro) {
          var state = response.data.uf;
          var city = response.data.localidade;
          $("#inputState").val(state);
          $("#inputCity").val(city);
          $("#inputCep").css("border"," 1px solid #ced4da");
        } else {

          $("#inputCep").css("border"," 1px solid red");
         
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

$("#btnRegister").click(function() {
  var inputEmail = $("#inputEmail").val();
  var inputPassword = $("#inputPassword").val();
  var inputFirstName = $("#inputFirstName").val();
  var inputLastName = $("#inputLastName").val();
  var inputCellphone = $("#inputCellphone").val();
  var inputHomePhone = $("#inputHomePhone").val();
  var inputCep = $("#inputCep").val();
  var inputState = $("#inputState").val();
  var inputCity = $("#inputCity").val();

  axios
    .post("http://localhost:3001/signup/", {
      firstName: inputFirstName,
      lastName: inputLastName,
      email: inputEmail,
      password: inputPassword,
      cellphone: inputCellphone,
      homePhone: inputHomePhone,
      cep: inputCep,
      state: inputState,
      city: inputCity
    })

    .then(function(response) {
      console.log(response.data);
      if (response.data.error != undefined) {
        if (response.data.errorId == "1") {
          //Troca cor do campo email para vermelho
          alert("Usuário já cadastrado");
        } else {
          //Troca cor do campo senha para vermelho
          alert("Erro ao cadastrar usuario.");
        }
      } else {
        localStorage.setItem("hasKennel", false);

        var obj = response.data.user;

        Object.keys(obj).forEach(function(item) {
          localStorage.setItem(item, obj[item]);
        });

        localStorage.setItem("token", response.data.token);

        window.location.href = "index.html";
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});