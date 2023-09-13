const verde = document.getElementById("verde");
const div = document.getElementById("mudar");
const azul = document.getElementById("azul");
const vermelho = document.getElementById("vermelho");
const reset = document.getElementById("reset");


verde.addEventListener("click", function(){
    div.style.setProperty("background-color", "green");
});

vermelho.addEventListener("click", function(){
    div.style.setProperty("background-color", "red");
});