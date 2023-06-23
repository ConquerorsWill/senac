var frase ="Mãe é flor e com ela tudo floresce";

function gerarFrase(){
var texto = document.getElementById("frase");
texto.innerHTML = frase;
}

function lerFrase(){
    var som = window.speechSynthesis;
    var discurso = new SpeechSynthesisUtterance(frase);
    som.speak(discurso);
}