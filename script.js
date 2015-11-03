$(document).ready(function(){
Compass.init(function (method) {
  alert('Compass heading by ' + method);
  });

  Compass.watch(function (heading) {
  $('.arrow').text(heading);
  $('.arrow').css('transform', 'rotate(' + (-heading) + 'deg)');
});

});
