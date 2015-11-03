$(document).ready(function(){
Compass.init(function (method) {
  alert('Compass heading by ' + method);
  });

  Compass.watch(function (heading) {
  $('.btn').text(heading);
  $('.btn').css('transform', 'rotate(' + (-heading) + 'deg)');
});

});
