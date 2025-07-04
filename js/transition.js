$(window).on('load', function () {
  setTimeout(function () {
    $('#preloader').fadeOut(500, function () {
      $('.wrapper').fadeTo(300, 1);
    });
  }, 1600);
});

$(function () {
  $('a').on('click', function (e) {
    const link = $(this).attr('href');

    // 외부 링크, 새창, 앵커 제외
    if (
      !link ||
      link.startsWith('#') ||
      $(this).attr('target') === '_blank' ||
      link.startsWith('mailto:') ||
      link.startsWith('http')
    ) return;

    e.preventDefault();

    const $wrapper = $('.wrapper');
    
    if ($wrapper.length) {
      // wrapper가 있을 때만 페이드아웃
      $wrapper.fadeOut(300, function () {
        window.location.href = link;
      });
    } else {
      // wrapper가 없으면 그냥 바로 이동
      window.location.href = link;
    }
  });
});

$(function () {
  if ($('#lottie-loader').length) {
    lottie.loadAnimation({
      container: $('#lottie-loader')[0], // jQuery 객체 → DOM element로 변환
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'src/loading.json'
    });
  }
});

