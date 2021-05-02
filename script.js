var tableBody = document.getElementById('resultCard');
var fetchButton = document.getElementById('fetchBtn');

// api.openweathermap.org/data/2.5/weather?q=[]&appid={4409982805e70fa40a6a29f20f0a6a35}

var responseText = document.getElementById('response-text');

function getAPi (){
var requestURL ="http://api.openweathermap.org/data/2.5/weather?q= +'cityName'+&appid=4409982805e70fa40a6a29f20f0a6a35";

fetch (requestURL)
.then (function (response) { return response.responseText(
    "main",{
        "temp":306.15, //current temperature
        "pressure":1013,
        "humidity":44,
        "temp_min":306, //min current temperature in the city
        "temp_max":306 //max current temperature in the city
},
console.log (response)
) //or .JSON?
})
// .then (function (data) {console.log (data)
//     for (var i = 0; i < data.length; i++) {
//         // Creating elements, tablerow, tabledata, and anchor
//         var createTableRow = document.createElement('tr');
//         var tableData = document.createElement('td');
//         var link = document.createElement('a');
//         link.textContent = data[i].html_url;
//       link.href = data[i].html_url;

//       // Appending the link to the tabledata and then appending the tabledata to the tablerow
//       // The tablerow then gets appended to the tablebody
//       tableData.appendChild(link);
//       createTableRow.appendChild(tableData);
//       tableBody.appendChild(createTableRow);}


// }))
//data needs to be cleared after saved to local storage so new city can be entered 

//city name needs to be added to local storage and ul with link?
// localStorage.setItem (cityName);
// document.getElementById ("cityName").innerHTML = localStorage.getItem ("cityName");

//  fetchButton.addEventListener('click', getApi);
