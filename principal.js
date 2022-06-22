const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3';
const TMDB_SITE = 'https://www.themoviedb.org/movie/';
let div = document.getElementById("carregarMenos");
div.style.display = "none";

// Função que cria os cards dos filmes
function MostraFilmesEmCartaz (quantidade) {
    //Executar requisição AJAX

    $.ajax({
        // Passar a URL ENDPOINT BASE + /movie/now_playing
        url: TMDB_ENDPOINT_BASE + '/movie/now_playing',
        data: {
            api_key: '0650cd2bee0f7e6151fb55a402f8b5ed'
        }
    })
    // Receber o JSON
    .done(function (data) {
 
        let codigo_html = '';
        let id = 1;

         // Montar os cards
         for (i=0; i< 4 * quantidade; i++) {

            // Concatenar o código do Card com os dados do JSON
            id_filme = data.results[i].id;
            titulo = data.results[i].title;
            dataf = data.results[i].release_date;
            votos = data.results[i].vote_average;
            imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
            descricao = data.results[i].overview;
            
            codigo_html += `<div id="id${id}" class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"><div class="card" style="width: 18rem;">
                    <div class="imagem">
                        <img src="${imagem}" class="card-img-top" alt="${titulo}">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${titulo}</h4>
                        <h5>${dataf}</h5>
                        <h5>Avaliação: ${votos}</h5>
                        <p class="card-text">${descricao}</p>
                        <button id="${id_filme}" type="button" class="resultar btn btn-outline-primary" onclick = "sessionStorage.setItem('resultado', this.id); window.location.href = 'resultado.html'">Abrir filme</button>
                    </div>
                </div></div>`;

            id++;
         }
         
        // Repassar os cards para a página
         $('#lista_filmes').html(codigo_html)

    });

}


$( document ).ready(function () {

    let num = 1;
    MostraFilmesEmCartaz(num);

    $('#carregarMais').click (function (){
        let sumir = num +1;
        if(sumir == 5)
        {
            document.getElementById("carregarMais").style.display = "none";
        }
        num++;
        div.style.display = "block";
        
        MostraFilmesEmCartaz(num);
        window.scrollBy(0, +400);
    });

    $('#carregarMenos').click (function (){      
        let verifica = num -1;
        let voltar = num;
        if(verifica == 1){
            div.style.display = "none";
        }
        else if(voltar == 5){
            document.getElementById("carregarMais").style.display = "block";
        }
        num--;

        MostraFilmesEmCartaz(num);
        window.scrollBy(0, -1200);
    });

    $(document).keypress(function(e) {
        if(e.which == 13) $('#buscar').click();
    });

    $('#buscar').click (function (){
        let b = document.getElementById('pesquisa').value;
        sessionStorage.setItem('chave', b);
        window.location.href= 'pesquisa.html';
    });

   
});
    
