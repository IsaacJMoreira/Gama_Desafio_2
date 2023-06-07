axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


const baseURL = "https://soundgarden-api.vercel.app";

https://soundgarden-api.vercel.app

window.onload = function() {
    console.log("rodei onload");
    loadEvents();
  };



//FUNCTION THAT UPDATES THE EVENTS TO THE DOM
function loadEvents(){
    let eventos;
    //AXIOS gets all the events from the 
    axios({//GET is blocked in the browser due to CORS policy °~°
        method: "get",
        url: `https://soundgarden-api.vercel.app//events`       
    },  {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        eventos = response;
        console.log(response);//debug only
    })//logs to the console. Can be a success message
    .catch(error => console.log(error)); 

    //HERE, THE CARDS ARE ACTUALY GENERATED WITH THE REAL DATA
   for (let i = 0; i < eventos.length; i++ ){
        createCard(eventos[i]);
   }
};


//FUNCTION THAT CREATES THE CARDS
function createCard(element){
    document.getElementById('divEventos').innerHTML = `
    <article class="evento card p-5 m-3">
                    <h2>${element.name} - ${element.scheduled}</h2>
                    <h4>${element.attractions}</h4>
                    <p>${element.discription}</p>
                    <a href="$" class="btn btn-primary">reservar ingresso</a>
                </article>
    `
}