let circulo = document.createElement("form")
circulo.name = "myForm"

let campo =  document.createElement("input")
campo.type = "text"
campo.name = "raio"

let botao = document.createElement("button")
botao.type = "button"
botao.innerText = "OK"
botao.addEventListener("click", function(){
    calcularAreaECircunferencia();
})

let quebra = document.createElement("br")
let quebra2 = document.createElement("br")

let area = document.createElement("input")
area.type = "text"
area.name = "area"

let circunferencia = document.createElement("input")
circunferencia.type = "text"
circunferencia.name = "circunferencia"

circulo.appendChild(campo)
circulo.appendChild(botao)
circulo.appendChild(quebra2)
circulo.appendChild(area)
circulo.appendChild(quebra)
circulo.appendChild(circunferencia)

document.body.appendChild(circulo)

function calcularAreaECircunferencia() {
    console.log("entrou");
    const raio = parseFloat(campo.value); // Obtenha o valor do campo de entrada "raio"
    if (!isNaN(raio)) {
        const areal = Math.PI * raio * raio;
        const circunferencial = 2 * Math.PI * raio;
        area.value = areal.toFixed(2)
        circunferencia.value = circunferencial.toFixed(2)
    } else {
        alert("Insira um valor válido para o raio.");
    }
}



  