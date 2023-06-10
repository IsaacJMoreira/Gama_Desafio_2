/**************************************************************************
 *                 DESAFIO 2 - GAMA XP51 - HACKER
 * 
 *                      >>>>> EQUIPE 3 <<<<<
 *                      MEMBROS:
 *                              > ISAAC J MOREIRA
 *                              
***************************************************************************/


/* CONSTANTES */
const bannerPeriodo = 4000;//dita o tempo que leva para o banner transicionar de uma imagem para a outra


axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";


/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/


window.onload = function() {
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
         //HERE, THE CARDS ARE ACTUALY GENERATED WITH THE REAL DATA
         let maxCards = (eventos.data.length > 3)? 3 : eventos.data.length;//mostra no máximo 3 cards no index
        for (let i = 0; i < maxCards; i++ ){
            createCard(eventos.data[i], i);
       }
       listarEventosFazerReserva()
    })//logs to the console. Can be a success message
    .catch(error => console.log(error)); 
   
};


//FUNCTION THAT CREATES THE CARDS
function createCard(element, i){
    document.getElementById('divEventos').insertAdjacentHTML("beforeEnd", `
    <article class="evento card p-5 m-3">
                    <h2>${element.name} - ${element.scheduled}</h2>
                    <h4>${element.attractions}</h4>
                    <p>${element.description}</p>
                    <a idEvento = "${element._id}" id = "botao-reservar${i}" class="btn btn-primary">reservar ingresso</a>
                </article>
    `);
}

/*******************************************************/
const listarEventosFazerReserva = async() => {

    await fetch("https://soundgarden-api.vercel.app/events")
        .then(response => response.text())
        .then((data) => JSON.parse(data))
        .then(listaDeEventos => {

            //Ordenando a lista de Eventos
            listaDeEventos.sort((a, b) => {
                return new Date(a.scheduled) - new Date(b.scheduled);
            });
            // console.log(listaDeEventos);


            //Filtrando a lista de Eventos para retornar apenas que ainda estão por vir
            const eventosFuturos = listaDeEventos.filter((data) => {
                const agora = new Date();
                return new Date(data.scheduled) > agora
            });

            //For para resumir os eventos e retornar apenas os 3 primeros da lista de eventos Futuros.
            //E criá-los na Home com a função Criar Estrutura Evento 
          
            modalReservarIngresso()
        })
        .catch(error => console.log('error', error));

    const formReservarIngresso = document.querySelector("#reserva");

    document.getElementById("botao-reservar0")
        .addEventListener("click", (event) => {
            const botaoAlvo = event.target
            const idevento = botaoAlvo.getAttribute("idevento")
            document.querySelector("#id").value = idevento;
        })

    document.getElementById("botao-reservar1")
        .addEventListener("click", (event) => {
            const botaoAlvo = event.target
            const idevento = botaoAlvo.getAttribute("idevento")
            document.querySelector("#id").value = idevento;
        })

    document.getElementById("botao-reservar2")
        .addEventListener("click", (event) => {
            const botaoAlvo = event.target
            const idevento = botaoAlvo.getAttribute("idevento")

            document.querySelector("#id").value = idevento;
        })

    const botaoConfirmar = document.querySelector("#myModal > div > div > div.modal-footer > button.btn.btn-primary")
    botaoConfirmar.addEventListener("click", (event) => {
        event.preventDefault();
        const corpoPost = {
            owner_name: formReservarIngresso[2].value,
            owner_email: formReservarIngresso[3].value,
            number_tickets: formReservarIngresso[1].value,
            event_id: formReservarIngresso[0].value
        }

      
        fetch(`https://soundgarden-api.vercel.app/bookings`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(corpoPost),
            })
            .then(() => {
                alert("Parabéns, sua reserva está concluída!");
            })
            .catch(error => console.log('error', error));
    })
}



/*******************************************************/

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