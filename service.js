var apiKey = 'd3ed0cb00496abbb61e2ae4a09a7a493';
var series = [];

//essa função busca por gênero na API, carrega os detalhes e exibe a pergunta do tempo
function buscarPorGenero(genero) {
    $.ajax({
        url: 'https://api.themoviedb.org/3/discover/tv?with_genres=' + genero + '&api_key=' + apiKey,
    }).then(function (data) {
        carregarDetalhes(data.results);
        document.getElementById('porQuantoTempo').hidden = false;  
        document.getElementById('cartoesTempo').hidden = false;  
    });
}
// Vai na API buscar os detalhes de uma série e adiciona no array
function carregarDetalhes(dados){
    dados.forEach(dado => {
        $.ajax({
            url: 'https://api.themoviedb.org/3/tv/' + dado.id + '?api_key=' + apiKey,
        }).then(function (data) {
            series.push(data);
        });
    });
}

//Filtra o array series por tempo
function buscarPorTempo(minimo,maximo) {
    $('#divResultadoFiltro').html('');
    series
    .filter(serie => serie['episode_run_time'][0] <= maximo && serie['episode_run_time'][0] >= minimo)
    .forEach(element => {
        $('#divResultadoFiltro').append('<div class="card mt-4 ml-2 filme" onClick="detalhe(' + element.id + ')">' + element.name + '</div>');
    });
}
//Só busca por título lá no localizador
function buscarPorTitulo() {
    document.getElementById('hojeVocequer').hidden = true; 
    document.getElementById('cartaoGenero').hidden = true; 
    $('#divResultado').html('');
    let titulo = $('#busca').val();
    $.ajax({
        url: 'https://api.themoviedb.org/3/search/tv?query=' + titulo + '&api_key=' + apiKey,
    }).then(function (data) {
        data.results.forEach(element => {
            $('#divResultado').append('<div class="card mt-4 ml-2 filme" onClick="detalhe(' + element.id + ')">' + element.name + '</div>');
        });
    });
}
//Busca os detalhes de uma série
function detalhe(id) {
    $('#divResultadoFiltro').html('');
    $.ajax({
        url: 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + apiKey,
    }).then(function (data) {
        $('#divResultadoFiltro').append('<pre class="card mt-4 ml-2 filme-detalhe">' + JSON.stringify(data, null, 4) + '</pre >');
    });
}