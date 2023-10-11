let pontos = 0

function jogo(){
    let jogador = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"))
    let computador = parseInt(Math.random() * 3) + 1
    if(computador === 1) console.log("O computador jogou Papel")
    else if(computador === 2) console.log("O computador jogou Pedra")
    else if(computador === 3) console.log("O computador jogou Tesoura")

    if(jogador < 1 || jogador > 3){
        fimDeJogo()
    }

    if(jogador === computador){
        console.log("A rodada empatou!")
        jogo()
    }

    else if(jogador === 1 && computador === 2 || jogador === 2 && computador === 3 || jogador === 3 && computador === 1){
        console.log("Você ganhou!")
        pontos++
        jogo()
    }

    else{
        fimDeJogo()
    }


}

function fimDeJogo(){
    console.log("Você perdeu! A sua pontuação foi de", pontos)
}

jogo()
