//variables (global)
var fetchButton = document.getElementById('fetchBtn'); //search button
var weatherShow = document.getElementById ('weatherBox');
var weatherfive = document.getElementById ('fivedayBox');
// api.openweathermap.org/data/2.5/weather?q=[]&appid={4409982805e70fa40a6a29f20f0a6a35}
var cityName = document.querySelector('cityName'); //use to save to local storage
var responseText = document.getElementById('response-text');
//default to nothing until there is something in ls
var arrayCity=[]
if( localStorage.getItem ("cityName")){
   arrayCity=localStorage.getItem ("cityName");
}

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
       var uvUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=4409982805e70fa40a6a29f20f0a6a35&units=imperial"
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
   var fiveUrl="http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=4409982805e70fa40a6a29f20f0a6a35"
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
         // console.log(fiveObj.list[i*8].dt_txt)
         var date5 = (fiveObj.list[i*8].dt_txt)
         //icon
         // console.log (fiveObj.list[i*8].weather[0].icon)
         var icon5 = (fiveObj.list[i*8].weather[0].icon)
         //<img src = icon5>
         var image =document.createElement ('img');
         //<img>
         image.setAttribute("src","http://openweathermap.org/img/w/" + icon5 + ".png");
         console.log(image)
         //<img src="icon5">
         // console.log (fiveObj.list[i*8].main.temp)
         var temperature5 = (fiveObj.list[i*8].main.temp)
         //wind
         // console.log (fiveObj.list[i*8].wind.speed)
         var wind5 = (fiveObj.list[i*8].wind.speed)
         //hum
         // console.log (fiveObj.list[i*8].main.humidity)
         var humidity5 = (fiveObj.list[i*8].main.humidity)
         
        // function showResults (resultObj) {
            var resultIcon = document.createElement ('div');
            resultIcon.classList.add ('card',);
         
            var resultBody = document.createElement ('div');
            resultBody.appendChild(image);

            var ptemp=document.createElement("p");
            ptemp.textContent="Temp: " + temperature5; 

            //resultBody.textContent = "Temp: " + temperature5,   + "Winds:  " + wind5, + "Humidity:  " + humidity5;
            resultBody.appendChild(ptemp);






             weatherfive.appendChild(resultBody);
        

             console.log("fivedaydone");
            
             
            
            
           // }
           // showResults ();



      }
      
   })


} 
//local storage
 function savecityname (cityName) {
//cityName : cityName.value,
//push the city into the array 
arrayCity.push (cityName);
//then set the array to ls
localStorage.setItem ("cityName", JSON.stringify (arrayCity));
 };
 

function callcityname (){
arrayCity= JSON.parse(localStorage.getItem ("cityName"));
for(var i=0; i<arrayCity.length;i++){
   console.log(arrayCity[i])
   //make them into real btns
   var btn=document.createElement("button");
   btn.textContent= arrayCity[i]
   document.querySelector(".searchHistory").appendChild(btn)
}

}
fiveDay ("denver")
getAPi ("denver");
callcityname();
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
    savecityname (cityName);
    //set item to local storage
    //get all the items
callcityname ();
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