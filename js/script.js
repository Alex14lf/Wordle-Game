let palabras = [
    "mesas", "actor", "calle", "hojas", "avion", "fuego", "calas", "balas", "luces", "calma",
    "panes", "besos", "nubes", "cielo", "rojas", "niños", "valor", "risas", "reloj", "feliz",
    "lagos", "mosca", "dulce", "silla", "verde", "camas", "casas", "leche", "marco", "furia",
    "playa", "sabor", "noche", "celda", "cajas", "libro", "bueno", "fruta", "tarta", "canto",
    "perla", "torre", "luzca", "truco", "vuelo", "balon", "brote", "chico", "patio", "tejas",
    "focas", "gafas", "dedos", "curva", "curvo", "papel", "vista", "tinta", "pleno", "perro",
    "selva", "pesca", "finca", "vuela", "finas", "grasa", "horno", "aviso", "juego", "cuero",
    "toros", "marca", "tanto", "verso", "parte", "bajos", "balsa", "bolsa", "traer", "zorro",
    "cuota", "broma", "recio", "crudo", "suelo", "sordo", "naves", "flora", "vozca", "chile",
    "resta", "tozco", "sutil", "melon", "campo", "rizos", "cesto", "monte", "hielo", "sabio",
    "corro", "islas", "cerdo", "raton", "tonto", "pulso", "heroe", "genio", "tenis", "pilar",
    "atomo", "gente", "poder", "lugar", "clara", "feria", "orden", "razon", "altar", "volar"
]
//Variables
let palabra = palabras[Math.floor(Math.random() * palabras.length)];//Crear un aleatorio para generar la palabra que hay que adivinar
let palabraGenerada = palabra.split("");//Para convertir la palabra que el juego nos da en un array;
let palabraIngresada = []; //Array donde vamos a almacenar los valores que introducimos en el input
let container__inputs=document.getElementById("container__inputs");
let h1victory=document.querySelector(".victory__message");
let h1defeat=document.querySelector(".defeat__message");
let button=document.getElementById("button");
console.log(palabra);
console.log(palabraGenerada);

loadGame = () => {
    loadRow();
    console.log(document.activeElement);
    let foco = document.activeElement;
    let padre = foco.parentElement;
    let inputs = Array.from(padre.children);
    let divs = document.querySelectorAll(".container__input");
    let palabraCorrecta = false;
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            let letra = input.value.toLowerCase();
            palabraIngresada.push(letra);
            console.log(palabraIngresada);
            if (input.nextElementSibling) {
                input.nextElementSibling.focus();
            } else {
                document.activeElement.blur();
                let posicionesCorrectas = letrasCorrectas(palabraGenerada, palabraIngresada);
                let letrasIncluidas = letrasEncontradas(posicionesCorrectas,palabraGenerada, palabraIngresada);

                posicionesCorrectas.forEach(i => {
                    inputs[i].classList.add("correct__input");
                });

                letrasIncluidas.forEach(i => {
                    inputs[i].classList.add("half__input");
                });

                inputs.forEach(input=>{
                    if(!input.classList.contains("correct__input") && !input.classList.contains("half__input")){
                        input.classList.add("incorrect__input");
                    }
                });

                if (posicionesCorrectas.length === palabraGenerada.length) {
                    console.log("has ganado");
                    palabraCorrecta = true;
                    h1victory.classList.remove("hide");
                    button.classList.remove("hide");
                }
                if (divs.length < 5 && !palabraCorrecta) {
                    palabraIngresada = [];
                    loadGame();
                    console.log(divs.length);
                }
                if(divs.length==5 && !palabraCorrecta){
                    h1defeat.classList.remove("hide");
                    h1defeat.textContent+=palabra;
                    button.classList.remove("hide");
                }
            }
        })

    })
    
}

loadRow=()=>{
    let container__inputs = document.getElementById("container__inputs");
    let div = document.createElement("DIV");
    div.classList.add("container__input");
    for (let x = 0; x < palabra.length; x++) {
        let input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.setAttribute("maxlength", "1");
        input.classList.add("input__game");
        div.appendChild(input);
    }
    container__inputs.append(div);
    div.firstElementChild.focus();
}

function letrasCorrectas(array1, array2) {
    let letrasCorrectas = []; 
    array1.forEach((letra, i) => {
        if (letra === array2[i]) {
            letrasCorrectas.push(i);
        } 
    });
    return letrasCorrectas;
}

function letrasEncontradas(letrasCorrectas,array1, array2) {
    let auxArray1=[...array1];
    let auxArray2=[...array2];
    let letrasNoExistentes = [];
    let letrasExistentes = [];
    letrasCorrectas.forEach(i => {
        auxArray1[i]="*";
    });
    for (let i = 0; i < array2.length; i++) {
        for (let x = 0; x < array2.length; x++) {
            console.log(auxArray1[x]+"-->"+auxArray2[i]);
            if(auxArray1[x]==auxArray2[i]){
                console.log("igual");
                console.log(i);
                letrasExistentes.push(i);
                auxArray1[x]="*";
                break;
            }      
        }
        console.log("----------------")
    }
    console.log("LETRAS EXISTENTES: "+letrasExistentes);
    console.log("LETRAS NO EXISTENTES: "+letrasNoExistentes);
    return letrasExistentes;
}

reload=()=>{
    location.reload();
}

document.addEventListener("DOMContentLoaded", loadGame);
button.addEventListener("click",reload);