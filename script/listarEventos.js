
/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/


axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";
let botoesReserva = [];//ARRAY DOS BOTÕES DA PAGINA


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
        for (let i = 0; i < eventos.data.length; i++ ){
            createCard(eventos.data[i], i);
       }
       listarEventosFazerReserva();
    })
    .then(()=>{
        var modal = document.getElementById("myModal");
        for (let index = 0; index < botoesReserva.length; index++) {
            document.getElementById(`${botoesReserva[index].id}`).addEventListener("click", (event) => {
                const botaoAlvo = event.target
                const idevento = botaoAlvo.getAttribute("idevento")
                document.querySelector("#id").value = idevento;
                event.preventDefault()
                modal.style.display = "block";
            })
            
        }
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
    botoesReserva.push(document.getElementById(`botao-reservar${i}`));//
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
    
   

    /////////////////////////////////////////////////////////////////////

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
