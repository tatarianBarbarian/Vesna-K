//First slider (features block)

document.addEventListener("click", e => {
  var targ = e.target;

  if (targ.id.includes("tr")) {
    console.log("a");
    var trValue = parseInt(targ.id.slice(2)) * 500;
    var slides = document.querySelectorAll(".features__slide");

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateY(-${trValue}px)`;
    }

    document
      .querySelector(".features__trigger--active")
      .classList.remove("features__trigger--active");
    targ.classList.add("features__trigger--active");
  }
});

//Second slider (new products block (ps is for 'product slider'))

//1. Define elements
const psBtnPrev = document.querySelector(".prodslider__control--prev");
const psBtnNext = document.querySelector(".prodslider__control--next");
const psSlideWrapper = document.querySelector(".prodslider__slide-wrapper");
const psItems = document.querySelectorAll(".prodslider__item");

let itemsPerSlide = getComputedStyle(document.body).getPropertyValue(
  "--items-per-slide"
);
let slideIndex = 0;
let oneSlideWidth = psSlideWrapper.offsetWidth;
let itemWIdth = oneSlideWidth / itemsPerSlide;
let computedContWidth = itemWIdth * psItems.length;
let totalSlides = Math.floor(computedContWidth / oneSlideWidth);

const initSlider = () => {
  document.body.style.setProperty(
    "--prodslider-wrapper-width",
    `${computedContWidth}px`
  );
  document.body.style.setProperty("--prodslider-item-width", `${itemWIdth}px`);
};

const moveSlider = () => {
  psSlideWrapper.style.transform = `translateX(-${oneSlideWidth *
    slideIndex}px)`;
};

const checkPsButtons = () => {
  if (slideIndex === 0) {
    psBtnPrev.setAttribute("disabled", "true");
  }
  if (slideIndex > 0) {
    psBtnPrev.removeAttribute("disabled");
  }
  if (slideIndex === totalSlides) {
    psBtnNext.setAttribute("disabled", "true");
  }
  if (slideIndex < totalSlides) {
    psBtnNext.removeAttribute("disabled");
  }
};

initSlider();
checkPsButtons();

document.addEventListener("click", e => {
  const targ = e.target;
  if (targ.className.includes("prodslider__control--prev")) {
    slideIndex--;
    moveSlider();
    checkPsButtons();
  } else if (targ.className.includes("prodslider__control--next")) {
    slideIndex++;
    moveSlider();
    checkPsButtons();
  }
});

//Third slider (info)
