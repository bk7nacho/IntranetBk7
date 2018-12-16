function cerrarModal(idModal){
  $('#'+idModal).modal('hide');
}

$(function() {
  "use strict";
  setTimeout(function() {
    $('.page-loader-wrapper').fadeOut();
  }, 50);

});

$(document).ready(function() {
  "use strict";
  // sidebar navigation
  $('#main-menu').metisMenu();
  // sidebar nav scrolling
  $('#leftsidebar .sidebar-scroll').slimScroll({
    height: 'calc(100vh - 65px)',
    wheelStep: 10,
    touchScrollStep: 50,
    color: '#efefef',
    size: '2px',
    borderRadius: '3px',
    alwaysVisible: false,
    position: 'right',
  });

  // toggle fullwidth layout
  $('.btn-toggle-fullwidth').on('click', function() {
    if(!$('body').hasClass('menu-icon')) {
      $('body').addClass('menu-icon');

      // Small menu hover add class
      $('.menu-icon .metismenu li').hover(
        function(){ $(this).addClass('hover')},
        function(){ $(this).removeClass('hover')}
      )

    } else {
      $('body').removeClass('menu-icon');
    }
  });

  // off-canvas menu toggle
  $('.btn-toggle-offcanvas').on('click', function() {
    $('body').toggleClass('offcanvas-active');
  });

  $('#main-content').on('click', function() {
    $('body').removeClass('offcanvas-active');
  });

  // Bootstrap tooltip init
  if($('[data-toggle="tooltip"]').length > 0) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  if($('[data-toggle="popover"]').length > 0) {
    $('[data-toggle="popover"]').popover();
  }

  $(window).on('load', function() {
    // for shorter main content
    if($('#main-content').height() < $('#leftsidebar').height()) {
      $('#main-content').css('min-height', $('#leftsidebar').innerHeight() - $('footer').innerHeight());
    }
  });

  $(window).on('load resize', function() {
    if($(window).innerWidth() < 420) {
      $('.navbar-brand logo.svg').attr('src', '../assets/images/logo-icon.svg');
    } else {
      $('.navbar-brand logo-icon.svg').attr('src', '../assets/images/logo.svg');
    }
  });

  $(".navbar-nav .icon-menu").hover(function () {
    $(this).toggleClass("animated jello");
  });

  // (Optional) Active an item if it has the class "is-active"
  $(".accordion2 > .accordion-item.is-active").children(".accordion-panel").slideDown();

  $(".accordion2 > .accordion-item").click(function() {
    // Cancel the siblings
    $(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp();
    // Toggle the item
    $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
  });

  // Wait card Js
  $('[data-toggle="cardloading"]').on('click', function () {
    var effect = $(this).data('loadingEffect');
    var $loading = $(this).parents('.card').waitMe({
      effect: effect,
      text: 'Loading...',
      bg: 'rgba(255,255,255,0.90)',
      color: '#555'
    });

    setTimeout(function () {
      //Loading hide
      $loading.waitMe('hide');
    }, 2000);
  });

  // Full screen class
  $('.full-screen').on('click', function() {
    $(this).parents('.card').toggleClass('fullscreen');
  });

});
