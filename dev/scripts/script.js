const header = document.querySelector("header");

(function () {
    if (!Element.prototype.scrollBy) {
        Element.prototype.scrollBy = function({top, left}) {
            this.scrollLeft += left;
            this.scrollTop += top;
        }
    }

}());

(function () {

    // проверяем поддержку
    if (!Element.prototype.matches) {

        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;

    }

})();

(function () {

    // проверяем поддержку
    if (!Element.prototype.closest) {

        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }

})();

//настраиваем кнопки для картинок реки
const setUpRiverImages = riverImages => {
    const riverImagesContainer = riverImages.querySelector(".river_images_container");

    const marginBetweenImages = 10;

    for (let i = 1; i < riverImagesContainer.children.length; i++) {
        riverImagesContainer.children[i].style.marginLeft = marginBetweenImages + "px";
    }

    const arrowLeft = riverImages.querySelector(".arrow_left");
    const arrowRight = riverImages.querySelector(".arrow_right")

    //проверяет нужно ли показывать кнопки
    const checkWhetherToShowButtons = () => {
        if (riverImagesContainer.scrollLeft === 0) {
            arrowLeft.style.display = "none";
        } else {
            arrowLeft.style.display = "";
        }

        //погрешность 2 пикселя
        if (riverImagesContainer.scrollLeft + riverImagesContainer.clientWidth + 2 >= riverImagesContainer.scrollWidth) {
            arrowRight.style.display = "none";
        } else {
            arrowRight.style.display = "";
        }
    }

    const time = 600;

    const createCallbackEventListenerArrow = (isRightArrow) => {
        const space = riverImagesContainer.clientWidth + marginBetweenImages;

        riverImagesContainer.scrollBy({
            top: 0,
            left: isRightArrow ? space : -1 * space,
            behavior: 'smooth'
        });

        setTimeout(checkWhetherToShowButtons, time);
    }

    const disableEventListener = () => {
        arrowRight.removeEventListener("click", rightCallback);
        arrowLeft.removeEventListener("click", leftCallback);

        setTimeout(() => {
            arrowLeft.addEventListener("click", leftCallback);
            arrowRight.addEventListener("click", rightCallback);
        }, time);
    }

    const leftCallback = () => {
        createCallbackEventListenerArrow(false);
        disableEventListener();
    }

    const rightCallback = () => {
        createCallbackEventListenerArrow(true);
        disableEventListener();
    }

    arrowLeft.addEventListener("click", leftCallback);
    arrowRight.addEventListener("click", rightCallback);

    setTimeout(checkWhetherToShowButtons, time);
}

//задаём событие на кнопки картинок для прокрутки
Array.prototype.forEach.call(document.querySelectorAll(".river_images"), setUpRiverImages);

//задаём событие на открытие меню
document.querySelector(".mobile_icon_menu_button").addEventListener("click", () => {
    header.classList.toggle("open_menu");
});

//закрывает меню если клик (eventElement) произошёл вне меню
const closeMenuIfClickWithout = (eventElement) => {
    if (eventElement.closest("header") === null) {
        header.classList.remove("open_menu");
    }
}

//показывает всплывающее элементы, 
//часть которых помещается в окне
const emergeElements = () => {
    const elements = document.querySelectorAll(".pop_up_element:not(.emerge)");

    for (let i = 0; i < elements.length; i++) {
        const elem = elements[i];

        if (elem.getBoundingClientRect().top > document.documentElement.clientHeight) return;

        elem.classList.add("emerge");
    }
}

//создаёт заголовок реки
const createRiverTitle = (title) => {
    const divTitle = document.createElement("div");
    divTitle.classList.add("river_title");

    const h2 = document.createElement("h2");
    h2.textContent = title;

    divTitle.appendChild(h2);

    return divTitle;
}

//создаёт кнопку для картинок реки
//если isRight === true, то правую, иначе левую
const createButtonForImages = (isRight) => {
    const button = document.createElement("button");
    button.classList.add("river_images_arrow");
    button.classList.add(isRight ? "arrow_right" : "arrow_left");

    const img = document.createElement("img");
    img.src = isRight ? "./img/arrow-right.svg" : "./img/arrow-left.svg";
    img.alt = isRight ? "стрелка вправо" : "стрелка влево";

    button.appendChild(img);

    return button;
}


//создаёт оболочку для картинок реки
const createRiverImages = (images, title) => {
    const divImages = document.createElement("div");
    divImages.classList.add("river_images");

    divImages.appendChild(createButtonForImages(false));
    divImages.appendChild(createButtonForImages(true));

    const divImagesContainer = document.createElement("div");
    divImagesContainer.classList.add("river_images_container");
    divImages.appendChild(divImagesContainer);

    images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = title;

        divImagesContainer.appendChild(img);
    });

    return divImages;
}

//создаёт оболочку для абзацев реки
const createRiverTexts = (texts) => {
    const divTexts = document.createElement("div");
    divTexts.classList.add("river_text");

    texts.forEach(text => {
        const p = document.createElement("p");
        p.textContent = text;

        divTexts.appendChild(p);
    });

    return divTexts;
}

//создаёт оболку реки
const createRiver = (title, images, texts) => {
    const divRiver = document.createElement("div");
    divRiver.classList.add("river");
    divRiver.classList.add("pop_up_element");

    divRiver.appendChild(createRiverTitle(title));
    divRiver.appendChild(createRiverImages(images, title));
    divRiver.appendChild(createRiverTexts(texts));

    return divRiver;
}

const divRivers = document.querySelector(".rivers");

//добавляет новую реку
const addNewRiver = () => {
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    if (window.pageYOffset + document.documentElement.clientHeight + 300 < scrollHeight) return;

    if (store.indexCurrentRiver > store.rivers.length - 1) return;

    const { title, images, texts } = store.rivers[store.indexCurrentRiver];

    store.indexCurrentRiver++;

    const newRiver = createRiver(title, images, texts);
    divRivers.appendChild(newRiver);
    setUpRiverImages(newRiver);
}

window.addEventListener("click", (e) => {
    closeMenuIfClickWithout(e.target);
});

window.addEventListener("scroll", () => {
    emergeElements();
    addNewRiver();
});

window.addEventListener("load", () => {
    emergeElements();
});
