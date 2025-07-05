$(function () {
  // Lottie 로딩 애니메이션 실행 (메인에서만)
  if ($('#lottie-loader').length) {
    lottie.loadAnimation({
      container: $('#lottie-loader')[0],
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'src/loading.json'
    });
  }

  // // 페이지 로드 후 등장 애니메이션
  // $(window).on('load', function () {
  //   const $preloader = $('#preloader');
  //   const $wrapper = $('.wrapper');

  //   if ($preloader.length) {
  //     setTimeout(function () {
  //       $preloader.fadeOut(500, function () {
  //         $wrapper.addClass('fade-in');
  //       });
  //     }, 1600);
  //   } else {
  //     $wrapper.addClass('fade-in');
  //   }
  // });
  // transition.js 수정
$(window).on('load', function () {
  const $wrapper = $('.wrapper');

  // preloader 여부와 관계없이 무조건 fade-in
  setTimeout(function () {
    $('#preloader').fadeOut(500, function () {
      $wrapper.addClass('fade-in');
    });
  }, 1500);

  // fallback: preloader 없어도 fade-in
  if (!$('#preloader').length) {
    $wrapper.addClass('fade-in');
  }
});


  // 페이지 전환 애니메이션
  $(document).on('click', 'a', function (e) {
    const link = $(this).attr('href');

    if (
      !link ||
      link.startsWith('#') ||
      link.startsWith('mailto:') ||
      link.startsWith('http') ||
      $(this).attr('target') === '_blank'
    ) return;

    e.preventDefault();

    const $wrapper = $('.wrapper');

    if ($wrapper.length) {
      $wrapper.removeClass('fade-in').addClass('fade-out');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(function () {
            window.location.href = link;
          }, 200);
        });
      });
    } else {
      window.location.href = link;
    }
  });
});