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
                if (node.matches(css)) {
                    return node;
                }
                else {
                    node = node.parentElement;
                }
            }

            return null;
        }
    }
})();


var header = document.querySelector("header");

//задаём событие на открытие меню
document.querySelector(".mobile_icon_menu_button").addEventListener("click", function () {
    header.classList.toggle("open_menu");
});

//закрывает меню если клик (eventElement) произошёл вне меню
var closeMenuIfClickWithout = function closeMenuIfClickWithout(eventElement) {
    if (eventElement.closest("header") === null) {
        header.classList.remove("open_menu");
    }
}

window.addEventListener("click", function (e) {
    closeMenuIfClickWithout(e.target);
});
