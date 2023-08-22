var tabela = document.createElement('table');
var cabecalho = document.createElement('thead');
var corpo = document.createElement('tbody');
var num = 10;
var i;
var j;

tabela.appendChild(cabecalho);
tabela.appendChild(corpo);

tabela.classList.add('tabela-borda');

document.getElementById('test').appendChild(tabela);

for (i = 1; i <= num; i++) {
    var linhaCabecalho = document.createElement('tr');

    var celulaCabecalho1 = document.createElement('th');

    celulaCabecalho1.setAttribute('colspan', '2');
    celulaCabecalho1.textContent = 'produtos de ' + i;

    for(j = 1; j <= num; j++){
        var linhaCorpo = document.createElement('tr');
        var celulaCorpo1 = document.createElement('td');
        var celulaCorpo2 = document.createElement('td');

        celulaCorpo1.textContent = i + ' x ' + j; 
        celulaCorpo2.textContent = i * j;
        linhaCorpo.appendChild(celulaCorpo1);
        linhaCorpo.appendChild(celulaCorpo2);
        corpo.appendChild(linhaCorpo);
    }

    linhaCabecalho.appendChild(celulaCabecalho1);
    cabecalho.appendChild(linhaCabecalho);

}
