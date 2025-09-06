(function ($) {
    var LOADER_SPEED = 1;

    $(function () {
        var $loader = $('#lottie-loader');
        var loaderAnim = null;

        if ($loader.length && window.lottie) {
            loaderAnim = lottie.loadAnimation({
                container: $loader[0],
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'src/lottie/loading.json',
            });
            if (loaderAnim && typeof loaderAnim.setSpeed === 'function') {
                loaderAnim.setSpeed(LOADER_SPEED);
            }
        }

        var $wrapper = $('.page-wrapper');
        $wrapper.removeClass('fade-in').css('opacity', 0);

        setTimeout(function () {
            if ($loader.length) {
                $loader.fadeOut(500, function () {
                    if (loaderAnim && typeof loaderAnim.destroy === 'function') {
                        loaderAnim.destroy();
                    }
                    $('#preloader').fadeOut(500, function () {
                        $wrapper.addClass('fade-in').css('opacity', '');
                    });
                });
            } else {
                $('#preloader').fadeOut(500, function () {
                    $wrapper.addClass('fade-in').css('opacity', '');
                });
            }
        }, 1500);

        if (!$('#preloader').length) {
            $wrapper.addClass('fade-in').css('opacity', '');
        }
    });

    function drawCircularText() {
        var text = 'WEB PUBLISHER • FRONTEND • JAVASCRIPT • REACT • HTML • CSS • ';
        var chars = text.split('');
        var w = $(window).width();
        var radius = w <= 480 ? 140 : w <= 576 ? 180 : 240;

        var $container = $('#circularText');
        if (!$container.length) return;

        $container.empty();
        var total = chars.length;

        $.each(chars, function (i, ch) {
            var angle = (360 / total) * i;
            $('<span/>', { text: ch })
                .css({
                    transform: 'rotate(' + angle + 'deg) translate(' + radius + 'px) rotate(90deg)',
                })
                .appendTo($container);
        });
    }

    function initTyping() {
        var words = ['CHAE WON', 'WEB DEVELOPER'];
        var currentWord = 0,
            currentChar = 0,
            isDeleting = false;
        var $typing = $('.name .typing');
        if (!$typing.length) return;

        var typingSpeed = 150;
        var pauseTime = 1200;

        function tick() {
            var fullText = words[currentWord];
            var visibleText = isDeleting
                ? fullText.substring(0, currentChar--)
                : fullText.substring(0, currentChar++);

            $typing.text(visibleText);

            if (!isDeleting && currentChar === fullText.length + 1) {
                isDeleting = true;
                setTimeout(tick, pauseTime);
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentWord = (currentWord + 1) % words.length;
                setTimeout(tick, 400);
            } else {
                setTimeout(tick, isDeleting ? 50 : typingSpeed);
            }
        }
        tick();
    }

    function initScrollLottie() {
        var $win = $(window);
        var $lottie = $('.intro .scroll-lottie-01');
        if (!$lottie.length) return;

        var lottieVisible = true;

        $win.on('scroll', function () {
            var scrollTop = $win.scrollTop();
            if (scrollTop > 10 && lottieVisible) {
                lottieVisible = false;
                $lottie.stop(true).fadeOut(600);
            } else if (scrollTop <= 10 && !lottieVisible) {
                lottieVisible = true;
                $lottie.stop(true).fadeIn(600);
            }
        }).trigger('scroll');
    }

    function initSwipers() {
        if (typeof Swiper === 'undefined') return;

        var SPEED = 600;

        var imgSwiper = new Swiper('.img-swiper', {
            loop: true,
            effect: 'cards',
            grabCursor: true,
            speed: SPEED,
            pagination: { el: '.img-swiper .swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.img-swiper .swiper-button-next',
                prevEl: '.img-swiper .swiper-button-prev',
            },
        });

        var descSwiper = new Swiper('.desc-swiper', {
            loop: true,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            allowTouchMove: false,
            speed: SPEED,
        });

        imgSwiper.on('slideChangeTransitionStart', function () {
            descSwiper.slideToLoop(imgSwiper.realIndex, imgSwiper.params.speed, false);
        });

        var imgCount = $(
            '.img-swiper .swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)'
        ).length;
        var descCount = $(
            '.desc-swiper .swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)'
        ).length;
        if (imgCount !== descCount) {
            console.warn(
                '[Works] 슬라이드 개수가 다릅니다. (img:',
                imgCount,
                ', desc:',
                descCount,
                ')'
            );
        }
    }

    function initSectionReveal() {
        var $win = $(window);
        var $sections = $('section');
        if (!$sections.length) return;

        function update() {
            $sections.each(function () {
                var $sec = $(this);
                var $title = $sec.find('.section-title');
                var $desc = $sec.find('.section-desc');

                var winTop = $win.scrollTop();
                var winH = $win.height();
                var winBottom = winTop + winH;

                var rect = $sec[0].getBoundingClientRect();
                var elTop = winTop + rect.top;
                var elBottom = elTop + rect.height;

                var elVisible = Math.max(
                    0,
                    Math.min(winBottom, elBottom) - Math.max(winTop, elTop)
                );
                var visibleRatio = rect.height ? elVisible / rect.height : 0;

                if (visibleRatio >= 0.2) {
                    if ($title.length) $title.addClass('visible');
                    if ($desc.length) $desc.addClass('visible');
                } else {
                    if ($title.length) $title.removeClass('visible');
                    if ($desc.length) $desc.removeClass('visible');
                }
            });
        }

        $win.on('scroll resize', update);
        update();
    }

    $(function () {
        drawCircularText();
        initTyping();
        initScrollLottie();
        initSwipers();
        initSectionReveal();

        $(window).on('resize', function () {
            drawCircularText();
        });
    });
})(jQuery);
