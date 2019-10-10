function bindHeaderSlider() {
  const cardSliderSection = document.getElementsByClassName('use-case-header')[0];

  if (!cardSliderSection) return;
  if (window.innerWidth <= 600) return;

  const headerTitle = cardSliderSection.getElementsByClassName('primary-text')[0];
  const exploreButton = cardSliderSection.getElementsByClassName('explore')[0];
  const btnContainer = cardSliderSection.getElementsByClassName('btn-container')[0];
  const currentImage = cardSliderSection.getElementsByClassName('overlay-image current')[0];
  const nextImage = cardSliderSection.getElementsByClassName('overlay-image next')[0];

  const sliderData = [
    {
      image: '/assets/hero/hero-uc-ilt.png',
      title: 'Saving $7 million annually in process efficiency<br>for the Dutch Ministry of Infrastructure',
      href: '/use-cases/waste-transportation-blockchain/'
    },
    {
      image: '/assets/hero/hero-uc-scantrust.png',
      title: 'The revival of the QR-Code<br>with Blockchain',
      href: '/use-cases/track-trace-product-authentication/'
    },
    {
      image: '/assets/hero/hero-uc-lease.png',
      title: 'Instant verification of certificates<br>on LTO Network',
      href: '/use-cases/smart-property-lease-agreements/'
    }
  ]

  let currentSlide = 0;

  setInterval(() => {
    nextSlide()
  }, 4500);

  function nextSlide() {
    if (currentSlide >= sliderData.length - 1) currentSlide = 0;
    else currentSlide++;

    setSlide(currentSlide);
  }

  function getNextSlide() {
    return currentSlide + 1 >= sliderData.length ? 0 : (currentSlide + 1);
  }

  function setSlide(_index) {
    setTimeout(() => {
      currentImage.classList.add('is-exiting');
      headerTitle.classList.add('is-exiting');
      btnContainer.classList.add('is-exiting');
    }, 100);

    setTimeout(() => {
      headerTitle.classList.remove('is-exiting');
      btnContainer.classList.remove('is-exiting');
      headerTitle.innerHTML = sliderData[_index].title;
      exploreButton.href = sliderData[_index].href;
    }, 650);

    setTimeout(() => {
      currentImage.classList.remove('is-exiting');
      currentImage.src = nextImage.src;
    }, 1500);

    setTimeout(() => {
      nextImage.src = sliderData[getNextSlide()].image;
    }, 2500);
  }
}
