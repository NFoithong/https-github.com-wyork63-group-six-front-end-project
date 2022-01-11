// Create new div element and add current date/time
var colDashboard = document.querySelector('.col1');
var today = moment().format('llll');
var div = document.createElement('div');
div.className = 'currenTime';
// console.log(today);
div.innerHTML = today;
colDashboard.appendChild(div);