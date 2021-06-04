let pre = document.querySelector("#pre");
let next = document.querySelector("#next");
let initialTranslation = 0;
let card = document.querySelector(".cards");
let container = document.querySelector(".container");
let containerWidth = container.getBoundingClientRect().width;
let cardWidth = card.getBoundingClientRect().width;
let translation = (containerWidth / cardWidth) * cardWidth;
let cards = document.querySelectorAll(".cards");

pre.addEventListener(
  "click",
  throttle(function (e) {
    let startTranslation = initialTranslation;
    if (!isInViewport(cards[0])) initialTranslation += translation;
    if (!isInViewport(cards[0]))
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        backward(card, startTranslation, initialTranslation);
      }
  }, 1000)
);
next.addEventListener(
  "click",
  throttle(function (e) {
    let startTranslation = initialTranslation;
    if (!isInViewport(cards[cards.length - 1]))
      initialTranslation -= translation;
    if (!isInViewport(cards[cards.length - 1]))
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        forward(card, startTranslation, initialTranslation);
      }
  }, 1000)
);

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function forward(elm, ini, fi) {
  setTimeout(function () {
    ini -= 15;
    if (ini >= fi) {
      elm.style.transform = "translateX(" + ini + "px)";
      forward(elm, ini, fi);
    }
  });
}

function backward(elm, ini, fi) {
  setTimeout(function () {
    ini += 15;
    if (ini <= fi) {
      elm.style.transform = "translateX(" + ini + "px)";
      backward(elm, ini, fi);
    }
  });
}

function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    let now = Date.now();
    if (now - last < delay) return;
    last = now;
    fn(...args);
  };
}
