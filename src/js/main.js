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
      if (currentPos > 40) {
        mainMenu.classList.remove('is-transparent');
      } else {
        mainMenu.classList.add('is-transparent');
      }
    }

    window.addEventListener('scroll', shouldStickyNav);
  }

  function isInViewport(elemName) {
    let elem = document.getElementById(elemName);
    let bounding = elem.getBoundingClientRect();
    const viewHeight = (window.innerHeight || document.documentElement.clientHeight)
    return (
        (bounding.top >= 0 && bounding.top <= viewHeight)
        ||
        (bounding.bottom <= viewHeight && bounding.bottom>= 0)
    );
  };


  let scrollDown = 0;
  let lastScrollTop = 0;
  window.addEventListener("scroll", function(){
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
    scrollDown = false;
    } else {
      scrollDown = true;
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);

  function doParallaxScrolling() {
    const publicChain = document.getElementById('public-chain');
    const privateChain = document.getElementById('private-chain');
    const publicOriginalTop = publicChain.offsetTop;
    const privateOriginalTop = privateChain.offsetTop;
    let publicCurrentTop = publicOriginalTop;
    let privateCurrentTop = privateOriginalTop;

    function parallaxScroll () {
      const inViewport = isInViewport('why-hybrid-blockchain-section');
      const scrollUp = !scrollDown;
      if (inViewport) {
        if (scrollDown && publicCurrentTop > -400) {
          ballsFlyAway();
        }
        else if (scrollUp && publicCurrentTop < publicOriginalTop){
          ballsComeBack();
        }
      }
    };

    function ballsFlyAway () {
      publicCurrentTop -= 14;
      privateCurrentTop += 14;
      publicChain.style.top = publicCurrentTop.toString() + "px";
      privateChain.style.top = privateCurrentTop.toString() + "px";
    };

    function ballsComeBack () {
      publicCurrentTop += 14;
      privateCurrentTop -= 14;
      publicChain.style.top = publicCurrentTop.toString() + "px";
      privateChain.style.top = privateCurrentTop.toString() + "px";
    };


    window.addEventListener('scroll', parallaxScroll);
  };

  // window.addEventListener('scroll', function() {
  //   console.log(isInViewport('why-hybrid-blockchain-section'))
  // });

  executeInQueue(bindMenuEvents(), 10);
  executeInQueue(doTransparentHeaderScrolling(), 20);
  executeInQueue(doParallaxScrolling(), 30);
})()
