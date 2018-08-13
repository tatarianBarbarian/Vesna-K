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
//1. Define elements
const cnsBtnPrev = document.querySelector(".cn-slider__arr--left");
const cnsBtnNext = document.querySelector(".cn-slider__arr--right");
const cnsSlideWrapper = document.querySelector(".cn-slider__slides-wrapper");
const cnsItems = document.querySelectorAll(".cn-slider__slide");
const cnsBgWrapper = document.querySelector(".cn-slider__square-bg-wrapper");
const cnsControls = document.querySelector(".cn-slider__bullets");

let cnsSlideIndex = 0;

const cnsInitSlider = () => {
  let totalWidth = cnsBgWrapper.offsetWidth * cnsItems.length;
  cnsSlideWrapper.style.width = totalWidth + "px";
};

const cnsInitControls = () => {
  let buttons = [];

  for (let i = 0; i < cnsItems.length; i++) {
    let button = document.createElement("button");
    button.textContent = i < 9 ? `0${i + 1}` : `${i + 1}`;
    button.className = "cn-slider__control";
    button.setAttribute("data-cnslider-index", i);
    if (i === 0) {
      button.classList.add("cn-slider__control--active");
    }
    buttons.push(button);

    buttons.forEach(button => {
      cnsControls.appendChild(button);
    });
  }

  cnsCheckButtons();
};

const cnsMoveSlider = () => {
  cnsSlideWrapper.style.transform = `translateX(-${cnsBgWrapper.offsetWidth *
    cnsSlideIndex}px)`;
  document
    .querySelector(".cn-slider__control--active")
    .classList.remove("cn-slider__control--active");
  let controls = document.querySelectorAll(".cn-slider__control");
  controls[cnsSlideIndex].classList.add("cn-slider__control--active");
};

const cnsCheckButtons = () => {
  if (cnsSlideIndex === 0) {
    cnsBtnPrev.setAttribute("disabled", "true");
  }
  if (cnsSlideIndex > 0) {
    cnsBtnPrev.removeAttribute("disabled");
  }
  if (cnsSlideIndex === cnsItems.length - 1) {
    cnsBtnNext.setAttribute("disabled", "true");
  }
  if (cnsSlideIndex < cnsItems.length - 1) {
    cnsBtnNext.removeAttribute("disabled");
  }
};

document.addEventListener("click", e => {
  let targ = e.target;
  if (targ.className.includes("cn-slider__arr--left")) {
    cnsSlideIndex--;
  } else if (targ.className.includes("cn-slider__arr--right")) {
    cnsSlideIndex++;
  } else if (targ.className.includes("cn-slider__control")) {
    cnsSlideIndex = parseInt(targ.getAttribute("data-cnslider-index"));
  }

  cnsMoveSlider();
  cnsCheckButtons();
});

cnsInitSlider();
cnsInitControls();
