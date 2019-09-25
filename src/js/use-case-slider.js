function bindCardSliderEvents() {
  const cardSliderSection = document.getElementsByClassName('card-slider-section')[0];

  if (!cardSliderSection) return;

  let currentSlide = 0;
  const cardSliderColumns = cardSliderSection.getElementsByClassName('columns-slider');
  const prevArrow = cardSliderSection.getElementsByClassName('card-slider-action prev')[0];
  const nextArrow = cardSliderSection.getElementsByClassName('card-slider-action next')[0];

  prevArrow.addEventListener('click', previousSlide);
  nextArrow.addEventListener('click', nextSlide);

  function previousSlide() {
    if (currentSlide <= 0) currentSlide = cardSliderColumns.length - 1;
    else currentSlide--;

    setSlide(currentSlide);
    cardSliderColumns[currentSlide === cardSliderColumns.length - 1 ? 0 : currentSlide+1].classList.add('is-exiting', 'left');
  }

  function nextSlide() {
    if (currentSlide >= cardSliderColumns.length - 1) currentSlide = 0;
    else currentSlide++;

    setSlide(currentSlide);
    cardSliderColumns[currentSlide === 0 ? cardSliderColumns.length - 1 : currentSlide-1].classList.add('is-exiting', 'right');
  }

  function setSlide(_index) {
    setTimeout(() => {
      for (let i = 0; i < cardSliderColumns.length; i++) {
        cardSliderColumns[i].classList.remove('is-visible');
        cardSliderColumns[i].classList.remove('is-exiting', 'left', 'right');
      }

      cardSliderColumns[_index].classList.add('is-visible');
    }, 300);
  }
}
