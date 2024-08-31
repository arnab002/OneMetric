// Wrap the entire code in a function that will be called once jQuery is loaded
function initializeScript($) {
  'use strict';

  // sidebar submenu collapsible js
  $(".sidebar-menu .dropdown").on("click", function () {
    var item = $(this);
    item.siblings(".dropdown").children(".sidebar-submenu").slideUp();
    item.siblings(".dropdown").removeClass("dropdown-open");
    item.siblings(".dropdown").removeClass("open");
    item.children(".sidebar-submenu").slideToggle();
    item.toggleClass("dropdown-open");
  });

  $(".sidebar-toggle").on("click", function () {
    $(this).toggleClass("active");
    $(".sidebar").toggleClass("active");
    $(".dashboard-main").toggleClass("active");
  });

  $(".sidebar-mobile-toggle").on("click", function () {
    $(".sidebar").addClass("sidebar-open");
    $("body").addClass("overlay-active");
  });

  $(".sidebar-close-btn").on("click", function () {
    $(".sidebar").removeClass("sidebar-open");
    $("body").removeClass("overlay-active");
  });

  //to keep the current page active
  $(function () {
    for (
      var nk = window.location,
      o = $("ul#sidebar-menu a")
        .filter(function () {
          return this.href == nk;
        })
        .addClass("active-page")
        .parent()
        .addClass("active-page");
      ;
    ) {
      if (!o.is("li")) break;
      o = o.parent().addClass("show").parent().addClass("open");
    }
  });

  /**
   * Utility function to calculate the current theme setting.
   * Look for a local storage value.
   * Fall back to light mode.
   */
  function calculateSettingAsThemeString({ localStorageTheme }) {
    return localStorageTheme !== null ? localStorageTheme : "light";
  }

  /**
   * Utility function to update the button text and aria-label.
   */
  function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "dark" : "light";
    // buttonEl.setAttribute("aria-label", newCta);
    // buttonEl.innerText = newCta;
  }

  /**
   * Utility function to update the theme setting on the html tag
   */
  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }

  /**
   * Theme toggle functionality
   */
  function setupThemeToggle() {
    const button = document.querySelector("[data-theme-toggle]");
    const localStorageTheme = localStorage.getItem("theme");
    let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme });

    updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
    updateThemeOnHtmlEl({ theme: currentThemeSetting });

    if (button) {
      button.addEventListener("click", (event) => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        updateButton({ buttonEl: button, isDark: newTheme === "dark" });
        updateThemeOnHtmlEl({ theme: newTheme });
        currentThemeSetting = newTheme;
      });
    }
  }

  // Table Header Checkbox checked all js
  $('#selectAll').on('change', function () {
    $('.form-check .form-check-input').prop('checked', $(this).prop('checked'));
  });

  // Remove Table Tr when click on remove btn
  $('.remove-btn').on('click', function () {
    $(this).closest('tr').remove();
    if ($('.table tbody tr').length === 0) {
      $('.table').addClass('bg-danger');
      $('.no-items-found').show();
    }
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
        $('#imagePreview').hide();
        $('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imageUpload").change(function () {
    readURL(this);
  });

  function initializePasswordToggle(toggleSelector) {
    $(toggleSelector).on('click', function () {
      $(this).toggleClass("ri-eye-off-line");
      var input = $($(this).attr("data-toggle"));
      if (input.attr("type") === "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }

  initializePasswordToggle('.toggle-password');
  setupThemeToggle();
}

// Check if jQuery is already loaded
if (typeof jQuery === 'undefined') {
  // If jQuery is not loaded, create a script element to load it
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js';
  script.onload = function() {
    // Once jQuery is loaded, initialize our script
    initializeScript(jQuery);
  };
  document.head.appendChild(script);
} else {
  // If jQuery is already loaded, initialize our script immediately
  initializeScript(jQuery);
}