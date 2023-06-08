/***************************************************

                 ISAAC ESTEVE AQUI °-°
                    
****************************************************/

//BLACK MAGIC FUCKERY - DON'T TOUCH. I REPEAT: DO NOT FUCKING TOUCH!!!
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";


//WHEN THE PAGE IS LOADED, THE INFO APEARS ON SCREEN

let ID = window.location.search.substring(4);//GETS THE ID FROM THE URL °-°

window.onload = function() {
    console.log("rodei onload");//debug only
    loadEvents();
  };

//FUNCTION THAT UPDATES GETS THE DATA FROM THE EVENT YOU ARE ABOUT TO DELET FROM THE API
function loadEvents(){
    
    console.log(ID);
    let evento;
    //AXIOS gets the events from the DB
    axios({
        method: "get",
        url: `${baseURL}/events/${ID}`       
    },  {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PUT, POST, PATCH. DELETE, GET',
        }
    })
    .then(response => {
        evento = response;
        console.log("DADOS RETORNADOS: ", response);//debug only
         fillForm(evento);
    })
    .catch(error => console.log(error));       
};

//FUNCTION THAT PUTS THE INFO ABOUT WHAT YOU ARE ABOUT TO DELETE
function fillForm(evento){
    document.querySelector('#nome').value = evento.data.name;
    document.querySelector('#banner').value = evento.data.poster;
    document.querySelector('#atracoes').value =  evento.data.attractions.join(', ');
    document.querySelector('#descricao').value = evento.data.description;
    document.querySelector('#data').value = new Date(evento.data.scheduled).toLocaleString("pt-br");
    document.querySelector('#lotacao').value = evento.data.number_tickets;
}

//NOW LETS DEAL WITH UNFOLDING OF EVENTS THAT HAVE TO ACCOUR IN ORDER FOR THE DATA TO BE DELETED.

//FIRST WE HAVE TO HANDLE THE PRESSING OF THE DELET BUTTON EVENT
document.getElementById("excluirEvento").addEventListener("click", (event)=>{
    //the user has to confirm if he/she is really sure.
    let okToDelete = confirm("Tem certeza que deseja excluir este evento permanentemente?");
    event.preventDefault();
    if(okToDelete){//if the user is sure
        axios//axius will delete that event
            .delete( `${baseURL}/events/${ID}` )
            .then(response => {
                evento = response;
                console.log("deletado com sucesso", "DADOS RETORNADOS: ", response);//debug only
                
                })
            .then(() => window.location.href = "admin.html")//volta pra pád=gina ADM
            .catch(error => console.log(error));  
    }else{
        alert("Evento não deletado!");
    }
});

