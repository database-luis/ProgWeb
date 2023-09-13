const verde = document.getElementById("verde");
const div = document.getElementById("mudar");
const azul = document.getElementById("azul");
const vermelho = document.getElementById("vermelho");
const reset = document.getElementById("reset");


verde.addEventListener('click', function(){
    div.setAttribute("background-color", 'green');
});