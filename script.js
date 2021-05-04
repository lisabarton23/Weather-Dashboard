//variables (global)
var fetchButton = document.getElementById('fetchBtn'); //search button
var weatherShow = document.getElementById ('weatherBox');
// api.openweathermap.org/data/2.5/weather?q=[]&appid={4409982805e70fa40a6a29f20f0a6a35}
var cityName = document.querySelector('cityName'); //use to save to local storage
var responseText = document.getElementById('response-text');

//need to update url for cityName.. working on getApi()
var requestURL ="http://api.openweathermap.org/data/2.5/weather?q=denver&appid=4409982805e70fa40a6a29f20f0a6a35";
//?how can i make the city name a variable within the url?
//functions 
//TODO: create a fetch request to get weather info
//TODO: needs to include city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//TODO: WHEN I view the UV index THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//TODO: response needs to be displayed for current day and 5 day
//TODO: name of city needs to be saved in local storage and appear in list under search button, this needs to be a link to recall fetch

function getAPi (cityName){
   var requestURL ="http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=4409982805e70fa40a6a29f20f0a6a35";

   console.log(requestURL)

 fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function(weatherobj){

       //cityname
       //console.log(cityName)
       //date use moment js
       //icon
      var iconcode = weatherobj.weather[0].icon;
       var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
       console.log(iconurl)
       //hum
       console.log (weatherobj.main.humidity);
       //wind
       console.log (weatherobj.wind.speed);
       //uv => lon and lat =>url
       var lon=(weatherobj.coord.lon);
       var lat =(weatherobj.coord.lat);
       var uvUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=4409982805e70fa40a6a29f20f0a6a35"
      console.log (uvUrl)
        fetch(uvUrl)
       .then(function (response) {
         return response.json();
       })
      .then(function(uvobj){
         console.log(uvobj)
         console.log(uvobj.current.uvi)
      })
    }) 
}

function fiveDay(cityName){
   var fiveUrl="http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=4409982805e70fa40a6a29f20f0a6a35"
   console.log(fiveUrl)
   fetch(fiveUrl)
   .then(function (response) {
     return response.json();
   })
   .then(function(fiveObj){
      console.log(fiveObj)

      //run a for 5 times => i*8 24 hrs
      for (var i = 0; i <5; i++) {
         //date momentjs moment(currentDate).formate("ll")
         console.log(fiveObj.list[i*8].dt_txt)
         //icon
         console.log (fiveObj.list[i*8].weather[0].icon)
         
         console.log (fiveObj.list[i*8].main.temp)
         //wind
         console.log (fiveObj.list[i*8].wind.speed)
         //hum
         console.log (fiveObj.list[i*8].main.humidity)

         function showResults (resultObj) {
            var resultIcon = document.createElement ('div');
            resultIcon.classList.add ('card',);
            var resultBody = document.createElement ('div');
            resultBody.textContent =(fiveObj.list[i*8].main.temp) +
            //wind
             (fiveObj.list[i*8].wind.speed)+
            //hum
             (fiveObj.list[i*8].main.humidity);
             weatherShow.append (resultBody);
            
            
            
            // resultBody.classList.add('card-body');
            // resultBody.append.child (resultBody);
            // var bodyContentEl = document.createElement ('p');
            // bodyContentEl.innerHTML = (fiveObj.list[i*8].main.temp) +
            // //wind
            //  (fiveObj.list[i*8].wind.speed)+
            // //hum
            //  (fiveObj.list[i*8].main.humidity);
            
            // resultBody.append (bodyContentEl);
            }
            showResults ();



      }
      
   })


} 

//fiveDay ("denver")
//getAPi ("denver");
//  .then(data => console.log(data));}
 

//   .then (function (data) {console.log (data)})
//    for (var i = 0; i < data.length; i++) {
//       //Creating elements, cardrow, carddata, 
//    var createcard = document.createElement('ul');        
//        createcard.textContent = data[i].main;
//     // cardData.appendChild(link);
//        createcardRow.appendChild(cardData);
    //    cardBody.appendChild(createcardRow);}
    

// }))

// event listners:
//data needs to be cleared after saved to local storage so new city can be entered 
 document.querySelector(".fetchBtn").onclick = function(event){
   event.preventDefault();
    var cityName= document.querySelector("#cityName").value;
    getAPi(cityName);
    fiveDay(cityName)
 };


   
//city name needs to be added to local storage and ul with link?
//https://openweathermap.org/img/w/$%7Bdata.weather[0].icon%7D.png




//create storage so city names appear in list under search btn (make links if possible)
// localStorage.setItem (cityName);
// document.getElementById ("cityName").innerHTML = localStorage.getItem ("cityName");}
   


//    fetch multiple days forcast weather
  
//fetch (requestURL)
//.then (response => response.json()
// "dt":1406080800,
// "temp":{
//       "day":297.77,  //daily averaged temperature
//       "min":293.52, //daily min temperature
//       "max":297.77, //daily max temperature
//       "night":293.52, //night temperature
//       "eve":297.77, //evening temperature
//       "morn":297.77}, //morning temperature
//}

// getAPi ()}