const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3';
const TMDB_SITE = 'https://www.themoviedb.org/movie/';

// Função pesquisar filmes
function PesquisaFilmes () {
    let pesquisa = sessionStorage.getItem('chave');

    $.ajax({
        // Passar a URL ENDPOINT BASE + /movie/now_playing
        
        url: TMDB_ENDPOINT_BASE + '/search/movie',
        data: {
            api_key: '0650cd2bee0f7e6151fb55a402f8b5ed',
            query: pesquisa
        }
    })
    // Receber o JSON
    .done(function (data) {
     
        $("#qtd").html(`${data.results.length} resultado(s) obtido(s)!`);
        let codigo_html = '';
        
        // Montar os cards
        for (i=0; i< data.results.length; i++) {

            // Concatenar o código do Card com os dados do JSON
            titulo = data.results[i].title;
            imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
            descricao = data.results[i].overview;
                   
            /*var img = document.createElement('img');
            img.src = imagem;
            if(img.onerror) {
                break pula;
            }*/
                        
            codigo_html += `<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"><div class="card" id="card" style="width: 18rem;">
            <div class="imagem">
                <img src="${imagem}" class="card-img-top" alt="${titulo}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${descricao}</p>
                <a href="${TMDB_SITE + data.results[i].id}" class="btn btn-primary" target="_blanck">Abrir filme</a>
            </div>
            </div></div>`;                     
        }

        if(data.results == 0)
        {
            codigo_html += `<div style="height: 20rem;"></div>`;
        }
        


        // Repassar os cards para a página
         $('#lista_filmes').html(codigo_html)

    });
}


$( document ).ready(function () {

    PesquisaFilmes();

    $(document).keypress(function(e) {
        if(e.which == 13) $('#buscar').click();
    });

    $('#buscar').click (function (){
     
        let b = document.getElementById('pesquisa').value;
        sessionStorage.setItem('chave', b);
        PesquisaFilmes();
        $('html,body').scrollTop(0);
    });
});