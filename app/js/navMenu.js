var $ = jQuery;

( function( $ ) {
  var Neu = Neu || {};

  $.fn.navMenu = function(options) {
      return this.each(function() {
          var navMenu = Object.create(Neu.navMenu);
          navMenu.init(this, options);
      });
  };

  $.fn.navMenu.options = {
      linksList: ".com-nav__links",
      link: ".nav-link",
      mobileBtn: ".com-nav__mobileBtn"
  };

  Neu.navMenu = {
    init: function(elem, options) {
        var self = this;
        self.$container = $(elem);
        self.options = $.extend({}, $.fn.navMenu.options, options);
        self.bindElements();
        self.bindEvents();
    },
    bindElements: function() {
      var self = this;

      self.$linksList = self.$container.find(self.options.linksList);
      self.$link = self.$container.find(self.options.link);
      self.$mobileBtn = self.$container.find(self.options.mobileBtn);
    },
    bindEvents: function() {
      var self = this;

      self.$mobileBtn.on("click", function() {
        self.toggleMenu();
      });

      self.$link.on("click", function(e) {
        e.preventDefault();
        self.slideToAnchor(e);
      });

        var navTop = self.$container.offset().top;

        $(window).scroll(function() {

            var currentScroll = $(window).scrollTop();

            if (currentScroll >= (navTop)) {
              self.$container.addClass("fixed");
            } else {
              self.$container.removeClass("fixed");
            }

        });

        $(document).on('click touch', function(e) {
          if (!$(e.target).parents().addBack().is(self.$container)) {
            self.$linksList.removeClass("active");
          }
        });
    },
    toggleMenu: function() {
      var self = this;

      self.$linksList.toggleClass("active");
    },
    slideToAnchor: function(e) {
      var self = this;

      var curLink = e.currentTarget;
      var target = $(curLink.hash);

        if (target.length) {

          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
        }


      self.$linksList.removeClass("active");

    }
  };

}( $ ) );

(function init () {
  $(document).ready(function() {
    $(".com-nav").navMenu();
  });
})();
