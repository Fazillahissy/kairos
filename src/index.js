function updateWeather(response) {
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");

    let date = new Date(response.data.time * 1000); 
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
    cityElement.innerHTML = response.data.city; 
    timeElement.innerHTML = formatDate(date);
    humidityElement.innerHTML = `${response.data.humidity}%`;
    descriptionElement.innerHTML = response.data.condition.description; 
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`; 
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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
let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Johannesburg");
