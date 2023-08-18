//SEM ORIENTAÇÃO A OBJETOS
var nome1 = 'Paula';
var nome2 = 'Juliana';
var nome3 = 'Alana';

var idade1 = 25;
var idade2 = 30;
var idade3 = 40;

function falar(nome, idade){
    alert('Sem Orientação a objetos : Olá sou '+ nome +' e tenho ' + idade + 'anos');
}
falar(nome1, idade1);
falar(nome2, idade2);
falar(nome3, idade3);


//Classe
class Pessoa{
    constructor(nome, idade){
       this.nome = nome;
       this.idade = idade;
    }
    falar(){
        alert("Pessoa criada: Olá meu nome é "+this.nome+" e tenho "+this.idade+" anos")
    }
}
//Instanciando Objeto
var pessoa1 = new Pessoa('Rodrigo', 71);
var pessoa2 = new Pessoa('Jão', 50);
var pessoa3 = new Pessoa('Muriel',60);
pessoa1.falar();
pessoa2.falar();
alert('Ola '+pessoa3.nome);