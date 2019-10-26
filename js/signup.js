$(document).ready(function () {
    $("#inputHomePhone, #inputCellphone").mask("(00) 0000-0000");
});
$(document).ready(function () {
    $("#inputCep").mask("00000-000");
});


$('#inputCep').focusout(function () {
    var cep = $('#inputCep').val();
    axios.get('https://viacep.com.br/ws/' + cep + '/json/')
        .then(function (response) {
            var state = response.data.uf;
            var city = response.data.localidade;
            $('#inputState').val(state);
            $('#inputCity').val(city);
        })
        .catch(function (error) {
            console.log(error);
        })
});

