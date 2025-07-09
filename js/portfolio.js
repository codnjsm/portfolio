function drawCircularText() {
  const text = "WEB PUBLISHER • FRONTEND • JAVASCRIPT • REACT • HTML • CSS • ";
  const chars = text.split("");

  let radius = 240;
  const w = window.innerWidth;

  if (w <= 480) {
    radius = 140;
  } else if (w <= 576) {
    radius = 180;
  } else {
    radius = 240;
  }

  const $container = $("#circularText");
  $container.empty(); // 기존 텍스트 초기화
  const total = chars.length;

  chars.forEach((char, i) => {
    const angle = (360 / total) * i;
    const $span = $("<span>").text(char);
    $span.css({
      transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`
    });
    $container.append($span);
  });
}

$(document).ready(function () {
  drawCircularText();

  // 브라우저 크기 변경 시에도 다시 그리기
  $(window).on("resize", function () {
    drawCircularText();
  });
});

// ✅ 타이핑 효과
$(function () {
  const words = ["CHAE WON", "WEB DEVELOPER"];
  let currentWord = 0;
  let currentChar = 0;
  let isDeleting = false;
  const $typing = $(".name .typing");
  const typingSpeed = 150;
  const pauseTime = 1200;

  function typeEffect() {
    const fullText = words[currentWord];
    const visibleText = isDeleting
      ? fullText.substring(0, currentChar--)
      : fullText.substring(0, currentChar++);

    $typing.text(visibleText);

    if (!isDeleting && currentChar === fullText.length + 1) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentWord = (currentWord + 1) % words.length;
      setTimeout(typeEffect, 400);
    } else {
      setTimeout(typeEffect, isDeleting ? 50 : typingSpeed);
    }
  }

  typeEffect();
});
