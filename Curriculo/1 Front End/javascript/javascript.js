//alert('Olá Muundo');

var numero = 25;

if(numero > 10){
    alert('numero maior que 10');
}else{
    alert('numero menor que 10');
}

var contador = 0;

while(contador < 5){
    alert('Numero:'+ contador);
    contador = contador + 1;
}

var nomes = ['Fulano','Ciclano','Deltrano'];
alert(nomes[0]);

for(contador=0; contador < nomes.length; contador++){
    alert(nomes[contador]);

    if(nomes[contador] === 'Ciclano'){
        alert('Pessoa Encontrada!');
    }
}

function baixarEstoque(){
    alert("Baixou Estoque!");
}

function movimentarCaixa(){
    alert('Caixa movimentado');
}

function fazerVenda(){
    baixarEstoque();
    movimentarCaixa();

    let titulo = document.getElementById('titulo');
    titulo.innerHTML = "novo texto";
}

var pessoa = {idade:10, nome:'Ricardo'};
alert(pessoa.nome);

