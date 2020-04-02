(() => {
    const transitionDuration = getComputedStyle(document.documentElement).getPropertyValue('--transition-duration');

    const header = document.querySelector('.header');
    const menu = document.querySelector('.top-menu');
    const menuButton = document.querySelector('.hamburger');
    const afterHeader = document.querySelectorAll('.header ~ *');
    const afterMargin = parseInt(window.getComputedStyle(afterHeader[0]).marginTop, 10);

    /**
     * Moves content as menu opens
     */
    const expandMenuSpace = () => {
        let translateValue = 0;

        if (afterMargin) {
            translateValue = `${afterMargin}px`;
        }

        afterHeader.forEach((element) => {
            const el = element;

            el.style.transition = `transform ${transitionDuration} linear`;
            el.style.transform = `translateY(${translateValue})`;
        });

        document.body.style.height = 'auto';
    };

    /**
     * Moves content up as menu closes
     */
    const collapseMenuSpace = () => {
        const spaceToCollapse = document.body.scrollHeight - menu.clientHeight - afterMargin;
        document.body.style.height = `${spaceToCollapse}px`;

        afterHeader.forEach((element) => {
            const el = element;
            el.style.transform = `translateY(-${menu.clientHeight}px)`;
        });
    };

    /**
     * Shows or hides top menu
     */
    const toggleMenu = () => {
        const result = menuButton.classList.toggle('hamburger_active');

        if (result) {
            expandMenuSpace();
        } else {
            collapseMenuSpace();
        }

        header.classList.toggle('header_expanded');
    };

    window.addEventListener('load', () => {
        menu.style.display = 'grid';

        menuButton.addEventListener('click', toggleMenu);
        collapseMenuSpace();

        // adjust anchor position
        if (window.location.hash) {
            window.location.href = window.location.hash;
        }

        // hide menu and move elements as window resizes
        new ResizeObserver(() => {
            if (header.className.includes('expanded')) {
                toggleMenu();
            }

            collapseMenuSpace();
        }).observe(menu);
    });
})();
