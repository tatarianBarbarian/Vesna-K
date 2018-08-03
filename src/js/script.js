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
