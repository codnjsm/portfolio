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

// 원형 텍스트 
$(document).ready(function () {
  const text = "WEB PUBLISHER • FRONTEND • JAVASCRIPT • REACT • HTML • CSS • ";
  const chars = text.split("");
  const radius = 240;
  const $container = $("#circularText");
  const total = chars.length;

  chars.forEach((char, i) => {
    const angle = (360 / total) * i;
    const $span = $("<span>").text(char);
    $span.css({
      transform: `rotate(${angle}deg) translate(${radius}px) rotate(${90}deg)`,
    });
    $container.append($span);
  });
});

// 타이핑 효과
$(function () {
  const words = ["CHAE WON","WEB DEVELOPER"];
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