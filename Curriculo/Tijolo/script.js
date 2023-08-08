var canvas = document.getElementById("gameCanvas");
var desenho = canvas.getContext("2d");

var raqueteAltura = 10;
var raqueteLargura = 75;
var raqueteX = (canvas.width - raqueteLargura) / 2;
var velocidadeRaquete = 7;

var bolaRadius = 10;
var bolaX = canvas.width / 2;
var bolaY = canvas.height - 30;
var bolaDX = 4;
var bolaDY = -2;

var tijolosPorLinha = 3;
var tijolosPorColuna = 6;
var tijoloLargura = 75;
var tijoloAltura = 20;
var tijoloEspacamento = 10;
var espacamentoSuperiorQuadro = 30;
var espacamentoEsquerdoQuadro = 30;
var tijolos = [];

var totalPontuacao = tijolosPorLinha * tijolosPorColuna * 10;
var pontuacao = 0;

function facil(){
    raqueteLargura = 75;
    tijolosPorLinha = 2;
    tijolosPorColuna = 5;
    tijoloLargura = 90;
    tijoloAltura = 40;
    bolaRadius = 20;
    bolaDX = 2;
    bolaDY = -1;
    totalPontuacao = tijolosPorLinha * tijolosPorColuna * 10;
    pontuacao = 0;
    iniciarTijolos();
    
}
function medio(){
    raqueteLargura = 65;
    tijolosPorLinha = 4;
    tijolosPorColuna = 10;
    tijoloLargura = 40;
    tijoloAltura = 20;
    bolaRadius = 15;
    bolaDX = 3;
    bolaDY = -2;
    totalPontuacao = tijolosPorLinha * tijolosPorColuna * 10;
    pontuacao = 0;
    iniciarTijolos();
}

function dificil(){
    raqueteLargura = 45;
    tijolosPorLinha = 8;
    tijolosPorColuna = 20;
    tijoloLargura = 40;
    tijoloAltura = 20;
    bolaRadius = 10;
    bolaDX = 4;
    bolaDY = -3;
    totalPontuacao = tijolosPorLinha * tijolosPorColuna * 10;
    pontuacao = 0;
    iniciarTijolos();
}
function impossivel(){
    raqueteLargura = 25;
    tijolosPorLinha = 10;
    tijolosPorColuna = 30;
    tijoloLargura = 20;
    tijoloAltura = 10;
    bolaRadius = 5;
    bolaDX = 5;
    bolaDY = -5;
    totalPontuacao = tijolosPorLinha * tijolosPorColuna * 10;
    pontuacao = 0;
    velocidadeRaquete = 20;
    iniciarTijolos();
}

function iniciarTijolos(){
    for (var coluna = 0; coluna < tijolosPorColuna; coluna++) {
    tijolos[coluna] = []

    for (var linha = 0; linha < tijolosPorLinha; linha++) {

        tijolos[coluna][linha] = { x: 0, y: 0, ativo: 1 }
    }
}

}
iniciarTijolos();



var setaDireita = false;
var setaEsquerda = false;

document.addEventListener("keydown", descerDaTecla);
document.addEventListener("keyup", subirDaTecla);

function descerDaTecla(tecla) {
    if (tecla.key === "Right" || tecla.key === "ArrowRight") {
        setaDireita = true;

    } else if (tecla.key === "Left" || tecla.key === "ArrowLeft") {
        setaEsquerda = true;

    }

}
function subirDaTecla(tecla) {
    if (tecla.key === "Right" || tecla.key === "ArrowRight") {
        setaDireita = false;

    } else if (tecla.key === "Left" || tecla.key === "ArrowLeft") {
        setaEsquerda = false;

    }


}

function desenharRaquete() {
    desenho.beginPath();
    desenho.rect(raqueteX, canvas.height - raqueteAltura, raqueteLargura, raqueteAltura);
    desenho.fillStyle = "blue";
    desenho.fill();
    desenho.closePath();
}

function desenharBola() {
    desenho.beginPath();
    desenho.arc(bolaX, bolaY, bolaRadius, 0, Math.PI * 2);
    desenho.fillStyle = "red";
    desenho.fill();
    desenho.closePath();
}

