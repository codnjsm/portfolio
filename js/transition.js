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
 
  const isGithubPages = location.hostname.includes('github.io');
  const base = isGithubPages ? '/portfolio/' : '/';
 
  let loadCount = 0;
 
  function onPartLoaded() {
    loadCount++;
    if (loadCount === 2) {
      applyTransition();
    }
  }
 
  $('#header').load(base + 'html/header.html', function () {
    $('.logo').attr('href', base + 'index.html');
    $('.link-works').attr('href', base + 'html/works.html');
    $('.link-about').attr('href', base + 'html/aboutMe.html');
    $('.link-contact').attr('href', base + 'html/contact.html');
    onPartLoaded();
  });
 
  $('#footer').load(base + 'html/footer.html', onPartLoaded);

});