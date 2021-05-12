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
var today = moment ();
$("#today").text (today.format("MMM Do, YYYY"));
//need to update url for cityName.. working on getApi()
var requestURL ="https://api.openweathermap.org/data/2.5/weather?q=denver&appid=4409982805e70fa40a6a29f20f0a6a35";
//?how can i make the city name a variable within the url?
//functions 
//TODO: create a fetch request to get weather info
//TODO: needs to include city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//TODO: WHEN I view the UV index THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//TODO: response needs to be displayed for current day and 5 day
//TODO: name of city needs to be saved in local storage and appear in list under search button, this needs to be a link to recall fetch

function getAPi (cityName){
   var requestURL ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=4409982805e70fa40a6a29f20f0a6a35";
//change back to "+ cityName +"
   console.log(requestURL)
   $("#oneDay").empty();

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
       var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
       console.log(iconurl) 
       var currentbody = document.createElement ('div');
       var p1 = document.createElement ('p');
       var img =document.createElement('img');
       img.setAttribute("src", iconurl);
       
      //  <div> 
      //    <p>
      //        <img src=iconurl>
      //    </p>
      //    <p>hum</p>
      //    <p>wind</p>
 
      //  </div>

       //hum
       console.log (weatherobj.main.humidity);
       var p2 =document.createElement ('p');
       p2.textContent =weatherobj.main.humidity;
       //wind
       console.log (weatherobj.wind.speed);
       var p3 = document.createElement ('p');
       p3.textContent =weatherobj.wind.speed;

       p1.appendChild(img);

       currentbody.appendChild(p1);
       currentbody.appendChild(p2);
       currentbody.appendChild(p3);
document.querySelector("#oneDay").appendChild(currentbody)
;
       //uv => lon and lat =>url
       var lon=(weatherobj.coord.lon);
       var lat =(weatherobj.coord.lat);
       var uvUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&appid=4409982805e70fa40a6a29f20f0a6a35";
      console.log (uvUrl)
        fetch(uvUrl)
       .then(function (response) {
         return response.json();
       })
      .then(function(uvobj){
         console.log(uvobj)
         console.log(uvobj.current.uvi)
         var p4 = document.createElement ('p');
         p4.textContent = uvobj.current.uvi;
         currentbody.appendChild(p4);
      })



      
    }) 
}

function fiveDay(cityName){
   var fiveUrl="https://api.openweathermap.org/data/2.5/forecast/?q=denver&units=imperial&appid=4409982805e70fa40a6a29f20f0a6a35";
   //change back to "+ cityName +"
   console.log(fiveUrl)
   fetch(fiveUrl)
   .then(function (response) {
     return response.json();
   })
   .then(function(fiveObj){
      console.log(fiveObj)
      $("#fivedayBox").empty();

      //run a for 5 times => i*8 24 hrs
      for (var i = 0; i <5; i++) {
         //date momentjs moment(currentDate).formate("ll")
        var days = moment ().format ('dddd');
        //need to move days forward by i++ in a function?
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
         var showday =document.createElement ("p");
         showday.textContent = days;
            var ptemp=document.createElement("p");
            ptemp.textContent="Temp: " + temperature5 ; 
            var windshow=document.createElement ("p");
            windshow.textContent ="Winds:" + wind5 + "mph";
            var humidshow=document.createElement ("p");
            humidshow.textContent ="Humidity:" + humidity5;
            resultBody.appendChild (showday);
            //resultBody.textContent = "Temp: " + temperature5,   + "Winds:  " + wind5, + "Humidity:  " + humidity5;
            resultBody.appendChild(ptemp);
            resultBody.appendChild(windshow);
            resultBody.appendChild(humidshow);






             document.querySelector("#fivedayBox").appendChild(resultBody);
        

             console.log("fivedaydone");
            
             
            
            
           // }
           // showResults ();



      }
      
   })


} 
//local storage

//  function savecityname (cityName) {
// //cityName : cityName.value,
// //push the city into the array 
// arrayCity.push (cityName);
// //then set the array to ls
// localStorage.setItem ("cityName", JSON.stringify (arrayCity));
//  };
 

// function callcityname (){
// arrayCity= JSON.parse(localStorage.getItem ("cityName"));
// for(var i=0; i<arrayCity.length;i++){
//    console.log(arrayCity[i])
//    //make them into real btns
//    var list =document.createElement("li");
//    list.textContent= arrayCity[i];
//    document.querySelector(".searchHistory").appendChild(list);
//    callcityname()


fiveDay ("denver")
getAPi ("denver");

// }))
// if (JSON.parse (localStorage.getItem ("arrayCity"))) { arrayCity = JSON.parse (localStorage.getItem ("arrayCity"));
// }
// event listners:
//data needs to be cleared after saved to local storage so new city can be entered 
 document.querySelector(".fetchBtn").onclick = function(event){
   event.preventDefault();
    var cityName= document.querySelector("#cityName").value;
    console.log(cityName)
    //i need to be able to call cityName with this value into the global scope
   arrayCity.push(cityName);
   localStorage.setItem("arrayCity", JSON.stringify (arrayCity));

    
    getAPi(cityName);
    fiveDay(cityName)

   $("#weatherBox").empty();
    for (var i = 0; i< arrayCity.length; i++) {
      var city = arrayCity [i];
      var li = document.createElement ("li");
      li.textContent =arrayCity[i];
      li.setAttribute ("data-index", i);
      weatherShow.appendChild (li);}
     }

 
   
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