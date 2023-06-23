async function buscarClima() {
    var cidade = document.getElementById("cidade").value
    var chave = '561aa98454420a9e580ea3dbf808863d';
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cidade + '&appid=' + chave + '&units=metric';

    try {
        var resposta = await fetch(url);
        var dado = await resposta.json();

        var resultado = document.getElementById("resultado");
        resultado.innerHTML =
            '<h2> Previsão de Tempo Para ' + dado.name + '</h2>'
            + '<p> Temperatura: ' + dado.main.temp + ' ° C </p>'
            + '<p> Temperatura Máxima: ' + dado.main.temp_max + ' ° C </p>'
            + '<p> Temperatura Mínima: ' + dado.main.temp_min + ' ° C </p>'
            + '<p> Temperatura Ambiente: ' + dado.main.feels_like + 'C ° C </p>'
            + '<p> Umidade: ' + dado.main.humidity + '% </p>'
            + '<p> Velocidade do Vento: ' + dado.wind.speed + 'Km/h </p>'
            + '<p> Nuvens: ' + dado.clouds.all + '% </p>'
            + '<p> Condição: ' + dado.weather[0].description + '</p>'
            + '<img class="tempo" src="https://openweathermap.org/img/wn/'+dado.weather[0].icon+'@4x.png">'


    } catch (error) {
        var resultado = document.getElementById("resultado");
        resultado.innerHTML = "<p>Erro ao buscar o clima:" + error+"</p>";
    }
}