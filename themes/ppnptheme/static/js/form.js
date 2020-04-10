(() => {
    const form = document.querySelector('.contact-form__form');

    const submitButton = document.querySelector('.contact-form__submit');
    const submitButtonValue = submitButton.textContent;

    let resetTimer;
    let resetListener;

    const resetButton = () => {
        if (resetTimer) {
            clearTimeout(resetTimer);
            resetTimer = undefined;
        }

        if (resetListener) {
            submitButton.removeEventListener('focusout', resetListener);
            resetListener = undefined;
        }

        submitButton.classList.remove('contact-form__submit_fail');
        submitButton.classList.remove('contact-form__submit_success');
        submitButton.textContent = submitButtonValue;
    };

    const changeState = (success) => {
        if (success) {
            submitButton.classList.add('contact-form__submit_success');
            form.reset();
        } else {
            submitButton.classList.add('contact-form__submit_fail');
        }
    };

    const send = () => {
        fetch('./handler.php', {
            method: 'POST',
            body: new FormData(form),
        }).then((response) => {
            changeState(response.ok);
            return response.text();
        }).then((html) => {
            submitButton.textContent = html;

            resetListener = submitButton.addEventListener('focusout', resetButton, { once: true });
            resetTimer = setTimeout(resetButton, 2000);
        });
    };

    form.addEventListener('keypress', (e) => {
        if (e.which === 13) {
            e.preventDefault();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        send();
    });
})();
