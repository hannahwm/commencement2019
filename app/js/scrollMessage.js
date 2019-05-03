(function ( $ ) {

  $.fn.scrollMessage = function(options) {
    var settings = $.extend({
        //default options
        container: ".scroll-container",
        message: ".message",
        startPoint: ".starting-point",
        stopPoint: ".stopping-point"
    }, options );

    return this.each( function() {
      var doc = $(document),
          scrollPos = 0,
          lastScroll = 0;

      //function to check if element is scrolled into view (aka the stop element)
      function isScrolledIntoView(elem) {
          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + $(window).height();

          var elemTop = $(elem).offset().top;
          var elemBottom = elemTop + $(elem).height();

          return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
      }

      doc.on("scroll", function() {
        var container = $(settings.container),
          message = $(settings.message),
          curScrollPos = doc.scrollTop(),
          startPos = $(settings.startPoint).offset(),
          stop = $(settings.stopPoint);

          //if the start position has been reached
          if (curScrollPos > startPos.top) {

            //if the stop position has been reached
            if ( isScrolledIntoView(stop) ) {
              message.hide();
              return false;
            } else {
              //if scrolling down
              if (curScrollPos > scrollPos){

                message.fadeOut();
                clearTimeout($.data(this, 'scrollTimer'));

                $.data(this, 'scrollTimer', setTimeout(function() {
                  message.fadeIn();
                }, 200));
              }
            }
          } else {
            //if scrolling up
            if (curScrollPos < scrollPos){
              message.fadeOut();
            }
          }

          scrollPos = curScrollPos;
      });

      $(settings.message).on("click touchend", function() {
        $('html, body').animate({
          scrollTop: 0
        }, 1000);
      });
    });
  }
}( jQuery ));
