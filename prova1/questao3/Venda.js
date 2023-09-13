class Venda {
    Venda(id, quantidade, preco){
        this.id = id;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    getId(){
        return this.id;
    }

    getPreco(){
        return this.preco;
    }

    getQtd(){
        return this.quantidade;
    }

    setId(novoId){
        this.id = novoId;
    }

    setQtd(novaQtd){
        this.quantidade = novaQtd;
    }

    setPreco(novoPreco){
        this.preco = novoPreco;
    }

    getValorTotal(){
        return this.getQtd() * this.getPreco();
    }

}

var obj = new Venda(1001, 5, 12.8);
var tot1 = obj.getValorTotal();
console.log(tot1);