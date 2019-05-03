var $ = jQuery;

$(document).ready(function() {


  // Set the date we're counting down to
var countDownDate = new Date("May 3, 2019 09:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  $(".countdown__days").html(days);
  $(".countdown__hours").html(hours);
  $(".countdown__minutes").html(minutes);
  $(".countdown__seconds").html(seconds);

 /*  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s "; */

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

  var video = $(".com-video");

  video.each( function() {
    var videoIframe = $(this).find("#com-video__iframe");
    var videoTrigger = $(this).find(".com-video__trigger");

    videoTrigger.on('click', function() {
      videoIframe[0].src += "&autoplay=1";
      videoTrigger.hide();
    })
  });

  $(this).scrollMessage({
    container: ".com-wrapper",
    message: ".scrollup",
    startPoint: ".start",
    stopPoint: ".stop"
  });

});
