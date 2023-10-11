class ConjuntoDeInteiros {
    constructor(valorMaximo) {
      this.valorMaximo = valorMaximo;
      this.conjunto = new Array(valorMaximo + 1).fill(false);
    }
  
    inserir(valor) {
      if (valor >= 0 && valor <= this.valorMaximo) {
        this.conjunto[valor] = true;
      }
    }
  
    remover(valor) {
      if (valor >= 0 && valor <= this.valorMaximo) {
        this.conjunto[valor] = false;
      }
    }
  
    uniao(outroConjunto) {
      const resultado = new ConjuntoDeInteiros(this.valorMaximo);
      for (let i = 0; i <= this.valorMaximo; i++) {
        resultado.conjunto[i] = this.conjunto[i] || outroConjunto.conjunto[i];
      }
      return resultado;
    }
  
    intersecao(outroConjunto) {
      const resultado = new ConjuntoDeInteiros(this.valorMaximo);
      for (let i = 0; i <= this.valorMaximo; i++) {
        resultado.conjunto[i] = this.conjunto[i] && outroConjunto.conjunto[i];
      }
      return resultado;
    }
  
    diferenca(outroConjunto) {
      const resultado = new ConjuntoDeInteiros(this.valorMaximo);
      for (let i = 0; i <= this.valorMaximo; i++) {
        resultado.conjunto[i] = this.conjunto[i] && !outroConjunto.conjunto[i];
      }
      return resultado;
    }
  
    toString() {
      const elementos = [];
      for (let i = 0; i <= this.valorMaximo; i++) {
        if (this.conjunto[i]) {
          elementos.push(i);
        }
      }
      return `{${elementos.join(', ')}}`;
    }
  }
  
  // Aplicação de teste
  const conjunto1 = new ConjuntoDeInteiros(10);
  conjunto1.inserir(2);
  conjunto1.inserir(4);
  conjunto1.inserir(6);
  console.log("Conjunto 1:", conjunto1.toString()); // {2, 4, 6}
  
  const conjunto2 = new ConjuntoDeInteiros(10);
  conjunto2.inserir(4);
  conjunto2.inserir(8);
  conjunto2.inserir(10);
  console.log("Conjunto 2:", conjunto2.toString()); // {4, 8, 10}
  
  const resultadoUniao = conjunto1.uniao(conjunto2);
  console.log("União:", resultadoUniao.toString()); // {2, 4, 6, 8, 10}
  
  const resultadoIntersecao = conjunto1.intersecao(conjunto2);
  console.log("Interseção:", resultadoIntersecao.toString()); // {4}
  
  const resultadoDiferenca = conjunto1.diferenca(conjunto2);
  console.log("Diferença:", resultadoDiferenca.toString()); // {2, 6}
  