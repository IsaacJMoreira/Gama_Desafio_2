/**************************************************************************
 *                 DESAFIO 2 - GAMA XP51 - HACKER
 * 
 *                      >>>>> EQUIPE 3 <<<<<
 *                      MEMBROS:
 *                              > ISAAC J MOREIRA
 *                              > WEBERTON RODRIGUES DA SILVA
 *                              > MARIANA
 * 
 *                      DATA: 
***************************************************************************/


/* CONSTANTES */
const bannerPeriodo = 4000;//dita o tempo que leva para o banner transicionar de uma imagem para a outra


axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";



/* VARIÁVEIS  */


/* EVENTOS */

/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/


window.onload = function() {
    console.log("rodei onload");
    loadEvents();
  };

//FUNCTION THAT UPDATES THE EVENTS TO THE DOM
function loadEvents(){
    let eventos;
    //AXIOS gets all the events from the DB
    axios({
        method: "get",
        url: `${baseURL}/events`       
    },  {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        eventos = response;
        console.log("DADOS RETORNADOS: ", response);//debug only
         //HERE, THE CARDS ARE ACTUALY GENERATED WITH THE REAL DATA
         let maxCards = eventos.data.length >= 3? 3 : eventos.data.length;//mostra no máximo 3 cards no index
        for (let i = 0; i < maxCards; i++ ){
            createCard(eventos.data[i]);
       }
    })//logs to the console. Can be a success message
    .catch(error => console.log(error)); 
   
};


//FUNCTION THAT CREATES THE CARDS
function createCard(element){
    document.getElementById('divEventos').insertAdjacentHTML("beforeEnd", `
    <article class="evento card p-5 m-3">
                    <h2>${element.name} - ${element.scheduled}</h2>
                    <h4>${element.attractions}</h4>
                    <p>${element.discription}</p>
                    <a href="$" class="btn btn-primary">reservar ingresso</a>
                </article>
    `);
}

/* FUNCIONALIDADE EXTRA - BANNER ROTATIVO */
// Como é extra, vou fazer fade in das imagens, ok?

/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/

//note que essa funcionalidade só dá certo se tivermos 4 imagens no banner.
//Poderia escrever uma função mais universal, mas... \_°-°_/
 
 var bannerEstado = 0;
 function bannerAnimation(){ 
    switch (bannerEstado){//cria uma pequena máquina de estados para constantemente mudar a imagem do banner
        case 0:
            mudaOpacidade(bannerEstado);
            bannerEstado = 1;
            break;
        case 1:
            mudaOpacidade(bannerEstado);
            bannerEstado = 2;
            break;
        case 2:
            mudaOpacidade(bannerEstado);   
            bannerEstado = 3       
            break;
        case 3:
            mudaOpacidade(bannerEstado);
            bannerEstado = 0;
            break;
        default:
            bannerEstado = 0;
            console.log("ERRO! O programa nunca deveria ter chegado nessa linha!!!");
        break;
    }  
        console.log("Banner sendo mostrado: " + bannerEstado);
}


function mudaOpacidade(imagem){https://www.hackerrank.com/
   document.getElementById(`imagem${imagem}`).style.opacity = "1"; //nessa imagem, a opacidade é 100%
   for(var i = 0; i < 4; i++){
        if(i !== imagem){
            document.getElementById(`imagem${i}`).style.opacity = "0";//em todas as outras, a opacidade é 0%
        }
   }
}

var bannerLoop = setInterval(() => {//Essa função vai ser executada, chamando a animação do banner constantemente
    bannerAnimation();
}, bannerPeriodo);