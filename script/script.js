/**************************************************************************
 *                 DESAFIO 2 - GAMA XP51 - HACKER
 * 
 *                      >>>>> EQUIPE 3 <<<<<
 *                      MEMBROS:
 *                              > ISAAC J MOREIRA
 *                              >
 *                              >
 * 
 *                      DATA: 
***************************************************************************/

/* CONSTANTES */
const bannerPeriodo = 4000;

/* VARIÁVEIS  */


/* SELEÇÃO DE ELEMENTOS DA DOM */
/* KEYWORDS: DOM, ELEMENTBYID */




/* IMPLEMENTAÇÃO DO MÉTODO POST */
/* KEYWORDS: GET*/

/* IMPLEMENTAÇÃO DO MÉTODO GET */


/* IMPLEMENTAÇÃO DO MÉTODO DELETE */


/* IMPLEMENTAÇÃO DO MÉTODO PUT */

/* FUNCIONALIDADE EXTRA - BANNER ROTATIVO */
// Como é extra, vou fazer fade in das imagens, ok?

//note que essa funcionalidade só dá certo se tivermos 4 imagens no banner.
//Poderia escrever uma função mais universal, mas... \_°-°_/
var bannerEstado = 0;
async function bannerAnimation(){  

       

        await SWITCH();
        console.log(bannerEstado);
        
}

function SWITCH() {
    return new Promise(resolve => {
        setTimeout(() => {
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
                    console.log("rodei o defalut!");
                break;
            }  
        }, 500);
        resolve();
    })
}

function mudaOpacidade(imagem){
   document.getElementById(`imagem${imagem}`).style.opacity = "1"; //nessa imagem, a opacidade é 100%
   for(var i = 0; i < 4; i++){
        if(i !== imagem){
            document.getElementById(`imagem${i}`).style.opacity = "0";
        }
   }
}

var bannerLoop = setInterval(() => {
    bannerAnimation();
}, bannerPeriodo);


window.onload = ()=>{
    bannerAnimation();
}