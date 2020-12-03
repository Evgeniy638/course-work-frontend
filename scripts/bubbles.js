"use strict";

function createBubble(x, y, width, height) {
  var div = document.createElement("div");
  div.innerHTML = '<svg class="bubble" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="-100 -100 770 770" width="640" height="640"><defs><path d="M640 320C640 496.61 496.61 640 320 640C143.39 640 0 496.61 0 320C0 143.39 143.39 0 320 0C496.61 0 640 143.39 640 320Z" id="bXspaWR7h"></path><path d="M84.21 283.73L85.19 272.3L86.48 261.21L88.06 250.44L89.94 240.01L92.13 229.9L94.61 220.13L97.39 210.69L100.47 201.58L103.85 192.8L107.53 184.35L111.5 176.23L115.78 168.45L120.36 160.99L125.23 153.87L130.41 147.07L135.88 140.61L141.66 134.48L147.73 128.68L154.1 123.21L160.78 118.07L167.75 113.26L175.02 108.79L182.59 104.64L190.46 100.82L198.63 97.34L207.09 94.19L215.86 91.37L224.93 88.87L234.29 86.71L243.96 84.89L253.93 83.39L264.19 82.22L274.75 81.38L285.62 80.88L296.78 80.7L308.24 80.86L320 81.35L320 81.35L316.76 82.61L313.55 83.89L310.35 85.19L307.18 86.5L304.02 87.82L300.89 89.16L297.78 90.51L294.68 91.87L291.61 93.26L288.56 94.65L285.53 96.06L282.52 97.49L279.53 98.92L276.56 100.38L273.61 101.85L270.68 103.33L267.78 104.83L264.89 106.34L262.02 107.87L259.18 109.41L256.35 110.96L253.54 112.53L250.76 114.12L248 115.72L245.25 117.33L242.53 118.96L239.83 120.6L237.15 122.26L234.48 123.93L231.84 125.62L229.22 127.32L226.62 129.03L224.04 130.76L221.48 132.51L218.95 134.27L216.43 136.04L213.93 137.83L211.46 139.63L209 141.45L206.56 143.28L202.09 146.72L197.7 150.21L193.37 153.75L189.11 157.34L184.93 160.98L180.81 164.67L176.77 168.41L172.8 172.2L168.89 176.05L165.06 179.94L161.3 183.88L157.61 187.87L153.99 191.91L150.45 196.01L146.97 200.15L143.56 204.34L140.23 208.58L136.96 212.88L133.77 217.22L130.64 221.61L127.59 226.05L124.61 230.55L121.7 235.09L118.86 239.68L116.09 244.33L113.39 249.02L110.77 253.77L108.21 258.56L105.72 263.4L103.31 268.3L100.96 273.24L98.69 278.24L96.49 283.28L94.36 288.38L92.29 293.52L90.3 298.72L88.39 303.96L86.54 309.26L84.76 314.6L83.05 320L83.14 307.58L83.52 295.49L84.21 283.73ZM83.05 320L320 81.35L320 81.35L83.05 320Z" id="gke3uDJc0"></path></defs><g><g><g><use xlink:href="#bXspaWR7h" opacity="1" fill="#000731" fill-opacity="0" stroke="#fff" stroke-width="10" stroke-opacity="1"></use></g><g><use xlink:href="#gke3uDJc0" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#gke3uDJc0" opacity="1" fill-opacity="0" stroke="#000731" stroke-width="1" stroke-opacity="0"></use></g></g></g></g></svg>';

  var svg = div.children[0];

  svg.style.width = width + "px";
  svg.style.height = height + "px";
  svg.style.left = x + "px";
  svg.style.top = y + "px";

  return svg;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomBubbleX(radius) {
  return getRandomNumber(radius * 1.5, document.documentElement.offsetWidth - radius * 1.5);
}

function createAndAddedBubbles() {
  var countBubbles = getRandomNumber(0, 6);

  for (var i = 0; i < countBubbles; i++) {
    (function () {
      var radius = getRandomNumber(10, 20);
      var x = getRandomBubbleX(radius);
      var y = document.documentElement.clientHeight;

      var width = radius * 2;
      var height = width;

      var bubble = createBubble(x, y, width, height);
      var time = getRandomNumber(4, 7);

      bubble.style.transition = "top ".concat(time, "s linear");

      document.querySelector('body').appendChild(bubble);

      setTimeout(function () {
        bubble.style.top = "-50px";
        setTimeout(function () {
          bubble.outerHTML = '';
        }, time * 1000 + 100);
      }, 100);
    }())
  }
}

function addBubbles() {
  if (document.documentElement.clientHeight < window.pageYOffset) {
    createAndAddedBubbles();
    window.removeEventListener("scroll", addBubbles);
    setTimeout(function () {
      window.addEventListener("scroll", addBubbles);
    }, 9000);
  }
}

window.addEventListener("scroll", addBubbles);