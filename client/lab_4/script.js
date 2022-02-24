let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item');
const totalSlides = slides.length;
const next = document.querySelector('#carousel_button--next');
const prev = document.querySelector('#carousel_button--prev');
next.addEventListener('click', () => {
  // eslint-disable-next-line no-use-before-define
  moveToNextSlide();
});
next.addEventListener('click', () => {
  prev.classList.remove('button-click');
  next.classList.add('button-click');
});
prev.addEventListener('click', () => {
  next.classList.remove('button-click');
  prev.classList.add('button-click');
});
document 
  .querySelector('#carousel_button--prev')
  .addEventListener('click', () => {
    // eslint-disable-next-line no-use-before-define
    moveToPrevSlide();
  });

function updateSlidePosition() {
  // eslint-disable-next-line no-restricted-syntax
  for (const slide of slides) {
    slide.classList.remove('carousel_item--visible');
    slide.classList.add('carousel_item--hidden');
  }
  slides[slidePosition].classList.add('carousel_item--visible');
}

function moveToNextSlide() {
  if (slidePosition === totalSlides- 1) {
    slidePosition = 0;
  } else {
    // eslint-disable-next-line no-plusplus
    slidePosition++;
  }
  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides-1;
  } else {
    // eslint-disable-next-line no-plusplus
    slidePosition--;
  }
  updateSlidePosition();
}