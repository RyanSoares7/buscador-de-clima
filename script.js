let form = document.querySelector('.busca')

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        showLoading();
       
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ee4e1d89219ae85cf9497cf72963e747&units=metric&lang=pt_br`;

        let result = await fetch(url);
        let json = await result.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo()
            ocultLoading();
            showWarning('Não encontramos esta localização.')
        }
    } else {
        clearInfo();
    }
    form.reset()
});

function showInfo (json) {
    showWarning('');
    ocultLoading();

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
    ocultLoading();
    document.querySelector('.resultado').style.display = 'none';
}

function showLoading() {
    showWarning('');
    document.querySelector('.loading').style.display = 'block';
}

function ocultLoading() {
    document.querySelector('.loading').style.display = 'none';
}