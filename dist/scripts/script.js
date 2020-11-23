"use strict";

var header = document.querySelector("header");

(function () {
  if (!Element.prototype.scrollBy) {
    Element.prototype.scrollBy = function (_ref) {
      var top = _ref.top,
          left = _ref.left;
      this.scrollLeft += left;
      this.scrollTop += top;
    };
  }
})();

(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})();

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); //настраиваем кнопки для картинок реки


var setUpRiverImages = function setUpRiverImages(riverImages) {
  var riverImagesContainer = riverImages.querySelector(".river_images_container");
  var marginBetweenImages = 10;

  for (var i = 1; i < riverImagesContainer.children.length; i++) {
    riverImagesContainer.children[i].style.marginLeft = marginBetweenImages + "px";
  }

  var arrowLeft = riverImages.querySelector(".arrow_left");
  var arrowRight = riverImages.querySelector(".arrow_right"); //проверяет нужно ли показывать кнопки

  var checkWhetherToShowButtons = function checkWhetherToShowButtons() {
    if (riverImagesContainer.scrollLeft === 0) {
      arrowLeft.style.display = "none";
    } else {
      arrowLeft.style.display = "";
    } //погрешность 2 пикселя


    if (riverImagesContainer.scrollLeft + riverImagesContainer.clientWidth + 2 >= riverImagesContainer.scrollWidth) {
      arrowRight.style.display = "none";
    } else {
      arrowRight.style.display = "";
    }
  };

  var time = 600;

  var createCallbackEventListenerArrow = function createCallbackEventListenerArrow(isRightArrow) {
    var space = riverImagesContainer.clientWidth + marginBetweenImages;
    riverImagesContainer.scrollBy({
      top: 0,
      left: isRightArrow ? space : -1 * space,
      behavior: 'smooth'
    });
    setTimeout(checkWhetherToShowButtons, time);
  };

  var disableEventListener = function disableEventListener() {
    arrowRight.removeEventListener("click", rightCallback);
    arrowLeft.removeEventListener("click", leftCallback);
    setTimeout(function () {
      arrowLeft.addEventListener("click", leftCallback);
      arrowRight.addEventListener("click", rightCallback);
    }, time);
  };

  var leftCallback = function leftCallback() {
    createCallbackEventListenerArrow(false);
    disableEventListener();
  };

  var rightCallback = function rightCallback() {
    createCallbackEventListenerArrow(true);
    disableEventListener();
  };

  arrowLeft.addEventListener("click", leftCallback);
  arrowRight.addEventListener("click", rightCallback);
  setTimeout(checkWhetherToShowButtons, time);
}; //задаём событие на кнопки картинок для прокрутки


Array.prototype.forEach.call(document.querySelectorAll(".river_images"), setUpRiverImages); //задаём событие на открытие меню

document.querySelector(".mobile_icon_menu_button").addEventListener("click", function () {
  header.classList.toggle("open_menu");
}); //закрывает меню если клик (eventElement) произошёл вне меню

var closeMenuIfClickWithout = function closeMenuIfClickWithout(eventElement) {
  if (eventElement.closest("header") === null) {
    header.classList.remove("open_menu");
  }
}; //показывает всплывающее элементы, 
//часть которых помещается в окне


var emergeElements = function emergeElements() {
  var elements = document.querySelectorAll(".pop_up_element:not(.emerge)");

  for (var i = 0; i < elements.length; i++) {
    var elem = elements[i];
    if (elem.getBoundingClientRect().top > document.documentElement.clientHeight) return;
    elem.classList.add("emerge");
  }
}; //создаёт заголовок реки


var createRiverTitle = function createRiverTitle(title) {
  var divTitle = document.createElement("div");
  divTitle.classList.add("river_title");
  var h2 = document.createElement("h2");
  h2.textContent = title;
  divTitle.appendChild(h2);
  return divTitle;
}; //создаёт кнопку для картинок реки
//если isRight === true, то правую, иначе левую


var createButtonForImages = function createButtonForImages(isRight) {
  var button = document.createElement("button");
  button.classList.add("river_images_arrow");
  button.classList.add(isRight ? "arrow_right" : "arrow_left");
  var img = document.createElement("img");
  img.src = isRight ? "./img/arrow-right.svg" : "./img/arrow-left.svg";
  img.alt = isRight ? "стрелка вправо" : "стрелка влево";
  button.appendChild(img);
  return button;
}; //создаёт оболочку для картинок реки


var createRiverImages = function createRiverImages(images, title) {
  var divImages = document.createElement("div");
  divImages.classList.add("river_images");
  divImages.appendChild(createButtonForImages(false));
  divImages.appendChild(createButtonForImages(true));
  var divImagesContainer = document.createElement("div");
  divImagesContainer.classList.add("river_images_container");
  divImages.appendChild(divImagesContainer);
  images.forEach(function (image) {
    var img = document.createElement("img");
    img.src = image;
    img.alt = title;
    divImagesContainer.appendChild(img);
  });
  return divImages;
}; //создаёт оболочку для абзацев реки


var createRiverTexts = function createRiverTexts(texts) {
  var divTexts = document.createElement("div");
  divTexts.classList.add("river_text");
  texts.forEach(function (text) {
    var p = document.createElement("p");
    p.textContent = text;
    divTexts.appendChild(p);
  });
  return divTexts;
}; //создаёт оболку реки


var createRiver = function createRiver(title, images, texts) {
  var divRiver = document.createElement("div");
  divRiver.classList.add("river");
  divRiver.classList.add("pop_up_element");
  divRiver.appendChild(createRiverTitle(title));
  divRiver.appendChild(createRiverImages(images, title));
  divRiver.appendChild(createRiverTexts(texts));
  return divRiver;
};

var divRivers = document.querySelector(".rivers"); //добавляет новую реку

var addNewRiver = function addNewRiver() {
  var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  if (window.pageYOffset + document.documentElement.clientHeight + 300 < scrollHeight) return;
  if (store.indexCurrentRiver > store.rivers.length - 1) return;
  var _store$rivers$store$i = store.rivers[store.indexCurrentRiver],
      title = _store$rivers$store$i.title,
      images = _store$rivers$store$i.images,
      texts = _store$rivers$store$i.texts;
  store.indexCurrentRiver++;
  var newRiver = createRiver(title, images, texts);
  divRivers.appendChild(newRiver);
  setUpRiverImages(newRiver);
};

window.addEventListener("click", function (e) {
  closeMenuIfClickWithout(e.target);
});
window.addEventListener("scroll", function () {
  emergeElements();
  addNewRiver();
});
window.addEventListener("load", function () {
  emergeElements();
});