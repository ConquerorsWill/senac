function buscar(){
    var seletor = document.getElementById('moeda').value;
    var resultado = document.getElementById('resultado');


    fetch('https://api.coingecko.com/api/v3/simple/price?ids='+seletor+'&vs_currencies=brl')       //buscar url
    .then(response => response.json())                                                         //espera receber arquivo json
    .then(data => {                                                                            //espera dado do arquivo json

        var preco = data[seletor].brl;
        resultado.textContent = formatar(preco);
        mudarImagem(seletor);

    }).catch(error => resultado.textContent = error);                                                           //imprime erro

}

function mudarImagem(seletor){
    var moeda = document.getElementById('imagem');

    if(seletor == "bitcoin"){
        moeda.innerHTML = '<img width="200" src="https://media.giphy.com/media/tUt8GIY8g3oMo/giphy.gif">'
    }else if(seletor == "ethereum"){
        moeda.innerHTML = '<img width="200" src="https://i.pinimg.com/originals/6c/35/d7/6c35d795e2d9aca047a84455bac1a9b0.jpg">'

    }else if(seletor == "litecoin"){
        moeda.innerHTML = '<img width="200" src="https://estag.fimagenes.com/imagenesred/2443393_4.jpg?1">'

    }else if(seletor == "dogecoin"){
        moeda.innerHTML = '<img width="200" src="https://th.bing.com/th/id/R.ecf2fa532db201075aca077335bfec20?rik=2SBTUkh9aaY1ew&pid=ImgRaw&r=0">'
    }

    

}

function formatar(valor){
    //mascara para formatar valor
    valor = Number(valor).toFixed(2).replace('.',',');
    valor = "R$ "+valor;
    return valor;
}
