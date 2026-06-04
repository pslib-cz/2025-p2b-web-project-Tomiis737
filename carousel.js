(function(){
    const slides = document.querySelectorAll('.carousel__slide');
    const dots = document.querySelectorAll('.carousel__indicator');
    const prev = document.querySelector('.carousel__button--prev');
    const next = document.querySelector('.carousel__button--next');
    let currentIndex = 0;

    function setSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    prev.addEventListener('click', () => setSlide(currentIndex - 1));
    next.addEventListener('click', () => setSlide(currentIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => setSlide(index)));

    let intervalId = setInterval(() => setSlide(currentIndex + 1), 7000);
    const carousel = document.querySelector('.weapon__carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', () => intervalId = setInterval(() => setSlide(currentIndex + 1), 7000));
})();
