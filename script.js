const btn = document.querySelector('.btn');
var x = 0;
var array=[];

// function handlePreviousSearches(){
//     const buttonElements = document.querySelectorAll(".historyBtns > button");
//     // buttonElements.addEventListener('click', function getWeatherByCity(){
//     // });
//     console.log(buttonElements.value);
// }


function getWeatherByCity(city){
    
    console.log(city); 
    array.unshift(city);
    console.log(array);
    
    document.getElementById("searchHistory1").innerHTML = array[0];
    if(array.length>0){
        document.getElementById("searchHistory1").style.visibility = "visible";}
        document.getElementById("searchHistory2").innerHTML = array[1];
        if(array.length>1){
            document.getElementById("searchHistory2").style.visibility = "visible";}    
            document.getElementById("searchHistory3").innerHTML = array[2];
            if(array.length>2){
                document.getElementById("searchHistory3").style.visibility = "visible";}    
                document.getElementById("searchHistory4").innerHTML = array[3];
                if(array.length>3){
                    document.getElementById("searchHistory4").style.visibility = "visible";}
                    
                    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},840&appId=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`).then(function (response){
                        return response.json();
                    }).then(function (data){
                        const textnode = document.createTextNode(" city not found, try again ");
                        console.log("weather in " + city + " is: ", data);
                        console.log(data.cod);
                        if(data.cod > 200){
                            alert("city not found, try again");
                        }
                        
                        let lat = data.coord.lat;
                        let lon = data.coord.lon;
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        document.getElementById("h1El").style.visibility = "visible";
                        h1El.innerHTML = data.name + " weather for " + date + '<br />' + "Temperature is: " + data.main.temp + "°" + '<br />' + "Wind speed: " + data.wind.speed + " mph " + '<br />' + "Humidity: " + data.main.humidity + "%" + '<br />';
                        
                        document.getElementById("forecast").style.visibility = "visible";
                        
                        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`).then(function (response){
                            return response.json(); 
                        }).then(function (data1){
                            console.log(data1);
                            
                            // UV INDEX SET //
                            let uvi = data1.current.uvi;
                            console.log(uvi);
                            document.getElementById("h2El").style.visibility = "visible";
                            h2El.innerHTML = "UV index: " + uvi;
                            document.body.appendChild(h2El).setAttribute('class','currentWeather');
                            if(uvi>7){document.body.appendChild(h2El).setAttribute('class', 'uviRed')};
                            if(uvi>5&&uvi<8){document.body.appendChild(h2El).setAttribute('class', 'uviOrng')};
                            if(uvi>2&&uvi<6){document.body.appendChild(h2El).setAttribute('class', 'uviYllw')};
                            if(uvi>=0&&uvi<3){document.body.appendChild(h2El).setAttribute('class', 'uviGrn')};
                            console.log(data1);
                            
                            document.getElementById("cards").style.visibility = "visible";
                            
                            // CARDS INFO //
                // temps //
                let day1temp = parseFloat(data1.daily["0"].temp.day).toFixed();
                let day2temp = parseFloat(data1.daily["1"].temp.day).toFixed();
                let day3temp = parseFloat(data1.daily["2"].temp.day).toFixed();            
                let day4temp = parseFloat(data1.daily["3"].temp.day).toFixed();            
                let day5temp = parseFloat(data1.daily["4"].temp.day).toFixed();
                
                // date //
                const milliseconds1 = data1.daily["1"].dt * 1000;
                const dateObject1 = new Date(milliseconds1);
                const humanDateFormat1 = dateObject1.toLocaleString("en-US", {weekday: "long"});
                const milliseconds2 = data1.daily["2"].dt * 1000;
                const dateObject2 = new Date(milliseconds2);
                const humanDateFormat2 = dateObject2.toLocaleString("en-US", {weekday: "long"});            
                const milliseconds3 = data1.daily["3"].dt * 1000;
                const dateObject3 = new Date(milliseconds3);
                const humanDateFormat3 = dateObject3.toLocaleString("en-US", {weekday: "long"});            
                const milliseconds4 = data1.daily["4"].dt * 1000;
                const dateObject4 = new Date(milliseconds4);
                const humanDateFormat4 = dateObject4.toLocaleString("en-US", {weekday: "long"});            
                const milliseconds5 = data1.daily["5"].dt * 1000;
                const dateObject5 = new Date(milliseconds5);
                const humanDateFormat5 = dateObject5.toLocaleString("en-US", {weekday: "long"});
                
                // output to cards //
                document.getElementById("day1").innerHTML = '<img id="weather-icon" src="https://openweathermap.org/img/w/' + data1.daily["1"].weather["0"].icon + '.png" alt="Weather icon">' + '<br />' + humanDateFormat1 + '<br />' + day1temp + "°" + '<br />' + data1.daily["1"].weather["0"].description + '<br />' + data1.daily["1"].humidity + "% humidity" + '<br />' + "wind speed: " + data1.daily["1"].wind_speed + " mph ";
                
                document.getElementById("day2").innerHTML = '<img id="weather-icon" src="https://openweathermap.org/img/w/' + data1.daily["2"].weather["0"].icon + '.png" alt="Weather icon">' + '<br />' + humanDateFormat2 + '<br />' + day2temp + "°" + '<br />' + data1.daily["2"].weather["0"].description + '<br />' + data1.daily["2"].humidity + "% humidity" + '<br />' + "wind speed: " + data1.daily["2"].wind_speed + " mph ";
                
            document.getElementById("day3").innerHTML = '<img id="weather-icon" src="https://openweathermap.org/img/w/' + data1.daily["3"].weather["0"].icon + '.png" alt="Weather icon">' + '<br />' + humanDateFormat3 + '<br />' + day3temp + "°" + '<br />' + data1.daily["3"].weather["0"].description + '<br />' + data1.daily["3"].humidity + "% humidity" + '<br />' + "wind speed: " + data1.daily["3"].wind_speed + " mph ";
            
            document.getElementById("day4").innerHTML = '<img id="weather-icon" src="https://openweathermap.org/img/w/' + data1.daily["4"].weather["0"].icon + '.png" alt="Weather icon">' + '<br />' + humanDateFormat4 + '<br />' + day4temp + "°" + '<br />' + data1.daily["4"].weather["0"].description + '<br />' + data1.daily["4"].humidity + "% humidity" + '<br />' + "wind speed: " + data1.daily["4"].wind_speed + " mph ";
            
            document.getElementById("day5").innerHTML = '<img id="weather-icon" src="https://openweathermap.org/img/w/' + data1.daily["5"].weather["0"].icon + '.png" alt="Weather icon">' + '<br />' + humanDateFormat5 + '<br />' + day5temp + "°" + '<br />' + data1.daily["5"].weather["0"].description + '<br />' + data1.daily["5"].humidity + "% humidity" + '<br />' + "wind speed: " + data1.daily["5"].wind_speed + " mph ";
            
            // END OF CARDS INFO //
            
        })
        
    })
    console.log('Button Clicked');
};

function handlePreviousSearches(){
    let cityName = document.getElementById('search-btn').value;
    getWeatherByCity(cityName);
};

function handlePreviousBtnSrch(){
    let srchBtn = historyOne.value;
    console.log("hello");
    console.log(srchBtn);
    getWeatherByCity(srchBtn);
};

btn.addEventListener('click', handlePreviousSearches);

let historyOne = document.getElementById("searchHistory1")
historyOne.addEventListener('click', handlePreviousBtnSrch);
document.getElementById("searchHistory2").addEventListener('click', handlePreviousBtnSrch);
document.getElementById("searchHistory3").addEventListener('click', handlePreviousBtnSrch);
document.getElementById("searchHistory4").addEventListener('click', handlePreviousBtnSrch);

