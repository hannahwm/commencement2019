var $ = jQuery;
var ScrollMagic = bundleLib.run();

( function( $ ) {
  var Neu = Neu || {};

  $.fn.scrollmagicControls = function(options) {
      return this.each(function() {
          var scrollmagicControls = Object.create(Neu.scrollmagicControls);
          scrollmagicControls.init(this, options);
      });
  };

  $.fn.scrollmagicControls.options = {
      pinned: ".section",
      navEl: ".nav-link",
      target: ".section-target"
  };

  Neu.scrollmagicControls = {
      init: function(elem, options) {
          var self = this;
          self.$container = $(elem);
          self.options = $.extend({}, $.fn.scrollmagicControls.options, options);
          self.bindElements();
          self.bindEvents();

          $(document).ready( function() {
              self.triggerScrollMagic();
          });
      },
      bindElements: function() {
        var self = this;

        self.$pinned = self.$container.find(self.options.pinned);
        self.$navEl = self.$container.find(self.options.navEl);
        self.controller = new ScrollMagic.Controller();
    },
    bindEvents: function() {
      var self = this;
    },
    triggerScrollMagic: function() {
      var self = this;

      for (var i=0; i<self.$pinned.length; i++) {
  			var slide = self.$pinned[i];
        var duration;

        duration = $(slide).height();

  			new ScrollMagic.Scene({
					triggerElement: slide,
					duration: duration,
					triggerHook: 0,
					reverse: true,
          offset: -50
				})
        .on("enter leave", function(e) {

          var trigger = this.triggerElement();
          var target = $(trigger).find(self.options.target);
          var targetID = $(target).attr("data-sectionID");
          var navElement = $('[data-navID="' + targetID + '"]');

          if (e.type === "leave") {
            navElement.removeClass("active").blur();
          } else {
            navElement.addClass("active").focus();
          }
        })
				.addTo(self.controller);
  		}
    }
  };

}( $ ) );

(function init () {
  $(document).ready(function() {
    $(".com-wrapper").scrollmagicControls();
  });
})();
