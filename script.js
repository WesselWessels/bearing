var toPlace = "";
var tLat = 0;
var tLong = 0;
var fLat = 0;
var fLong = 0;
var currentBearing = 0;
var chosenBearing = 0;
var trueBearing = 0;
var foundNorth = false;
var done = false;
var theDistance = 0;

$(document).ready(function(){
  $(".arrow_red").hide();
  $(".compass").hide();
  $("#afterLocation").hide();
  $("#dropdownMenu1").hide();
Compass.init(function (method) {
  //alert('Compass heading by ' + method);
  });

  Compass.watch(function (heading) {
  $('#heading').text(heading);
  currentBearing = heading;

  if(done == true){
    $('.arrow_green').css('transform', 'rotate(' + (chosenBearing-heading) + 'deg)');
  }
  $('.arrow_red').css('transform', 'rotate(' + (trueBearing - heading)+ 'deg)');
  $('.compass').css('transform', 'rotate(' + (- heading)+ 'deg)');

  // $("#compass_debug").text(  "True Bearing: "+trueBearing+ "\nHeading: "+(-heading));
});

// var ans = [];
// var asdf = "";
// $("tbody tr").each(function(){
//   // console.log($(this).find('td'));
//   var temp = [];
//   var a = $(this).find('td');
//   for(var i = 1; i < a.length; i++){
//     var text = a[i].innerText;
//     if(a[i]!= " "){
//       temp.push(text);
//     }
//
//   }
//   asdf += '<li><a href="#" class="countrySelect" lat="'+temp[2]+'" long="'+temp[3]+'">'+ temp[0] + ' - ' + temp[1] + '</a></li>';
//   asdf += "\n";
// //  <li><a href="#">Separated link</a></li>
//   ans.push(temp);
// //  console.log(a);
// });
// console.log(asdf);
$(".countrySelect").click(function(e){
  $(".arrow_red").hide();
  $(".compass").hide();


  toPlace = $(this).html();
  $("#lookingFor").html("Looking for " + toPlace);
  tLat = parseFloat($(this).attr('lat').replace(",", "."));
  tLong = parseFloat($(this).attr('long').replace(",", "."));
  done=false;
  $('.arrow_green').css('transform', 'none');
  getBearing();
  $("#dropdownMenu1").text(toPlace);
  $("#checkBearing").show();
  $("#result").text("");

  //console.log(tLat);
  //console.log(getBearing());
  // console.log($(this).attr('lat'));
});
$("#getLocation").click(function(e){
  e.preventDefault();
  getLocation();
  //$(this).hide();
});
$("#checkBearing").click(function(e){
  e.preventDefault();
  trueBearing = getBearing();
  chosenBearing = currentBearing;
  var test = (360-(trueBearing - currentBearing)) % 360;
  if(test >= 180){
    test = 360 - test;
  }
  done = true;
  $(".arrow_red").show();
  $(".compass").show();
  var resultText = "";
  if(test <= 30){
    if(foundNorth == true){
        $("#result").html("Success!<br>You were within " + test +" degrees<br>The distance: "+theDistance +"km"  );
    }
    else{
      $("#result").html("Success!<br>You were within " + test +" degrees" );

    }

  }
  else{
    if(foundNorth == true){
      $("#result").html("Wrong!<br>You were within " + (test%360) +" degrees<br>The distance: "+theDistance +"km" );

    }
    else{
      $("#result").html("Wrong!<br>You were within " + (test%360) +" degrees" );

    }
  }
  $("#checkBearing").html("Check Direction");
  $("#checkBearing").hide();
  $("#dropdownMenu1").show();
  foundNorth = true;
});
// $("#findNorth").click(function(){
//
// });
function checkBearing(){

}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
    } else {
      alert("Location not supported");
    }
}
function showPosition(position) {

  fLat = position.coords.latitude;
  fLong = position.coords.longitude;
  tLat = fLat + 1;
  tLong = fLong;
  $("#myLocation").html("Me: Lat: "+ fLat + "\nLong: " + fLong);
  $("#getLocation").hide();
  $("#afterLocation").show();
  //alert("Lat: "+ position.coords.latitude + "\nLong: " + position.coords.longitude);
}
function errorPosition(error){
  alert("An error occurred");
}
function getBearing(){
  var fLatRad = degToRad(fLat);
  var fLongRad = degToRad(fLong);
  var tLatRad = degToRad(tLat);
  var tLongRad = degToRad(tLong);
  var angle = Math.atan2(Math.sin(tLongRad - fLongRad)*Math.cos(tLatRad), Math.cos(fLatRad)*Math.sin(tLatRad) - Math.sin(fLatRad)*Math.cos(tLatRad)*Math.cos(tLongRad - fLongRad));

  angle = (angle + 2*Math.PI) % (2*Math.PI);
  console.log(fLatRad + " " + fLongRad + " " + tLatRad + " " +tLongRad);
  trueBearing = radToDeg(angle);

  var dPhi = tLatRad - fLatRad;
  var dLambda = tLongRad - fLongRad;
  var R = 6371000;
  var a = Math.sin(dPhi/2) * Math.sin(dPhi/2) + Math.cos(fLatRad) * Math.cos(tLatRad) * Math.sin(dLambda/2) * Math.sin(dLambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  theDistance = (R*c)/1000;
  //console.log(trueBearing)
  return radToDeg(angle);
}
function degToRad(deg){
	return deg * Math.PI / 180;
}

function radToDeg(rad)
{
    return rad * 180 / Math.PI;
}
});
