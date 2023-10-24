(function () {

  //professsor, desculpe a entrega atrasada, eu tentei implementar a pontuação com sprite, mas so depois vi que nao precisava
  //este eh meu ultimo commit 09/10/2023 03:42:10

  const FPS = 300;
  const HEIGHT = 300;
  const WIDTH = 1024;
  const PROB_NUVEM = 1;
  const PROB_CACTO = 1;
  const PROB_PTERO = 1;

  let gameLoop;
  let trocaTurno;
  let deserto;
  let dino;
  let letreiro;
  let pontuacao;
  let botao;
  let nuvens = [];
  let frame = 0;
  let cactos = [];
  let ehDia = true;
  let jogoIniciou = false; // a diferença entre as duas eh q a primeira serve para iniciar o jogo com espaço, guarda o estado da div "zerada"
  let jogoAtivo = true; // esta serve para as funções de pausa e de reiniciar o jogo quando perdemos
  let jogoPerdeu = false;
  let pteros = [];
  let deslocamentoChao = 2;
  let deslocamentoCacto = 2;
  let deslocamentoPtero = 3;
  let deslocamentoNuvem = 2;
  let tempoDecorrido = 0;
  let contarPontos = 0;
  let pontuacaoMaxima = 0;
  let maxima;

  function init() {
    jogoAtivo = true
    tempoDecorridoJogo = 0
    tempoDecorrido = 0
    jogoPerdeu = false
    gameLoop = setInterval(run, 1000 / FPS)
    /*deserto = new Deserto();
    dino = new Dino();
    cacto = new Cacto();*/ // deixa aqui, vai q ner kkk
    
    deserto.mudarCor();
    
  }

  function retornaJogo(){
    
    gameLoop = setInterval(run, 1000 / FPS)

    jogoAtivo = true
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && jogoIniciou === false) {
      jogoIniciou = true;
      init()
    }
  })

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      if (dino.status === 0) dino.status = 1;
    }
  })

  window.addEventListener("keydown", (e) => {
    if(e.code === "ArrowDown") {
      dino.abaixar();
    }
  })

  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowDown") {
      if (dino.status === 3) dino.status = 0;
    }
  })
  
  window.addEventListener("keydown", (e) => {
    if(e.code === "KeyP") {
      if(jogoAtivo === true) pausaJogo();
    
      else{
        retornaJogo()
      }
    } 

  })

  document.addEventListener("click", (e) => {
    if(e.target.className === "botao"){
      reiniciaJogo()
    }
  })

  class Deserto {
    constructor() {
      this.element = document.createElement("div")
      this.element.className = "deserto";
      this.element.style.width = `${WIDTH}px`;
      this.element.style.height = `${HEIGHT}px`;
      document.getElementById("game").appendChild(this.element)

      this.chao = document.createElement("div")
      this.chao.className = "chao"
      this.chao.style.backgroundPositionX = 0;
      this.element.appendChild(this.chao)

    }

    mover() {
      this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - deslocamentoChao}px`
    }

    mudarCor() {

      if(contarPontos === 0) ehDia = true

      if (ehDia) {
        this.element.style.backgroundColor = "#FFFFFF";
        console.log(ehDia)
      } else {
        this.element.style.backgroundColor = "#8C8C8C"; //finge que a cidade ta cheia de fumaça e a noite ta branca kk
        console.log(ehDia)
      }

      ehDia = !ehDia;
      
    }
  }

  class Dino {
    #status
    constructor() {
      this.backgroundPositionsX = {
        correndo1: "-1391px",
        correndo2: "-1457px",
        pulando: "-1259px",
        abaixado1: "-1652px",
        abaixado2: "-1741px"
      }

      this.backgroundPositionsY = {
        dePe: "-2px",
        abaixado: "-26px"
      }
      this.#status = 0; // 0-correndo, 1-subindo, 2-descendo
      this.altumaMinima = 2;
      this.altumaMaxima = 130;
      this.element = document.createElement("div")
      this.element.className = "dino";
      this.element.style.backgroundPositionX = this.backgroundPositionsX.correndo1;
      this.element.style.backgroundPositionY = this.backgroundPositionsY.dePe;
      this.element.style.bottom = `${this.altumaMinima}px`
      deserto.element.appendChild(this.element)
    }
    /**
     * @param {number} value
     */
    set status(value) {
      if (value >= 0 && value <= 3) this.#status = value;
    }
    get status() {
      return this.#status;
    }
    correr() {
      if (this.#status === 0 && frame % 20 === 0) {
        this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.correndo1 ? this.backgroundPositionsX.correndo2 : this.backgroundPositionsX.correndo1;
        this.element.style.backgroundPositionY = this.backgroundPositionsY.dePe;
        this.element.style.width = "66px";
        this.element.style.height = "70px";
        this.element.style.bottom = `${this.altumaMinima}px`;
      }

        else if (this.#status === 1) {
        this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
        this.element.style.bottom = `${parseInt(this.element.style.bottom) + 1}px`;
        if (parseInt(this.element.style.bottom) >= this.altumaMaxima) this.status = 2;
      }

      else if (this.#status === 2) {
        this.element.style.bottom = `${parseInt(this.element.style.bottom) - 1}px`;
        if (parseInt(this.element.style.bottom) <= this.altumaMinima) this.status = 0;
      }

      else if (this.status === 3 && frame % 20 === 0){

        this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.abaixado1 ? this.backgroundPositionsX. abaixado2 : this.backgroundPositionsX.abaixado1;
        this.element.style.backgroundPositionY = this.backgroundPositionsY.abaixado;
        this.element.style.bottom = "-2px";
        this.element.style.width = "87px";
        this.element.style.height = "46px";
      }
    }

    abaixar(){
      this.status = 3;
      if (this.status === 0){
        this.element.style.backgroundPositionX = this.backgroundPositionsX.abaixado1;
        this.element.style.backgroundPositionY = this.backgroundPositionsY.abaixado;
        this.element.style.bottom = "-2px";
        this.element.style.width = "88px";
        this.element.style.height = "46px";
      }
    }
  }

  class Nuvem {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "nuvem";
      this.element.style.right = 0;
      this.element.style.top = `${parseInt(Math.random() * 175)}px`
      deserto.element.appendChild(this.element);
    }
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + deslocamentoNuvem}px`;
      const posicao = parseInt(this.element.style.right)

      if(posicao >= WIDTH){
        this.element.remove();
        nuvens.shift();
      }
    }
  }

  class Cacto{
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "cacto";
      this.element.style.right = 0;
      deserto.element.appendChild(this.element);
      
      this.tamanho = parseInt(Math.random() * 2);
      this.grupo = parseInt(Math.random() * 4);

      this.backgroundPositionX = {
        cactoPequeno1: "-335px",
        cactoPequeno2: "-360px", 
        cactoPequeno3: "-360px",
        cactoPequeno4: "-386px",
  
        cactoGrande1: "-489px",
        cactoGrande2: "-527px",
        cactoGrande3: "-527px",
        cactoGrande4: "-602px"
      }
  
      this.backgroundPositionY = "-2px";

      this.cactoLargura = {
        cactoGrande1: "38px",
        cactoGrande2: "75px",
        cactoGrande3: "111px",
        cactoGrande4: "112px",

        cactoPequeno1: "25px",
        cactoPequeno2: "51px",
        cactoPequeno3: "76px",
        cactoPequeno4: "102px"
      }

      this.cactoAltura ={
        cactoPequeno: "52px",
        cactoGrande: "75px"
      }
    }

    escolher(){

      if(this.tamanho === 0){
        this.element.style.height = this.cactoAltura.cactoPequeno
        
        if(this.grupo === 0){
          this.element.style.backgroundPositionX = this.backgroundPositionX.cactoPequeno1;
          this.element.style.width = this.cactoLargura.cactoPequeno1;
        }

        else if(this.grupo === 1){
          this.element.style.backgroundPositionX = this.backgroundPositionX.cactoPequeno2;
          this.element.style.width = this.cactoLargura.cactoPequeno2;
        }

        else if(this.grupo === 2){
          this.element.style.backgroundPositionX = this.backgroundPositionX.cactoPequeno3;
          this.element.style.width = this.cactoLargura.cactoPequeno3;
        }

        else {
         
          this.element.style.backgroundPositionX = this.backgroundPositionX.cactoPequeno4;
          this.element.style.width = this.cactoLargura.cactoPequeno4;
          
        }
      }

      else {
        this.element.style.height = this.cactoAltura.cactoGrande;
        
        if(this.grupo === 0){
          this.element.style.backgroundPositionX = this.backgroundPositionX.cactoGrande1;
          this.element.style.width = this.cactoLargura.cactoGrande1;
        }

        else if(this.grupo === 1){
          this.element.style.backgroundPositionX = this.backgroundPositionX.cactoGrande2;
          this.element.style.width = this.cactoLargura.cactoGrande2;
        }

        else if(this.grupo === 2){
          this.element.style.backgroundPositionX = this.backgroundPositionX.cactoGrande3;
          this.element.style.width = this.cactoLargura.cactoGrande3;
        }

        else {
          this.element.style.backgroundPositionX = this.backgroundPositionX.cactoGrande4;
          this.element.style.width = this.cactoLargura.cactoGrande4;
        }
      }
    }

    mover(){
      this.element.style.right = `${parseInt(this.element.style.right) + deslocamentoCacto}px`;

      const posicao = parseInt(this.element.style.right)

      if(posicao >= WIDTH){
        this.element.remove();
        cactos.shift();
      }
    }

  }

  class Ptero {
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "ptero";
      deserto.element.appendChild(this.element);

      this.altura = {
        posicao1: "51px",
        posicao2: "45px"
      }

      this.element.style.width = "69px";

      this.backgroundPositionsX = {
        posicao1: "-192px",
        posicao2: "-264px"
      }

      this.backgroundPositionsY = {
        posicao1: "-11px",
        posicao2: "-2px",
      }

      this.nivel = parseInt(Math.random() * 3);

      this.element.style.right = 0;

      this.element.style.backgroundPositionX = this.backgroundPositionsX.posicao1;
      this.element.style.backgroundPositionY = this.backgroundPositionsY.posicao1;
      this.element.style.height = this.altura.posicao1;
    }

    mover(){
      this.element.style.right = `${parseInt(this.element.style.right) + deslocamentoPtero}px`;
      const posicao = parseInt(this.element.style.right)

      if(this.nivel === 0){
        this.element.style.bottom = "220px";
      }

      else if(this.nivel === 1){
        this.element.style.bottom = "47px";
      }

      else {
        this.element.style.bottom = "20px";
      }

      if(posicao >= WIDTH){
        this.element.remove();
        pteros.shift();
      }

    }

    voar(){
      if(frame % 30 === 0){
        this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.posicao1 ? this.backgroundPositionsX.posicao2 : this.backgroundPositionsX.posicao1;
        this.element.style.backgroundPositionY = this.backgroundPositionsY.posicao2;
        this.element.style.height = this.altura.posicao2; 
      }

      else {
        this.element.style.height = this.altura.posicao1;
      }
    }
  }

  class Letreiro {
    constructor(){
      this.element = document.createElement("div")
      this.element.className = "letreiro"
    } 

    mostrarLetreiro(){
      if(jogoPerdeu === true){
        deserto.element.appendChild(this.element)
      }
    }
  }

  class Botao {
    constructor(){
      this.element = document.createElement("div")
      this.element.className = "botao"
    }

    mostrarBotao(){
      if(jogoPerdeu === true){
        deserto.element.appendChild(this.element)
      }
    }
  }

  class Pontuacao {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "pontuacao";
      
      this.atualizarPontuacao(contarPontos);
      deserto.element.appendChild(this.element);
    }
  
    atualizarPontuacao(pontos) {
      this.element.innerHTML = '';
      const formatade = pontos.toString().padStart(5, 0)
      const textoPontuacao = document.createTextNode(`${formatade}`);
      this.element.appendChild(textoPontuacao);
    }
  }

  class PontuacaoMaxima {
    constructor(){
      this.element = document.createElement("div")
      this.element.className = "max"
      deserto.element.appendChild(this.element)
    }

    atualizarPontuacao(pontos) {

      if(pontos > pontuacaoMaxima){
        this.element.innerHTML = '';
        const formatade = pontos.toString().padStart(5, 0)
        const textoPontuacao = document.createTextNode(`HI ${formatade}`);
        this.element.appendChild(textoPontuacao);
        pontuacaoMaxima = pontos
      }

    }
  }

  function reiniciaJogo(){
    cactos.forEach(cacto => cacto.element.remove())
    nuvens.forEach(nuvem => nuvem.element.remove())
    pteros.forEach(ptero => ptero.element.remove())

    contarPontos = 0
    frame = 0


    cactos = []
    nuvens = []
    pteros = []

    botao.element.remove()
    letreiro.element.remove()
    dino.element.remove()

    init()
    dino = new Dino()

  }

  function verificarColisao() {
    for (let i = 0; i < cactos.length; i++) {
      const cacto = cactos[i];
  
      if (dino.element.offsetLeft + dino.element.offsetWidth > cacto.element.offsetLeft && dino.element.offsetLeft < cacto.element.offsetLeft + cacto.element.offsetWidth && dino.element.offsetTop + dino.element.offsetHeight > cacto.element.offsetTop) {
        fimDeJogo()
      }
    }

    for (let j = 0; j < pteros.length; j++) {
      const ptero = pteros[j];
  
      if ( dino.element.offsetLeft + dino.element.offsetWidth > ptero.element.offsetLeft &&
      dino.element.offsetLeft < ptero.element.offsetLeft + ptero.element.offsetWidth &&
      dino.element.offsetTop + dino.element.offsetHeight > ptero.element.offsetTop &&
      dino.element.offsetTop < ptero.element.offsetTop + ptero.element.offsetHeight) {
        fimDeJogo()
      }
    }
  }

  function aumentarDeslocamento(){
    deslocamentoChao += 1;
    deslocamentoCacto += 1;
    deslocamentoPtero += 2;
    deslocamentoNuvem += 1;
  }

  function run() {
    tempoDecorrido += 1 / FPS;
    tempoDecorridoJogo += 1 / FPS;

    console.log("tempo:", parseInt(tempoDecorrido))

    frame = frame + 1

    if(frame % 30 === 0) {
      contarPontos++;
      pontuacao.atualizarPontuacao(contarPontos);
    }

    if(contarPontos % 31 === 0 && contarPontos > 0 && frame % 31 === 0){
      gerarCacto()

    }

    if(tempoDecorridoJogo >= 30 && contarPontos % 31 === 0 && contarPontos > 0 && frame % 31 === 0) gerarPtero()

    if (frame === FPS) frame = 0;
    deserto.mover()
    dino.correr()
    verificarColisao()
    if (Math.random() * 800 <= PROB_NUVEM) nuvens.push(new Nuvem()) // decidi diminuir a geração de nuvens..
    if (frame % 2 === 0) nuvens.forEach(nuvem => nuvem.mover())
    
    cactos.forEach(cacto => cacto.escolher());
    cactos.forEach(cacto => cacto.mover());

    pteros.forEach(ptero => ptero.mover());
    pteros.forEach(ptero => ptero.voar());

    
    //a cada 60seg incrementa a vel e trocaTurno
    //tentei usar o setInterval mas n consegui debugar
    if(tempoDecorrido >= 60){
      aumentarDeslocamento();
      deserto.mudarCor()
      tempoDecorrido = 0;
    }

  }

  function gerarPtero() {
    pteros.push(new Ptero());
  }

  function gerarCacto() {
    
    cactos.push(new Cacto());
  
  }

  function pausaJogo(){

    if (jogoAtivo === true) {
      clearInterval(gameLoop);
      jogoAtivo = false;
    } 
    
    else {
      retornaJogo()
    }
  }

 

  //init()

  
  deserto = new Deserto();
  dino = new Dino();
  pontuacao = new Pontuacao();
  botao = new Botao();
  letreiro = new Letreiro()
  dino.element.style.backgroundPositionX = "-1259px";
  dino.element.style.backgroundPositionY = "-2px";

  function fimDeJogo(){
    jogoPerdeu = true
    frame = 0
    clearInterval(gameLoop)
    if(pontuacaoMaxima === 0){
      maxima = new PontuacaoMaxima()
    }
    maxima.atualizarPontuacao(contarPontos)
    botao.mostrarBotao()
    letreiro.mostrarLetreiro()
    dino.element.style.backgroundPositionX = "-1523px"
    dino.element.style.backgroundPositionY = "-2px"
    dino.element.style.height = "71px"
    dino.element.style.width = "67px"
  }

})()