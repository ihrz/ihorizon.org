(function () {
  "use strict";

  var carousels = function () {
    if (typeof jQuery !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
      $(".owl-carousel1").owlCarousel({
        loop: true,
        center: true,
        margin: 30,
        responsiveClass: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
            nav: false,
            dots: true
          },
          680: {
            items: 2,
            nav: false,
            dots: true
          },
          1000: {
            items: 3,
            nav: true,
            dots: true
          }
        },
        navText: [
          "<i class='fas fa-chevron-left'></i>",
          "<i class='fas fa-chevron-right'></i>"
        ],
        touchDrag: true,
        mouseDrag: true
      });
    } else {
      setTimeout(carousels, 500);
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (typeof jQuery !== 'undefined') {
      carousels();
    } else {
      var checkJQuery = setInterval(function() {
        if (typeof jQuery !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
          clearInterval(checkJQuery);
          carousels();
        }
      }, 100);
    }
  });
})();
