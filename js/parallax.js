(function ($) {
  var $wraps,
    rafId = null;

  function update() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    $wraps.each(function () {
      var wrap = this;
      var $w = $(wrap);
      var $img = $w.find(".px-img").eq(0);
      if (!$img.length) return;

      var rect = wrap.getBoundingClientRect();
      // 화면 근처에서만 연산 (여유 80px)
      if (rect.bottom <= -80 || rect.top >= vh + 80) return;

      var speed = parseFloat($w.data("speed")) || 0.6; // 기본값 살짝 높임
      var progress = (vh - rect.top) / (vh + rect.height); // 0~1 근사
      var dy = (progress - 0.5) * speed * rect.height * 1.2;

      // 기준 translate + 추가 translateY (calc 없이 안전)
      $img.css(
        "transform",
        "translate(-50%, -50%) translateY(" + (-dy).toFixed(2) + "px)"
      );
    });
  }

  function loop() {
    update();
    rafId = requestAnimationFrame(loop);
  }

  $(function () {
    $wraps = $(".px-wrap");
    if (rafId) cancelAnimationFrame(rafId);
    loop();

    // 레이아웃 변동 대응
    $(window).on("resize.parallax pageshow.parallax", function () {
      update();
    });
  });
})(jQuery);
