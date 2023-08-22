var tabela = document.createElement('table');
var cabecalho = document.createElement('thead');
var corpo = document. createElement('tbody');

tabela.appendChild(cabecalho);
tabela.appendChild(corpo);

document.getElementById('test').appendChild(tabela);

var linhaCabecalho = document.createElement('tr');

var celulacabecalho1 = document.createElement('th');

celulacabecalho1.textContent = 'ola';

linhaCabecalho.appendChild(celulacabecalho1);
cabecalho.appendChild(linhaCabecalho);