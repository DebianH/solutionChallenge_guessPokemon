let btn = document.getElementById('btn')
let formulary = document.getElementById('formulary')
let idPokemon = numRandom(1,151);


document.addEventListener('DOMContentLoaded',() => {
    //var idPokemon = numRandom(1,151);
    document.querySelector('.flex').classList.add('shadow')
    fetchData(idPokemon)
});

// Prevenir Enter
document.addEventListener("keydown", (e)=>{
    if (e.key == "Enter") {
		e.preventDefault();
		return false;
	}
})
//Crear pokemon random
function numRandom(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

//Limpiar string
const validateString = (string) => {
    let ns = string.toLowerCase().replace(".","").replace(" ","");
    return ns;
}

let local = localStorage.getItem('scorel')
const numero = document.getElementById("number")
if ('' == local) {
    var score = 0;
} else if (local == 10){
    document.querySelector(".flex").style.display = "none";
    document.querySelector(".pokemon-enter").style.display = "none";
    document.querySelector('.the-end').classList.remove('master-pokemon');
    document.querySelector('.the-end').classList.add('open-master-pokemon');
    console.log("diez");
    localStorage.clear();

} else {
    score = local
    
}
numero.innerHTML = local;

//Reques Api
async function fetchData (id) {
    try {

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json();
        showImages(data);
        var nameApi = data.name

        console.log(nameApi);

        validar(nameApi)
        return nameApi;


    } catch (error) {
        //console.log(error);
        return error;
    }
}
//validateString
function validar(str){
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        let contenido = new FormData(formulary)
        let ingreso = contenido.get("input")
        let pokename = validateString(ingreso)
        console.log(pokename);

        if(pokename == str){
            console.log("yess")
            document.querySelector('.flex').classList.remove('shadow')
            document.querySelector('.flex').classList.add('winner')
            document.querySelector('.is-centered').classList.remove('popup')
            document.querySelector('.is-centered').classList.add('open-pokemon-popup')
            setTimeout(function(){
                exitPopup();
            }, 2000)
            score ++;
            // score = localStorage.getItem(score)

            // document.querySelector('.flex').innerHTML='';
        }
        if(pokename != str){
            console.log("noou");
            document.querySelector('.is-error').classList.remove('error-game');
            document.querySelector('.is-error').classList.add('open-error-game');
            document.querySelector('.flex').classList.add('winner');
            setTimeout(function(){
                exitError();
            }, 1500)
        }

        // ;
})}
//Exit PopupWinner
function exitPopup(){
    document.querySelector('.flex').classList.remove('shadow')
    document.querySelector('.flex').classList.remove('winner')
    document.querySelector('.is-centered').classList.add('popup')
    document.querySelector('.is-centered').classList.remove('open-pokemon-popup')
    localStorage.setItem("scorel", score);
    location.reload();
}

//Exit PopupError
function exitError(){
    document.querySelector('.is-error').classList.add('error-game')
    document.querySelector('.is-error').classList.remove('open-error-game')
    document.querySelector('.flex').classList.remove('winner')
}

//Show images
const showImages = (poke) => {
    console.log(poke);
     const flex = document.querySelector('.flex');
     const template = document.querySelector('#pokemon-image').content
     const clone = template.cloneNode(true);
     const fragment = document.createDocumentFragment()

     clone.querySelector('.pokemon-view').setAttribute('src', poke.sprites.other.dream_world.front_default)
     fragment.appendChild(clone);
     flex.appendChild(fragment);
}


