// var searchFormEl = document.querySelector('#search-form')
// var resultsContainerEl = document.querySelector('#results')

// var formSubmitHandler = function(event) {
//     event.preventDefault();
//     var city = cityInputEl.value.trim();
//     if (city) {
//         getLatLon(city);
//         cityINputEl.value = ''
//     }
//     else {
//         alert('Please enter the name of a city');
//     }
// };

// var getLatLon = function(city) {
//     //api key for iqAir 
//     var apiKey = "54cd8f0a-9f51-43d4-ad67-cb829c5298e2"
//     var apiUrl = ""
// }


// will need to have two submit boxes one for the city and one for the state
// the submit boxes will store a variable that will then be pushed into the apikey
// once the information is pushed through it will display the airquality on the screen 


//API KEY NOTES
// apikey 54cd8f0a-9f51-43d4-ad67-cb829c5298e2
// docs https://api-docs.iqair.com/?version=latest
// api url for specified city data 'http://api.airvisual.com/v2/city?city=' + city + '&state=' state + &country=USA&key= apikey 
// temperature = current.weather.tp - displayed in celsisus. Can use (0°C × 9/5) + 32 = 32°F to change to fahrenheit
// air quality = current.pollution.aqius =  airquality 
// air quality rankings 0-50 = good/ green, 51-100 = moderate/ yellow, 101-150 = less unhealthy/ orange, 151-200 = unhealthy/ red, 201-300 = very unhealthy/ purple, 301 = hazardous/maroon


var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city-input');
var resultsContainerEl = document.querySelector('#results');


// when search button is clicked - it finds input for that location
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getLatLon(city);
        cityInputEl.value = '';
    } else {
        alert('Please enter the name of a city');
    }
};


//use open weather api to find the lat and lon of a given city so that it can be plugged into airvisual api to find air quality
var getLatLon = function(city) {
    // apikey from weather site
    var apiKey = "ff8f64c1c4ae73a70e4b2c346addc528";
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    // most recent search is store in local storage
                    localStorage.setItem('last-search', data.name)
                    var city = data.name;
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    getAir(lat, lon, city);
                });
            } else {
                alert('Error: No city Found');
            }
        })
        .catch(function(error) {
            alert('Unable to Connect')
        });
};

// lat and lon are taken and plugged into air api 

var getAir = function(lat, lon, city) {
    var apiKey2 = '54cd8f0a-9f51-43d4-ad67-cb829c5298e2';
    var apiUrl2 = 'https://api.airvisual.com/v2/nearest_city?lat=' + lat + '&lon=' + lon + '&key=' + apiKey2;
    fetch(apiUrl2)
        .then(function(response) {
            response.json().then(function(data) {
                // var current = data;
                displayAir(data, city)
            });
        });
};

var displayAir = function(data, city) {
    console.log(data);

    //clear results
    resultsContainerEl.textContent = ''

    // new container for info
    var currentAirEl = document.createElement('article');
    currentAirEl.id = 'current';
    currentAirEl.classList = ''

    // information to add to this div
    var airQualityEl = document.createElement('p')

    // the info from the data here should show up but is showing up as undefined
    // data itself is showing up as [object Object]
    // means that it is not being parsed from JSON appropriately - but where is it going wrong? 
    airQualityEl.innerHTML = 'Quality of Air in ' + city + data + 'AQI';

    //append there to currentAir section
    currentAirEl.appendChild(airQualityEl);

    resultsContainerEl.appendChild(currentAirEl);
}




searchFormEl.addEventListener('submit', formSubmitHandler);