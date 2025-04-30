document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100; // Calcula el desplazamiento en porcentaje
        carousel.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Opcional: Cambio automático cada 5 segundos
    setInterval(function () {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);
});