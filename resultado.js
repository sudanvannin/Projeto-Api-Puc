const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3';
const TMDB_SITE = 'https://www.themoviedb.org/movie/';

// Função pesquisar filmes
function Resultado () {
    let id = sessionStorage.getItem('resultado');

    $.ajax({
        // Passar a URL ENDPOINT BASE + /movie/now_playing
        url: TMDB_ENDPOINT_BASE + `/movie/${id}`,
        data: {
            api_key: '0650cd2bee0f7e6151fb55a402f8b5ed'
        }
    })
    // Receber o JSON
    .done(function (data) {

        titulo = data.title;
        imagem = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
        descricao = data.overview;
        genero = data.genres;
        data_fil = data.release_date;
        linguagem = data.original_language;

        codigo_html = `<div class="container-fluid row">
            <div id="filme_resultado" class="imagem col-12 col-sm-12 col-md-4 col-lg-4">
                <img src="${imagem}" alt="${titulo}"></img>                 
            </div>
            <div id="filme_dados" class="col-12 col-sm-12 col-md-8 col-lg-8">
                <h3>${titulo}</h3>
                <p>${descricao}</p>  
                <h5>Linguagem original: ${linguagem}</h5>   
                <h5>Gênero: ${genero[0].name}</h5>      
                <h5>Data: ${data_fil}</h5>              
            </div>
        </div>`; 

        // Repassar os cards para a página
         $('#filme').html(codigo_html)
    });
}


$( document ).ready(function () {

    Resultado();

    $(document).keypress(function(e) {
        if(e.which == 13) $('#buscar').click();
    });

    $('#buscar').click (function (){
        let b = document.getElementById('pesquisa').value;
        sessionStorage.setItem('chave', b);
        window.location.href= 'pesquisa.html';
    });
});