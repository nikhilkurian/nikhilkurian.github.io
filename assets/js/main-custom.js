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

  // ===========================================================================
  // Avatar Modal Functionality
  // ===========================================================================
  // Handles the avatar modal popup functionality
  
  // Global function to open avatar modal
  window.openAvatarModal = function(imageSrc, name) {
    document.getElementById('avatarModalImg').src = imageSrc;
    document.getElementById('avatarModalImg').alt = name;
    document.getElementById('avatarModalName').textContent = name;
    document.getElementById('avatarModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close modal when clicking the close button
  $('.avatar-modal-close').on('click', function() {
    document.getElementById('avatarModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  });

  // Close modal when clicking outside the modal content
  $('.avatar-modal').on('click', function(e) {
    if (e.target === this) {
      document.getElementById('avatarModal').style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });

  // Close modal with Escape key
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('avatarModal').style.display === 'block') {
      document.getElementById('avatarModal').style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });

  // ===========================================================================
  // Night Mode Toggle Functionality
  // ===========================================================================
  
  // Check for saved night mode preference or default to light mode
  const currentTheme = localStorage.getItem('nightMode') || 'light';
  const nightModeToggleHeader = document.getElementById('nightModeToggleHeader');
  
  // Apply saved theme on page load
  if (currentTheme === 'dark') {
    document.body.classList.add('night-mode');
    if (nightModeToggleHeader) {
      nightModeToggleHeader.checked = true;
    }
  }
  
  // Night mode toggle function
  function toggleNightMode() {
    console.log('toggleNightMode function called');
    const body = document.body;
    const isNightMode = body.classList.contains('night-mode');
    console.log('Current night mode state:', isNightMode);
    
    if (isNightMode) {
      // Switch to light mode
      console.log('Switching to light mode');
      body.classList.remove('night-mode');
      localStorage.setItem('nightMode', 'light');
    } else {
      // Switch to dark mode
      console.log('Switching to dark mode');
      body.classList.add('night-mode');
      localStorage.setItem('nightMode', 'dark');
    }
    console.log('Night mode toggle completed');
  }
  
  // Add change event listener to header toggle switch
  if (nightModeToggleHeader) {
    console.log('Header night mode toggle switch found');
    nightModeToggleHeader.addEventListener('change', function() {
      console.log('Header night mode toggle switched');
      toggleNightMode();
    });
  } else {
    console.log('Header night mode toggle switch NOT found');
  }
  
  // Add keyboard shortcut (Ctrl/Cmd + Shift + D)
  $(document).on('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      toggleNightMode();
    }
  });

  // =============================================================================
  // Email Reveal Functionality
  // =============================================================================
  
  // Global function to reveal email
  window.revealEmail = function() {
    const emailBtn = document.querySelector('.email-reveal-btn');
    const emailRevealed = document.getElementById('emailRevealed');
    
    if (emailBtn && emailRevealed) {
      // Hide the button
      emailBtn.style.display = 'none';
      
      // Show the revealed email with animation
      emailRevealed.style.display = 'inline-flex';
      emailRevealed.style.opacity = '0';
      emailRevealed.style.transform = 'translateY(-10px)';
      
      // Animate in
      setTimeout(() => {
        emailRevealed.style.transition = 'all 0.3s ease';
        emailRevealed.style.opacity = '1';
        emailRevealed.style.transform = 'translateY(0)';
      }, 10);
    }
  };

});
