const fs = require('fs');
const http = require('http');
const ultimoArgumento = process.argv[process.argv.length - 1];

// Lê o conteúdo do diretório dentro do callback da fs.readdir
fs.readdir(ultimoArgumento, (err, files) => {
  if (err) {
    console.error('Erro ao ler o diretório:', err);
    return;
  }

  const server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

    res.write(`${files.join('\n ')}`);
    res.end();
  });

  server.listen(3333);
});
