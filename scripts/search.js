(function () {
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }
}());

(function () {
    var search = document.querySelector(".search");

    document.querySelector(".search__button").addEventListener("click", function () {
        search.classList.toggle("search__active");
    });

    var searchInput = document.querySelector(".search__input");

    searchInput.addEventListener("input", function () {
        document.body.scrollTop = 0;

        store.filter = searchInput.value;

        document.querySelector(".rivers").innerHTML = "";

        store.indexCurrentRiver = 0;
        addNewRiver();
    });

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > document.documentElement.clientHeight) {
            search.classList.add("search__white_theme");
        } else {
            search.classList.remove("search__white_theme");
        }
    });
}());
