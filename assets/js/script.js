var searchFormEl = document.querySelector('#search-form')
var resultsContainerEl = document.querySelector('#results')

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getLatLon(city);
        cityINputEl.value = ''
    }
    else {
        alert('Please enter the name of a city');
    }
};

var getLatLon = function(city) {
    //api key for iqAir 
    var apiKey = "6e1e1837-696e-464e-8f5b-ffa2bc286293"
    var apiUrl = ""
}