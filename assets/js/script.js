var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city-input');
var resultsContainerEl = document.querySelector('#results');
// variables to hide and unhide results
var alertBox = document.querySelector('#alert');
var cities = []


// when search button is clicked - it finds input for that location
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getLatLon(city);
        cities.unshift({ city });
        cityInputEl.value = '';
    } else {
        //unhides message if not working - new 1/9 
        alertBox.classList = 'unhide'

    }
    saveSearch();
};
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
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
                    // triggers on research to hide alert again and display drink if it was hidden new1 1-9
                    alertBox.classList = 'hide'
                        
                });
            } else {
                // unhides alert 
                alertBox.classList = 'unhide';
                

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
        // code to return the air quality 
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(apiresponse) {
                    displayAir(apiresponse, city)
                });
            } else {
                alert("Error: Could not Connect. Please check spelling and try again")
            }
        });

    var displayAir = function(apiresponse, city) {

        console.log((apiresponse));
        //clear results
        resultsContainerEl.textContent = ''

        // new container for info
        var currentAirEl = document.createElement('article');
        currentAirEl.id = 'current';
        currentAirEl.classList = ''

        // information to add to this div
        var airQualityEl = document.createElement('p')

        //append there to currentAir section
        currentAirEl.appendChild(airQualityEl);

        var divTime = document.createElement('div');
        divTime.className = 'time';
        divTime.innerHTML = '';

        currentAirEl.appendChild(divTime);

        var cityName = document.createElement('h2');
        cityName.className = 'curCity';
        cityName.innerHTML = city;

        divTime.appendChild(cityName);

        var date = document.createElement('p');
        var todayDate = moment().format('dddd MMMM Do YYYY');
        date.className = 'currentDate';
        date.innerHTML = todayDate;

        divTime.appendChild(date);

        var todayTime = document.createElement('p');
        var curTime = moment().format('LTS');
        todayTime.className = 'currentTime';
        todayTime.innerHTML = curTime;

        divTime.appendChild(todayTime);

        var uvIndex = document.createElement('div');
        uvIndex.className = 'uvIndex';
        uvIndex.innerHTML = '';

        currentAirEl.appendChild(uvIndex);

        var indexDesc = document.createElement('p');
        indexDesc.className = 'desc';
        

        uvIndex.appendChild(indexDesc);

        var aqiData = document.createElement('div');
        aqiData.className = 'aqi';
        aqiData.innerHTML = '';

        currentAirEl.appendChild(aqiData);

        var dataNumber = document.createElement('h2');
        dataNumber.className = 'aqiData';
        dataNumber.innerHTML = apiresponse.data.current.pollution.aqius;

        aqiData.appendChild(dataNumber);

        var usAqi = document.createElement('span');
        usAqi.className = 'aqi-us';
        usAqi.innerHTML = 'AQI';

        aqiData.appendChild(usAqi);

        // function to change color of result depending on level of airquality
        resultsContainerEl.appendChild(currentAirEl);
        var airColorEl = document.querySelector('.aqi');


        if (parseInt(apiresponse.data.current.pollution.aqius) < 50) {
            airColorEl.classList.add('good');
            indexDesc.innerHTML = "This AQI is <b>GOOD</b>! <br>Let's go out and party!";

        } else
        if (parseInt(apiresponse.data.current.pollution.aqius) > 150) {
            airColorEl.classList.add('unhealthy');
            indexDesc.innerHTML = "This AQI is <b>UNHEALTHY</b>! <br>Stay home and relax with your homemade drink!";

        } else {
            airColorEl.classList.add('moderate');
            indexDesc.innerHTML = "This AQI is <b>MODERATE</b>! <br>Consider before going out!";

        }
    }
}

// when Search click  -> dashboard height.style.change
function fun() {

    var dashBoard = document.querySelector("#dashBoard");
    if (dashBoard.style.height = "100vh") {
        h = dashBoard.style.height;
        dashBoard.style.height = "auto";
    } else {
        dashBoard.style.height = h;
    }
}

searchFormEl.addEventListener('submit', formSubmitHandler);