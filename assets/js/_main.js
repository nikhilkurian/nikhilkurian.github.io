/* =============================================================================
   jQuery plugin settings and other scripts for Minimal Mistakes Jekyll Theme
   =============================================================================
   
   This file contains all the JavaScript functionality for the website including:
   - Sticky footer implementation
   - Responsive navigation
   - Image popup functionality
   - Smooth scrolling
   - Sidebar behavior
   ============================================================================= */

$(document).ready(function(){
   // ===========================================================================
   // Sticky Footer Implementation
   // ===========================================================================
   // Ensures the footer stays at the bottom of the page even when content is short
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  // FitVids init
  $("#main").fitVids();

  // ===========================================================================
  // Sticky Sidebar Implementation
  // ===========================================================================
  // Handles the sticky behavior of the author sidebar on desktop and mobile
  $(".sticky").Stickyfill();

  var stickySideBar = function(){
    // Determine if sidebar should be shown based on screen size and button visibility
    var show = $(".author__urls-wrapper button").length === 0 ? $(window).width() > 1024 : !$(".author__urls-wrapper button").is(":visible");
    
    if (show) {
      // Enable sticky sidebar for desktop view
      Stickyfill.rebuild();
      Stickyfill.init();
      $(".author__urls").show();
    } else {
      // Disable sticky sidebar for mobile view
      Stickyfill.stop();
      $(".author__urls").hide();
    }
  };

  stickySideBar();

  $(window).resize(function(){
    stickySideBar();
  });

  // ===========================================================================
  // Mobile Navigation Menu
  // ===========================================================================
  // Handles the dropdown behavior of the author links on mobile devices
  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").fadeToggle("fast", function() {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // ===========================================================================
  // Smooth Scrolling
  // ===========================================================================
  // Enables smooth scrolling for all anchor links with a 20px offset
  $("a").smoothScroll({offset: -20});

  // ===========================================================================
  // Image Lightbox Setup
  // ===========================================================================
  // Adds lightbox functionality to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // ===========================================================================
  // Beautiful Scroll Animations
  // ===========================================================================
  // Adds smooth reveal animations for elements as they come into view
  function animateOnScroll() {
    $('.archive__item, .page__title, .author__avatar').each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('animate-in');
      }
    });
  }

  // Run animation check on scroll and page load
  $(window).on('scroll', animateOnScroll);
  $(document).ready(animateOnScroll);

  // ===========================================================================
  // Enhanced Button Hover Effects
  // ===========================================================================
  // Adds beautiful hover effects to buttons and links
  $('.btn, .archive__item a').hover(
    function() {
      $(this).addClass('hover-effect');
    },
    function() {
      $(this).removeClass('hover-effect');
    }
  );

  // ===========================================================================
  // Magnific-Popup Configuration
  // ===========================================================================
  // Configures the image lightbox popup with gallery functionality
  $(".image-popup").magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    mainClass: 'mfp-zoom-in', // CSS class for zoom-in animation
    callbacks: {
      beforeOpen: function() {
        // Add animation class to popup markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // Allow opening popup on middle mouse click
  });

});
