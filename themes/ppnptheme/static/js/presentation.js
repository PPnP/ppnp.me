(() => {
    const slides = document.querySelectorAll('.presentation__slide');
    const bar = document.querySelector('.presentation__progress');

    let currentSlide = 0;

    const updateProgress = () => {
        const progress = currentSlide / (slides.length - 1);
        bar.style.transform = `scaleX(${progress})`;
    };

    const nextPage = () => {
        if (currentSlide + 1 >= slides.length) {
            return;
        }

        slides[currentSlide].style.display = 'none';
        currentSlide += 1;
        slides[currentSlide].style.display = 'block';

        updateProgress();
    };

    const prevPage = () => {
        if (currentSlide - 1 < 0) {
            return;
        }

        slides[currentSlide].style.display = 'none';
        currentSlide -= 1;
        slides[currentSlide].style.display = 'block';

        updateProgress();
    };

    const shortcuts = (event) => {
        if (event.key === 'ArrowRight') {
            nextPage();
        } else if (event.key === 'ArrowLeft') {
            prevPage();
        }
    };

    document.querySelector('.presentation__button_prev').addEventListener('click', prevPage);
    document.querySelector('.presentation__button-area_prev').addEventListener('click', prevPage);
    document.querySelector('.presentation__button_next').addEventListener('click', nextPage);
    document.querySelector('.presentation__button-area_next').addEventListener('click', nextPage);
    document.addEventListener('keyup', shortcuts);

    window.addEventListener("load", () => {
        for (let i = 1; i < slides.length; i += 1) {
            slides[i].style.display = 'none';
        }
    });
})();
