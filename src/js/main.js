const locale = document.querySelector('meta[property="locale"]').content;

(() => {
    function executeInQueue(_func, timeout) {
        if (!timeout) timeout = 10;

        try {
            setTimeout(_func, timeout);
        } catch (ex) {
            console.log(ex)
        }
    }

    function bindMenuEvents() {
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        if ($navbarBurgers.length > 0) {

            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }
    }

    function doTransparentHeaderScrolling() {
        const mainMenu = document.getElementsByClassName('navbar')[0];

        function shouldStickyNav() {
            const currentPos = window.scrollY;
            if (currentPos > 40) {
                mainMenu.classList.remove('is-transparent');
            } else {
                mainMenu.classList.add('is-transparent');
            }
        }

        window.addEventListener('scroll', shouldStickyNav);
    }

    function isInViewport(elem) {
        if (elem) {
            const scroll = window.scrollY || window.pageYOffset
            const boundsTop = elem.getBoundingClientRect().top + scroll

            const viewport = {
                top: scroll,
                bottom: scroll + window.innerHeight,
            }

            const bounds = {
                top: boundsTop,
                bottom: boundsTop + elem.clientHeight,
            }

            return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
                (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
        }

        return false;
    }

    function initiateRellax() {
        const hasRellax = document.getElementsByClassName('rellax');

        if (!hasRellax.length) return;

        const rellax = new Rellax('.rellax', {
            speed: -2,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        });
    }

    executeInQueue(bindMenuEvents(), 10);
    executeInQueue(doTransparentHeaderScrolling(), 20);
    executeInQueue(initiateRellax(), 25);
    executeInQueue(bindLtoNodeEvents(), 30);
    executeInQueue(bindCardSliderEvents(), 40);
    executeInQueue(bindHeaderSlider(), 50);
})();
