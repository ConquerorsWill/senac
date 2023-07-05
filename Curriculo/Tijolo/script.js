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

for (var coluna = 0; coluna < tijolosPorColuna; coluna++) {
    tijolos[coluna] = []

    for (var linha = 0; linha < tijolosPorLinha; linha++) {

        tijolos[coluna][linha] = { x: 0, y: 0, ativo: 1 }
    }
}

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

                        if(pontuacao === totalPontuacao){
                            window.location.reload();
                        }

                }
            }
        }
    }
}

function gameover(){
    var gameover = document.getElementById("gameover");
    gameover.style.display = 'block';
    
}
function reiniciar(){
    document.location.reload();
}


function desenhar() {
    desenho.clearRect(0, 0, canvas.width, canvas.height);
    desenharRaquete();
    desenharBola();
    desenharTijolos();
    detectarColisao();

    if (bolaX + bolaDX > canvas.width - bolaRadius || bolaX + bolaDX < bolaRadius) {
        bolaDX = -bolaDX;
    }

    if (bolaY + bolaDY < bolaRadius) {
        bolaDY = -bolaDY;

    } else if (bolaY + bolaDY > canvas.height - bolaRadius - raqueteAltura) {

        if (bolaX > raqueteX && bolaX < raqueteX + raqueteLargura) {
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
