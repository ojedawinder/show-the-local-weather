$( document ).ready(function(){
  var endPoint = "http://api.openweathermap.org/data/2.5/weather?q=";
  var AuthenticacionKey = "&APPID=74075dd53a744146fb8aec4d76713421";
  var city = "";
  var main = {};
  var des = {};
  var unit = "C";
  getUserLocation();

$('#btnChangeUnit').click(function(){
  if(unit==="C")
    unit="F";
  else
    unit ="C";

  changeUnit();
});


function getUserLocation(){
  $.getJSON('http://ipinfo.io', function(data){
    city = data.city + ',' + data.country;
    getCurrentWeather(city);
  }, function(err){
     console.log(err);
  });
}


function getCurrentWeather(city){
  var units = "&units=metric";
  $.getJSON(endPoint + city + units+ AuthenticacionKey, function(data){
     CurrentWeather(data);
  }, function(err){
     console.log(err);
  });

}

function CurrentWeather(data) {
  main.temp = Math.round(data.main.temp);
  main.pressure = Math.round(data.main.pressure);
  main.humidity = Math.round(data.main.humidity);
  main.temp_min = Math.round(data.main.temp_min);
  main.temp_max = Math.round(data.main.temp_max);
  des = data.weather[0];
  showInformation();
  selectIcon(des.main);
}
function changeUnit(){
  var btnChangeUnit = $('#btnChangeUnit');
  if(unit==="C"){
    btnChangeUnit.html("Show data in Fahrenheit");
  } else {
    btnChangeUnit.html("Show data in Celsius");
  }
  showInformation();
}

function selectIcon(des) {
  var des = des.toLowerCase()
  switch (des) {
    case 'dizzle':
      toogleIcon(des)
      break;
    case 'clouds':
      toogleIcon(des)
      break;
    case 'rain':
      toogleIcon(des)
      break;
    case 'snow':
      toogleIcon(des)
      break;
    case 'clear':
      toogleIcon(des)
      break;
    case 'thunderstom':
      toogleIcon(des)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function toogleIcon(des) {
  $('div.' + des).removeClass('hide');
}

function showInformation(){
  $('#cityInformation').html("Location: "+city);
  $('#tempInformation').html("Current Temp: "+calcTemp(main.temp)+"&#176;"+unit);
  $('#pressureInformation').html("Pressure: "+main.pressure);
  $('#humidityInformation').html("Humidity: "+main.humidity);
  $('#tempMinInformation').html("Temp Min: "+calcTemp(main.temp_min)+"&#176;"+unit);
  $('#tempMaxInformation').html("Temp Max: "+calcTemp(main.temp_max)+"&#176;"+unit);
  $('#desc').html("Desc: "+des.description);
}

function calcTemp(temp){
  if(unit==="C"){
    return temp;
  } else {
    return Math.round( (temp * 9)/5 + 32 );
  }
}
});
