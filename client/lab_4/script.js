
let slidePosition = 0;
const slides = document.getElementsByClassName('carousel_item');
const totalSlides= slides.length;

document. 
 getElementById('carousel_button--next')
 .addEventListener("click", function()) {
     moveToNextSlide();
 }


 document. 
 getElementById('carousel_button--prev')
 .addEventListener("click", function()) {
     moveToPrevSlide();
 }

 function moveToNextSlide() {
     console.log('hello next');
 }
  
  function moveToPrevSlide() {
      console.log('hello prev ');
  }