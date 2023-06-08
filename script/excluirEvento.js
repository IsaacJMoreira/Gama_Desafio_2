/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/


axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";

window.onload = function() {
    console.log("rodei onload");//debug only
    loadEvents();
  };

//FUNCTION THAT UPDATES THE EVENTS TO THE DOM
function loadEvents(){
    let ID = window.location.search.substring(4);//pega a ID do evento a sex excluido
    console.log(ID);
    let evento;
    //AXIOS gets all the events from the DB
    axios({
        method: "get",
        url: `${baseURL}/events/${ID}`       
    },  {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        evento = response;
        console.log("DADOS RETORNADOS: ", response);//debug only
         //HERE, THE CARDS ARE ACTUALY GENERATED WITH THE REAL DATA
         fillForm(evento);
    })//logs to the console. Can be a success message
    .catch(error => console.log(error));   
    
    
    
};


function fillForm(evento){
    document.querySelector('#nome').value = evento.data.name;
    document.querySelector('#atracoes').value =  evento.data.attractions.join(', ');
    document.querySelector('#descricao').value = evento.data.description;
    document.querySelector('#data').value = new Date(evento.data.scheduled).toLocaleString("pt-br");
    document.querySelector('#lotacao').value = evento.data.number_tickets;
}