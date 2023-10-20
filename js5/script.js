const form = document.createElement("form")
const label = document.createElement("label")
const label2 = document.createElement("label")
const altura1 = document.createElement("input")
const altura2 = document.createElement("input")
const altura3 = document.createElement("input")
const altura4 = document.createElement("input")
const altura5 = document.createElement("input")
const largura = document.createElement("input")
const botao = document.createElement("button")
const divzona = document.createElement("div")
const divinha1 = document.createElement("div")
const divinha2 = document.createElement("div")
const divinha3 = document.createElement("div")
const divinha4 = document.createElement("div")
const divinha5 = document.createElement("div")

altura1.className = "entrada"
altura2.className = "entrada"
altura3.className = "entrada"
altura4.className = "entrada"
altura5.className = "entrada"
largura.className = "entrada"
divzona.className = "divzona"

label.textContent = "Informe a altura das barras: "
label2.textContent = "Informe a largura das barras: "

altura1.name = "barra1"
altura1.type = "text"

altura2.name = "barra2"
altura2.type = "text"

altura3.name = "barra3"
altura3.type = "text"

altura4.name = "barra4"
altura4.type = "text"

altura5.name = "barra5"
altura5.type = "text"

largura.name = "largura"
largura.type = "text"

botao.name = "botao"
botao.type = "button"
botao.innerText = "Desenhar o Gráfico"

form.appendChild(label)
form.appendChild(altura1)
form.appendChild(altura2)
form.appendChild(altura3)
form.appendChild(altura4)
form.appendChild(altura5)
form.appendChild(document.createElement("br"))
form.appendChild(label2)
form.appendChild(largura)
form.appendChild(document.createElement("br"))
form.appendChild(botao)
form.appendChild(divzona)
divzona.appendChild(divinha1)
divzona.appendChild(divinha2)
divzona.appendChild(divinha3)
divzona.appendChild(divinha4)
divzona.appendChild(divinha5)

botao.addEventListener("click", function(){
    desenhar()
});

document.body.appendChild(form)

function desenhar(){
    let alturinha1 = altura1.value
    let alturinha2 = altura2.value
    let alturinha3 = altura3.value
    let alturinha4 = altura4.value
    let alturinha5 = altura5.value
    let lagurinha = largura.value

    divinha1.style.height = alturinha1 + 'px'
}