function updateWeather(response){
    
    let temperatureElement= document.querySelector("#temperature");
    let temperature=response.data.temperature.current;
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");

cityElement.innerHTML=response.data.city;

descriptionElement.innerHTML=response.data.condition.description;
    
temperatureElement.innerHTML=Math.round(temperature);
}

function searchCity(city){
let apiKey= "9t4ae6a86b37850da034f318653bfo06";
let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
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