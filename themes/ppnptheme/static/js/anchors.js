(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');

    window.addEventListener('load', () => {
        // adjust anchor position because of top menu
        if (window.location.hash) {
            window.location.href = window.location.hash;
        }

        anchors.forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                document.querySelector(anchor.hash).scrollIntoView({
                    behavior: 'smooth',
                });
            });
        });
    });
})();
