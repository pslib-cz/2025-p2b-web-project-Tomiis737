/* Generic slider initializer for carousels and horizontal card galleries */
(function(){
    // Highlight the current page in the header navigation
    const navItems = document.querySelectorAll('.nav__icons .nav__item');
    if(navItems.length){
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const activeMap = {
            'index.html': '.nav__item--home',
            'weapons.html': '.nav__item--weapons',
            'clothing.html': '.nav__item--clothing'
        };

        navItems.forEach(item => item.classList.remove('nav__item--active'));

        const selector = activeMap[currentPath] || '.nav__item--home';
        const activeItem = document.querySelector(selector);
        if(activeItem){
            activeItem.classList.add('nav__item--active');
            const activeLink = activeItem.querySelector('a');
            if(activeLink) activeLink.setAttribute('aria-current', 'page');
        }
    }

    // Carousel slides (hero) initialization — only run if present
    const slides = document.querySelectorAll('.carousel__slide');
    if(slides.length){
        const dots = document.querySelectorAll('.carousel__indicator');
        const prev = document.querySelector('.carousel__button--prev');
        const next = document.querySelector('.carousel__button--next');
        let currentIndex = 0;

        function setSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        if(prev) prev.addEventListener('click', () => setSlide(currentIndex - 1));
        if(next) next.addEventListener('click', () => setSlide(currentIndex + 1));
        dots.forEach((dot, index) => dot.addEventListener('click', () => setSlide(index)));

        let intervalId = setInterval(() => setSlide(currentIndex + 1), 7000);
        const carousel = document.querySelector('.weapon__carousel');
        if(carousel){
            carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
            carousel.addEventListener('mouseleave', () => intervalId = setInterval(() => setSlide(currentIndex + 1), 7000));
        }
    }

    // Make card galleries horizontally scrollable with mouse wheel for convenience
    const galleries = document.querySelectorAll('.card__gallery');
    galleries.forEach(gallery => {
        gallery.style.scrollBehavior = 'smooth';
        gallery.addEventListener('wheel', (e) => {
            if(Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // let native horizontal scroll pass
            e.preventDefault();
            gallery.scrollBy({ left: e.deltaY, behavior: 'smooth' });
        }, { passive: false });
    });
})();
