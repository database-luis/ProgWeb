(function () {

  const FPS = 300;
  const HEIGHT = 300;
  const WIDTH = 1024;
  const PROB_NUVEM = 1;
  const PROB_CACTO = 1;

  let gameLoop;
  let deserto;
  let dino;
  let nuvens = [];
  let frame = 0;
  let cactos = [];
  let jogoIniciou = false;

  function init() {
    gameLoop = setInterval(run, 1000 / FPS)
    /*deserto = new Deserto();
    dino = new Dino();
    cacto = new Cacto();*/ // deixa aqui, vai q ner kkk

    trocaTurno = setInterval(() => {
      deserto.mudarCor();
    }, 60000);
    deserto.mudarCor();
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
  });

  class Deserto {
    constructor() {
      this.element = document.createElement("div")
      this.element.className = "deserto";
      this.element.style.width = `${WIDTH}px`;
      this.element.style.height = `${HEIGHT}px`;
      document.getElementById("game").appendChild(this.element)
      this.isDia = true;

      this.chao = document.createElement("div")
      this.chao.className = "chao"
      this.chao.style.backgroundPositionX = 0;
      this.element.appendChild(this.chao)
    }
    mover() {
      this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 1}px`
    }

    mudarCor() {
      if (this.isDia) {
        this.element.style.backgroundColor = "#FFFFFF";
        console.log(this.isDia)
      } else {
        this.element.style.backgroundColor = "#8C8C8C"; //finge que a cidade ta cheia de fumaça e a noite ta branca kk
        console.log(this.isDia)
      }
      this.isDia = !this.isDia; 
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
      this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
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

      console.log(this.tamanho, this.grupo);
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
      this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;

      const posicao = parseInt(this.element.style.right)

      if(posicao >= WIDTH){
        this.element.remove();
        cactos.shift();
      }

      console.log(cactos);
    }

  }

  class Ptero {
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "ptero";

    }
  }

  function run() {
    frame = frame + 1
    if (frame === FPS) frame = 0;
    deserto.mover()
    dino.correr()
    if (Math.random() * 800 <= PROB_NUVEM) nuvens.push(new Nuvem()) // decidi diminuir a geração de nuvens..
    if (frame % 2 === 0) nuvens.forEach(nuvem => nuvem.mover())
    if(Math.random() * 1000 <= PROB_CACTO) cactos.push(new Cacto())
    
    cactos.forEach(cacto => cacto.escolher());
    cactos.forEach(cacto => cacto.mover()) 

  }

  //init()

  
  deserto = new Deserto();
  dino = new Dino();
  dino.element.style.backgroundPositionX = "-1259px";
  dino.element.style.backgroundPositionY = "-2px";
  cacto = new Cacto();

})()