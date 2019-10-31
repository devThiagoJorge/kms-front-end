var dados = [
    ['Banana', '10,00'],
    ['Maça', '2,00'],
    ['Pera', '6,00'],
    ['Goiaba', '3,25'],
    ['Tamarindo', '1,50'],
    ['Cenoura', '0,75'],
    ['Alface', '0,99'],
    ['Tomate', '3,21'],
    ['Abacaxi', 'N/D'],
    ['Kiwi', '99,50'],
    ['Cebola', '1,15'],
    ['Alho', '1,02'],
    ['Abóbora', '4,75'],
    ['Pêssego', '2,33'],
    ['laranja', '2,99']
];

var tamanhoPagina = 6;
var pagina = 0;

function paginar() {
    $('table > tbody > tr').remove();
    var tbody = $('table > tbody');
    for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++) {
        tbody.append(
            $('<tr>')
                .append($('<td>').append(dados[i][0]))
                .append($('<td>').append(dados[i][1]))
        )
    }
    $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dados.length / tamanhoPagina));
}

function ajustarBotoes() {
    $('#proximo').prop('disabled', dados.length <= tamanhoPagina || pagina > dados.length / tamanhoPagina - 1);
    $('#anterior').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
}

$(function() {
    $('#proximo').click(function() {
        if (pagina < dados.length / tamanhoPagina - 1) {
            pagina++;
            paginar();
            ajustarBotoes();
        }
    });
    $('#anterior').click(function() {
        if (pagina > 0) {
            pagina--;
            paginar();
            ajustarBotoes();
        }
    });
    paginar();
    ajustarBotoes();
});