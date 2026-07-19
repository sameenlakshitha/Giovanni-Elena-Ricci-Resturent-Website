document.addEventListener('DOMContentLoaded', () => {
    /* ── 1. Loading Screen ────────────────────────────────────────── */
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Dismiss loading screen after animations (approx 2.5s)
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2500);
    }

    /* ── 2. Custom Cursor ─────────────────────────────────────────── */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            if (!cursorDot || !cursorRing) return;
            
            // Fast follow for dot
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            // Slight delay for ring
            setTimeout(() => {
                cursorRing.style.left = `${e.clientX}px`;
                cursorRing.style.top = `${e.clientY}px`;
            }, 50);
        });

        // Expand cursor on interactive elements
        const interactables = document.querySelectorAll('a, button, input, select, textarea, .food-card, .category-card, .gallery-item, .chef-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorRing) cursorRing.classList.add('expanded');
                if (cursorDot) cursorDot.style.opacity = '0';
            });
            el.addEventListener('mouseleave', () => {
                if (cursorRing) cursorRing.classList.remove('expanded');
                if (cursorDot) cursorDot.style.opacity = '1';
            });
        });
    }

    /* ── 3. Scroll Progress & Navbar & Floating Buttons ────────────── */
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const floatingCta = document.getElementById('floatingCta');
    const backToTop = document.getElementById('backToTop');

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (floatingCta) {
            if (scrollTop > 500) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        }

        if (backToTop) {
            if (scrollTop > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init on load

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ── 4. Mobile Menu ───────────────────────────────────────────── */
    const navHamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');

    if (navHamburger && mobileMenu) {
        const toggleMenu = () => {
            navHamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        };

        navHamburger.addEventListener('click', toggleMenu);

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navHamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ── 5. Day / Dinner Mode Toggle ──────────────────────────────── */
    const modeToggle = document.getElementById('modeToggle');
    const modeToggleLabel = document.querySelector('.mode-toggle-label');
    const modeToggleIcon = document.querySelector('.mode-toggle-icon');

    // Default to dinner mode for the luxury feel
    document.body.classList.add('dinner-mode');
    if (modeToggleLabel) modeToggleLabel.textContent = 'Dinner Mode';
    if (modeToggleIcon) modeToggleIcon.textContent = '🌙';

    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dinner-mode');
            const isDinner = document.body.classList.contains('dinner-mode');
            
            if (modeToggleLabel) {
                modeToggleLabel.textContent = isDinner ? 'Dinner Mode' : 'Day Mode';
            }
            if (modeToggleIcon) {
                modeToggleIcon.textContent = isDinner ? '🌙' : '☀️';
            }
        });
    }

    /* ── 6. Scroll Reveal Animations ──────────────────────────────── */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ── 7. Stats Counter Animation ───────────────────────────────── */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const startCounting = () => {
        if (hasCounted) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = Math.ceil(target / (duration / 16)); // ~60fps
            let current = 0;
            
            const suffix = target === 850 || target === 120 || target === 15 ? '+' : '';
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    stat.textContent = target + suffix;
                } else {
                    stat.textContent = current + suffix;
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        });
        
        hasCounted = true;
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounting();
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ── 8. Menu Filtering ────────────────────────────────────────── */
    const filterBtns = document.querySelectorAll('.menu-filter-btn');
    const foodCards = document.querySelectorAll('.food-card');

    if (filterBtns.length > 0 && foodCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                foodCards.forEach(card => {
                    // Reset animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            // Trigger reflow
                            void card.offsetWidth;
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300); // Wait for fade out
                });
            });
        });
    }

    /* ── 9. Testimonial Carousel ──────────────────────────────────── */
    const testiTrack = document.getElementById('testiTrack');
    const testiDotsContainer = document.getElementById('testiDots');
    
    if (testiTrack && testiDotsContainer) {
        const cards = Array.from(testiTrack.children);
        const cardCount = cards.length;
        let currentIndex = 0;
        let cardsPerView = getCardsPerView();
        let maxIndex = Math.max(0, cardCount - cardsPerView);
        let autoplayInterval;

        function getCardsPerView() {
            if (window.innerWidth <= 768) return 1;
            return 3;
        }

        // Initialize dots
        function initDots() {
            testiDotsContainer.innerHTML = '';
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('button');
                dot.className = `testi-dot ${i === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoplay();
                });
                testiDotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = testiDotsContainer.querySelectorAll('.testi-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            
            // Calculate width including gap
            // Using a simple percentage-based approach for flexibility
            const transformPercent = currentIndex * (100 / cardsPerView);
            
            testiTrack.style.transform = `translateX(-${transformPercent}%)`;
            updateDots();
        }

        function nextSlide() {
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + 1);
            }
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Handle resize
        window.addEventListener('resize', () => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                maxIndex = Math.max(0, cardCount - cardsPerView);
                initDots();
                goToSlide(Math.min(currentIndex, maxIndex));
            } else {
                goToSlide(currentIndex); // Recalculate positions
            }
        });

        // Pause on hover
        testiTrack.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        testiTrack.addEventListener('mouseleave', startAutoplay);

        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        testiTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoplayInterval);
        }, { passive: true });

        testiTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) {
                nextSlide(); // Swipe left
            }
            if (touchEndX > touchStartX + threshold) {
                // Swipe right
                if (currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                } else {
                    goToSlide(maxIndex);
                }
            }
        }

        // Initialize
        initDots();
        goToSlide(0);
        startAutoplay();
    }
});