function desenharTijolos() {
    for (var coluna = 0; coluna < tijolosPorColuna; coluna++) {
        for (var linha = 0; linha < tijolosPorLinha; linha++) {

            if (tijolos[coluna][linha].ativo == 1) {

                var tijoloX = (coluna * (tijoloLargura + tijoloEspacamento) + espacamentoEsquerdoQuadro);
                var tijoloY = (linha * (tijoloAltura + tijoloEspacamento) + espacamentoSuperiorQuadro);

                tijolos[coluna][linha].x = tijoloX;
                tijolos[coluna][linha].y = tijoloY;


                desenho.beginPath();
                desenho.rect(tijoloX, tijoloY, tijoloLargura, tijoloAltura);
                desenho.fillStyle = "green";
                desenho.fill();
                desenho.closePath();
            }

        }
    }
}

function detectarColisao() {
    for (var coluna = 0; coluna < tijolosPorColuna; coluna++) {
        for (var linha = 0; linha < tijolosPorLinha; linha++) {

            var tijolo = tijolos[coluna][linha];

            if (tijolo.ativo === 1) {

                if (bolaX + bolaRadius > tijolo.x
                    && bolaX - bolaRadius < tijolo.x + tijoloLargura
                    && bolaY + bolaRadius > tijolo.y
                    && bolaY - bolaRadius < tijolo.y + tijoloAltura) {
                        bolaDY = -bolaDY;
                        tijolo.ativo = 0;
                        tela = document.getElementById("ponto");
                        pontuacao = pontuacao +10;
                        tela.innerHTML = "Score: "+ pontuacao;
                        gerarEfeitoSonoro('moeda.mp3');

                        if(pontuacao === totalPontuacao){
                            vitoria();
                        }

                }
            }
        }
    }
}

function gameover(){
    var gameover = document.getElementById("gameover");
    gameover.style.display = 'block';
    gerarEfeitoSonoro('gameover.mp3');
    
}
function reiniciar(){
    document.location.reload();
}

function vitoria(){
    var mensagem = document.getElementById("vitoria");
    mensagem.style.display = "block";
    gerarEfeitoSonoro('win.mp3');
    bolaX = 0;
    bolaY = 0;
}


function gerarEfeitoSonoro(som){
    var contexto = new (window.AudioContext)();

    var requisicao = new XMLHttpRequest();
    requisicao.open('GET',som,true);
    requisicao.responseType = 'arraybuffer';
    
  requisicao.onload = function(){
    contexto.decodeAudioData(requisicao.response, function(buffer){
        
        var fonte = contexto.createBufferSource();
        fonte.buffer = buffer;

        fonte.connect(contexto.destination);
        fonte.start(0);
    });
  }
  requisicao.send();
}


function desenhar() {
    desenho.clearRect(0, 0, canvas.width, canvas.height);
    desenharRaquete();
    desenharBola();
    desenharTijolos();
    detectarColisao();

    if (bolaX + bolaDX > canvas.width - bolaRadius || bolaX + bolaDX < bolaRadius) {
        gerarEfeitoSonoro('parede.mp3');
        bolaDX = -bolaDX;
    }

    if (bolaY + bolaDY < bolaRadius) {
        bolaDY = -bolaDY;

    } else if (bolaY + bolaDY > canvas.height - bolaRadius - raqueteAltura) {

        if (bolaX > raqueteX && bolaX < raqueteX + raqueteLargura) {
            gerarEfeitoSonoro('raquete.mp3');
            bolaDY = -bolaDY;
        } else {
            gameover();
        }

    }

    if (setaDireita === true && raqueteX < canvas.width - raqueteLargura) {
        raqueteX = raqueteX + velocidadeRaquete;
    }
    else if (setaEsquerda === true && raqueteX > 0) {
        raqueteX = raqueteX - velocidadeRaquete;
    }

    bolaX = bolaX + bolaDX;
    bolaY = bolaY + bolaDY;

    requestAnimationFrame(desenhar)
}
desenhar(); 
