let vezes = 0;
let compara = [];
let i = 0;
let j = 0;
let contador = 0;
let numCartas;
let podeVirarProximaCarta = true;

function embaralhar() {
  return Math.random() - 0.5;
}

function quantidadeCartas() { 
    numCartas = Number(prompt("Com quantas cartas quer jogar?"));

    while (numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0 || !numCartas) {
        numCartas = Number(prompt("Com quantas cartas quer jogar?"));
    }
}

function colocarCartas() {
  quantidadeCartas();

  const img_face = [
    "/assets/fiestaparrot.gif",
    "/assets/fiestaparrot.gif",
    "/assets/bobrossparrot.gif",
    "/assets/bobrossparrot.gif",
    "/assets/revertitparrot.gif",
    "/assets/revertitparrot.gif",
    "/assets/explodyparrot.gif",
    "/assets/explodyparrot.gif",
    "assets/metalparrot.gif",
    "assets/metalparrot.gif",
    "/assets/tripletsparrot.gif",
    "/assets/tripletsparrot.gif",
    "/assets/unicornparrot.gif",
    "/assets/unicornparrot.gif"
  ];

  let imagens = img_face.slice(0, numCartas); 

  imagens.sort(embaralhar); 
  renderizarHTML(imagens)
}

function renderizarHTML (imagens) {
	const cartas = document.querySelector(".cartas");
  let index = 0;
  let list = "";
	while (index < numCartas) {
    list =
      list +
      `
      <div class="maior" onclick="mostrarCarta(this)">
      	<div class="face imagemfrente"></div>
      	<div class ="verso" >
         	<img src=" ${imagens[index]}"/>
				</div>     
      </div>            
      `;
    index++;
  }
 
  cartas.innerHTML = list;
}

colocarCartas();

function mostrarCarta(escolhida) {
  
  if (escolhida.querySelector(".face.referencia-verso")|| podeVirarProximaCarta === false) {
   return ;
  }

	const frente = escolhida.querySelector(".face");
  const verso = escolhida.querySelector(".verso");
  const imagem = escolhida.querySelector("img");

  verso.classList.add("face");
  frente.classList.add("referencia-frente");
  verso.classList.add("referencia-verso");

  vezes++; 

	comparador(imagem.src)

  if (contador === numCartas) {
    setTimeout(Finalizar, 500);
  }
}

function comparador(imagem) {
	compara.push(imagem);

  if (compara.length === 2) {
		podeVirarProximaCarta = false;
    if (compara[0] !== compara[1]) {
     
      setTimeout(DesvirarCarta, 1000);
      compara = [];
    } else {
      while (j < 2) {
        const verso = document.querySelector(".referencia-verso");
        const frente = document.querySelector(".referencia-frente");
        verso.classList.remove("referencia-verso");
        frente.classList.remove("referencia-frente");
        j++;
        contador++;
      }
      compara = [];
      j = 0;
      podeVirarProximaCarta = true;
    }
  }
}

function DesvirarCarta() {
  while (i < 2) {
    const verso = document.querySelector(".referencia-verso");
    const frente = document.querySelector(".referencia-frente");

    verso.classList.remove("face");
    verso.classList.remove("referencia-verso");
    frente.classList.add("frente");
    frente.classList.add("referencia-frente");

    i++;
  }
  compara = [];
  i = 0;
  podeVirarProximaCarta = true;
}

function Finalizar() {
  alert("Você venceu com " + vezes + " jogadas");
}