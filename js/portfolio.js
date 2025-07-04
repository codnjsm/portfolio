$(function () {
  const isGithubPages = location.hostname.includes('github.io');
  const base = isGithubPages ? '/portfolio/' : '/';

  // 헤더/푸터 불러오기
  $('#header').load(base + 'html/header.html', function () {
    $('.logo').attr('href', base + 'index.html');
    $('.link-works').attr('href', base + 'html/works.html');
    $('.link-about').attr('href', base + 'html/aboutMe.html');
    $('.link-contact').attr('href', base + 'html/contact.html');
  });

  $('#footer').load(base + 'html/footer.html');
});
