var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city-input');
var resultsContainerEl = document.querySelector('#results');
// variables to hide and unhide results
var alertBox = document.querySelector('#alert');
var hideDrink = document.querySelector('#drink');

// when search button is clicked - it finds input for that location
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getLatLon(city);
        cityInputEl.value = '';
    } else {
        //unhides message if not working
        alertBox.classList = 'unhide'
        hideDrink.classList = 'hide'
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
                    console.log(lat, lon);
                    // triggers on research to hide alert again and display drink if it was hidden
                    alertBox.classList = 'hide'
                    hideDrink.classList = 'unhide'
                });
            } else {
                // unhides alert and makes sure drink doesnt pop up
                alertBox.classList = 'unhide';
                hideDrink.classList = 'hide'
                
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

    //option 1 pt 1 
    // below code returns success and city name but posts undefined 
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

        //     //clear results
        resultsContainerEl.textContent = ''

        //     // new container for info
        var currentAirEl = document.createElement('article');
        currentAirEl.id = 'current';
        currentAirEl.classList = ''

        //     // information to add to this div
        var airQualityEl = document.createElement('p')

        //     // the info from the data here should show up but is showing up as undefined
        //     // data itself is showing up as [object Object]
        //     // means that it is not being parsed from JSON appropriately - but where is it going wrong? 
        airQualityEl.innerHTML = 'Right now the AQI in ' + city + ' is ' + apiresponse.data.current.pollution.aqius;

        //     //append there to currentAir section
        currentAirEl.appendChild(airQualityEl);

        resultsContainerEl.appendChild(currentAirEl);
        var airColorEl = document.querySelector('#results');
        if (parseInt(apiresponse.data.current.pollution.aqius) < 50) {
            airColorEl.classList = 'good';
        } else if (parseInt(apiresponse.data.current.pollution.aqius) > 150) {
            airColorEl.classList = 'unhealthy'
        } else {
            airColorEl.classList = 'moderate'
        }
    }
}


searchFormEl.addEventListener('submit', formSubmitHandler);