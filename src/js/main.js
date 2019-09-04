(() => {
  function executeInQueue(_func, timeout) {
    if (!timeout) timeout = 10;

    setTimeout(_func, timeout);
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

      console.log(currentPos);

      if (currentPos > 40) {
        mainMenu.classList.remove('is-transparent');
      } else {
        mainMenu.classList.add('is-transparent');
      }
    }

    window.addEventListener('scroll', shouldStickyNav);
  }

  executeInQueue(bindMenuEvents(), 10);
  executeInQueue(doTransparentHeaderScrolling(), 20);
})()