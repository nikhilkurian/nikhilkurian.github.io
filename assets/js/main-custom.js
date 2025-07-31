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

// RESPECT USER PREFERENCE - RUNS BEFORE DOCUMENT READY
(function() {
  // Only set default if no preference exists
  if (!localStorage.getItem('nightMode')) {
    localStorage.setItem('nightMode', 'dark');
  }
  
  // Don't force remove night-mode class - let the main logic handle it
  // This allows user preferences to be respected
})();

$(document).ready(function(){
  // ===========================================================================
  // FORCE MOBILE LAYOUT IMMEDIATELY
  // ===========================================================================
  
  // Force mobile layout to be applied immediately
  function forceMobileLayout() {
    if (window.innerWidth <= 768) {
      // Force sidebar to be full width
      const sidebar = document.querySelector('.sidebar, .sidebar__right');
      if (sidebar) {
        sidebar.style.width = '100%';
        sidebar.style.maxWidth = '100%';
        sidebar.style.float = 'none';
        sidebar.style.margin = '0 0 1.5em 0';
        sidebar.style.padding = '1.5em';
        sidebar.style.order = '1';
        sidebar.style.position = 'relative';
        sidebar.style.left = 'auto';
        sidebar.style.right = 'auto';
        sidebar.style.display = 'block';
      }
      
      // Force main content to be block
      const main = document.getElementById('main');
      if (main) {
        main.style.display = 'block';
        main.style.flexDirection = 'column';
        main.style.gap = '1em';
        main.style.width = '100%';
      }
      
      // Force author content to be centered
      const authorContent = document.querySelector('.author__content');
      if (authorContent) {
        authorContent.style.display = 'flex';
        authorContent.style.flexDirection = 'column';
        authorContent.style.alignItems = 'center';
        authorContent.style.textAlign = 'center';
        authorContent.style.width = '100%';
      }
      
      // Force follow button to be centered
      const followBtn = document.querySelector('.follow-btn');
      if (followBtn) {
        followBtn.style.display = 'block';
        followBtn.style.margin = '1em auto 0.5em auto';
        followBtn.style.marginLeft = 'auto';
        followBtn.style.marginRight = 'auto';
        followBtn.style.width = 'fit-content';
        followBtn.style.maxWidth = '200px';
      }
    }
  }
  
  // Apply mobile layout immediately
  forceMobileLayout();
  
  // Apply mobile layout on window resize
  window.addEventListener('resize', forceMobileLayout);
  
  // Apply mobile layout after a short delay to ensure all elements are loaded
  setTimeout(forceMobileLayout, 100);
  setTimeout(forceMobileLayout, 500);
  
  // ===========================================================================
  // FORCE DARK MODE AS DEFAULT - IMMEDIATE EXECUTION
  // ===========================================================================
  // Add night-mode class by default
  document.body.classList.add('night-mode');
  
  // Force dark mode in localStorage if not set
  if (!localStorage.getItem('nightMode')) {
    localStorage.setItem('nightMode', 'dark');
  }
  
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
  
  // Get current theme from localStorage or default to dark
  let currentTheme = localStorage.getItem('nightMode');
  
  // Only set default to dark if no preference exists
  if (!currentTheme) {
    currentTheme = 'dark';
    localStorage.setItem('nightMode', 'dark');
  }
  
  const nightModeToggleHeader = document.getElementById('nightModeToggleHeader');
  
  // Ensure body starts with night-mode class by default
  document.body.classList.add('night-mode');
  
  // Force toggle to be checked by default
  if (nightModeToggleHeader) {
    console.log('Found toggle, setting to checked');
    nightModeToggleHeader.checked = true;
  } else {
    console.log('Toggle not found during initialization');
  }
  
  // Apply the user's saved theme preference
  if (currentTheme === 'light') {
    document.body.classList.remove('night-mode');
    if (nightModeToggleHeader) {
      nightModeToggleHeader.checked = false;
      console.log('Applied LIGHT mode from user preference');
    }
  } else {
    // Default to dark mode
    document.body.classList.add('night-mode');
    if (nightModeToggleHeader) {
      nightModeToggleHeader.checked = true;
      console.log('Applied DARK mode (default or user preference)');
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
    console.log('Initial toggle state:', nightModeToggleHeader.checked);
    
    nightModeToggleHeader.addEventListener('change', function() {
      console.log('Header night mode toggle switched');
      console.log('New toggle state:', this.checked);
      toggleNightMode();
    });
    
    // Also add click event as backup
    nightModeToggleHeader.addEventListener('click', function() {
      console.log('Toggle clicked');
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
  
  // Global function to unscramble email
  window.unscrambleEmail = function() {
    const emailScrambled = document.getElementById('emailScrambled');
    const emailRevealed = document.getElementById('emailRevealed');
    
    if (emailScrambled && emailRevealed) {
      // Hide the scrambled email
      emailScrambled.style.display = 'none';
      
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

  // =============================================================================
  // Follow Button Popup Functionality
  // =============================================================================
  
  // Create follow popup HTML if it doesn't exist
  function createFollowPopup() {
    if (!document.getElementById('followPopup')) {
      const popupHTML = `
        <div id="followPopup" class="follow-popup">
          <div class="follow-popup-content">
            <div class="follow-popup-header">
              <h3>Follow Me</h3>
              <button class="follow-popup-close" onclick="closeFollowPopup()">&times;</button>
            </div>
                             <div class="follow-popup-body">
                   <p>Follow me to know more about my activities</p>
                   <div class="follow-popup-links">
                     <a href="https://linkedin.com/in/nikhilkurian" target="_blank" class="follow-link">
                       <i class="fab fa-linkedin"></i> LinkedIn
                     </a>
                     <a href="https://github.com/nikhilkurian" target="_blank" class="follow-link">
                       <i class="fab fa-github"></i> GitHub
                     </a>
                     <a href="https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID" target="_blank" class="follow-link">
                       <i class="fas fa-graduation-cap"></i> Google Scholar
                     </a>
                   </div>
                 </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', popupHTML);
    }
  }

  // Show follow popup
  window.showFollowPopup = function() {
    createFollowPopup();
    const popup = document.getElementById('followPopup');
    if (popup) {
      popup.style.display = 'flex';
      popup.style.opacity = '0';
      setTimeout(() => {
        popup.style.opacity = '1';
      }, 10);
    }
  };

  // Close follow popup
  window.closeFollowPopup = function() {
    const popup = document.getElementById('followPopup');
    if (popup) {
      popup.style.opacity = '0';
      setTimeout(() => {
        popup.style.display = 'none';
      }, 300);
    }
  };

  // Add click event listeners to follow buttons
  $(document).on('click', '.follow-btn, .follow-btn-mobile', function(e) {
    e.preventDefault();
    showFollowPopup();
  });

  // Close popup when clicking outside
  $(document).on('click', '#followPopup', function(e) {
    if (e.target.id === 'followPopup') {
      closeFollowPopup();
    }
  });

  // Close popup with Escape key
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
      closeFollowPopup();
    }
  });

});
