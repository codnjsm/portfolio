function drawCircularText() {
    const text = 'WEB PUBLISHER • FRONTEND • JAVASCRIPT • REACT • HTML • CSS • ';
    const chars = text.split('');

    let radius = 240;
    const w = window.innerWidth;

    if (w <= 480) {
        radius = 140;
    } else if (w <= 576) {
        radius = 180;
    } else {
        radius = 240;
    }

    const $container = $('#circularText');
    $container.empty();
    const total = chars.length;

    chars.forEach((char, i) => {
        const angle = (360 / total) * i;
        const $span = $('<span>').text(char);
        $span.css({
            transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`,
        });
        $container.append($span);
    });
}

$(document).ready(function () {
    drawCircularText();

    $(window).on('resize', function () {
        drawCircularText();
    });

    $(function () {
        const words = ['CHAE WON', 'WEB DEVELOPER'];
        let currentWord = 0;
        let currentChar = 0;
        let isDeleting = false;
        const $typing = $('.name .typing');
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

    // scroll lottie
    let lottieVisible = true;
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const $lottie = $('.intro .scroll-lottie-01');

        if (scrollTop > 10 && lottieVisible) {
            lottieVisible = false;
            $lottie.stop().fadeOut(600);
        } else if (scrollTop <= 10 && !lottieVisible) {
            lottieVisible = true;
            $lottie.stop().fadeIn(600);
        }
    });
});

// works swiper
$(function () {
    var SPEED = 600;

    // 왼쪽: 이미지
    var imgSwiper = new Swiper('.img-swiper', {
        loop: true,
        effect: 'cards',
        grabCursor: true,
        speed: SPEED,
        pagination: {
            el: '.img-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.img-swiper .swiper-button-next',
            prevEl: '.img-swiper .swiper-button-prev',
        },
    });

    // 오른쪽: 설명 (이미지에만 조작, 설명은 따라오기만)
    var descSwiper = new Swiper('.desc-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        allowTouchMove: false,
        speed: SPEED,
    });

    // 인덱스 동기화 (loop에서도 안정)
    imgSwiper.on('slideChangeTransitionStart', function () {
        descSwiper.slideToLoop(imgSwiper.realIndex, imgSwiper.params.speed, false);
    });

    // (권장) 슬라이드 개수/순서 확인
    var imgCount = document.querySelectorAll(
        '.img-swiper .swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)'
    ).length;
    var descCount = document.querySelectorAll(
        '.desc-swiper .swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)'
    ).length;
    if (imgCount !== descCount) {
        console.warn(
            '[Works] 슬라이드 개수가 다릅니다. 동기화 정확도를 위해 개수/순서를 맞추세요. (img:',
            imgCount,
            ', desc:',
            descCount,
            ')'
        );
    }
});
