(function () {
    var section = document.querySelector('.testi-section');
    if (!section) return;

    var track = section.querySelector('.testi-track');
    var cards = section.querySelectorAll('.testi-card');
    var dotsWrap = section.querySelector('.testi-dots');

    function getPerView() {
        var w = window.innerWidth;
        if (w <= 600) return 1;
        if (w <= 900) return 2;
        return 3;
    }

    var perView = getPerView();
    var index = 0;
    var total = cards.length;
    var maxIndex = Math.max(0, total - perView);
    var autoplayTimer = null;

    function buildDots() {
        dotsWrap.innerHTML = '';
        for (var i = 0; i <= maxIndex; i++) {
            var dot = document.createElement('button');
            dot.className = 'testi-dot' + (i === index ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            (function (i) {
                dot.addEventListener('click', function () {
                    goTo(i);
                    resetAutoplay();
                });
            })(i);
            dotsWrap.appendChild(dot);
        }
    }

    function update() {
        var cardWidth = cards[0].getBoundingClientRect().width;
        var gap = 24; // matches left+right margin (12px each) on .testi-card
        track.style.transform = 'translateX(-' + (index * (cardWidth + gap)) + 'px)';

        var dots = dotsWrap.querySelectorAll('.testi-dot');
        dots.forEach(function (d, i) {
            d.classList.toggle('active', i === index);
        });
    }

    function goTo(i) {
        index = Math.max(0, Math.min(i, maxIndex));
        update();
    }

    function next() {
        index = index >= maxIndex ? 0 : index + 1;
        update();
    }

    function startAutoplay() {
        autoplayTimer = setInterval(next, 4000);
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    window.addEventListener('resize', function () {
        var newPerView = getPerView();
        if (newPerView !== perView) {
            perView = newPerView;
            maxIndex = Math.max(0, total - perView);
            index = Math.min(index, maxIndex);
            buildDots();
        }
        update();
    });

    buildDots();
    update();
    startAutoplay();
})();