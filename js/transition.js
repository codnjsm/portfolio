$(function () {
  const $wrapper = $('.wrapper');

  function isMainPage() {
    const path = location.pathname;
    return path.endsWith('/') || path.endsWith('index.html') || path.endsWith('/portfolio/');
  }

  function applyTransition() {
    $('body').addClass('loaded');
    if (isMainPage()) {
      $wrapper.addClass('enter-main');
    } else {
      $wrapper.addClass('enter-sub');
    }
  }

  $(window).on('load', applyTransition);
});