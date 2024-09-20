function updateWeather(response) {
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");
    let date = new Date(response.data.time * 1000); 
    let dateElement = document.querySelector("#date");

    
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
    cityElement.innerHTML = response.data.city; 
    dateElement.innerHTML = formatDate(date);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    descriptionElement.innerHTML = response.data.condition.description; 
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`; 
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

    getForecast(response.data.city);
}
    function formatDate(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes(); 
        let days = [ 
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
    
        let day = days[date.getDay()]; 
    if (minutes<10){
        minutes=`0${minutes}`;
    }
        return `${day} ${hours}:${minutes}`;
  
}

 
function searchCity(city){
let apiKey= "9t4ae6a86b37850da034f318653bfo06";
let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiUrl).then(updateWeather);
}
function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput=document.querySelector('#search-form-input');
searchCity(searchInput.value);
}
function getForecast(city){
let apiKey="9t4ae6a86b37850da034f318653bfo06";
let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
axios(apiUrl).then(displayForecast);
}


function displayForecast(response) {
    
    let days= ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
    let forecastHtml="";

    days.forEach(function(day){
        forecastHtml +=`
            <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌤</div>
            <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                    <strong>15°</strong>
                </div>
                <div class="weather-forecast-temperature">9°</div>
            </div>
            </div>
        `;
    });

    let forecastElement= document.querySelector("#forecast");
forecastElement.innerHTML= forecastHtml;
}



let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
getForecast();
displayForecast();

