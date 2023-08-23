var num = 10;
var t;
var j;

for (t = 1; t <= num; t++) {
    var tabela = document.createElement('table');
    var cabecalho = document.createElement('thead');
    var corpo = document.createElement('tbody');

    tabela.appendChild(cabecalho);
    tabela.appendChild(corpo);

    tabela.classList.add('tabela-borda');

    document.getElementById('test').appendChild(tabela);

    
    var linhaCabecalho = document.createElement('tr');
    var celulaCabecalho1 = document.createElement('th');

    celulaCabecalho1.setAttribute('colspan', '2');
    celulaCabecalho1.textContent = 'produtos de ' + t;

    for (j = 1; j <= num; j++) {
        var linhaCorpo = document.createElement('tr');
        var celulaCorpo1 = document.createElement('td');
        var celulaCorpo2 = document.createElement('td');

        celulaCorpo1.textContent = t + ' x ' + j; 
        celulaCorpo2.textContent = t * j;
        linhaCorpo.appendChild(celulaCorpo1);
        linhaCorpo.appendChild(celulaCorpo2);
        corpo.appendChild(linhaCorpo);
    }

    linhaCabecalho.appendChild(celulaCabecalho1);
    cabecalho.appendChild(linhaCabecalho);
}

