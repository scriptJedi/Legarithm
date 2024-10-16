/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import {Navigation, Scrollbar} from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
    // Список слайдерів
    // Перевіряємо, чи є слайдер на сторінці
    if (document.querySelector('.team__slider')) { // Вказуємо склас потрібного слайдера
        // Створюємо слайдер
        new Swiper('.team__slider', { // Вказуємо склас потрібного слайдера
            // Підключаємо модулі слайдера
            // для конкретного випадку
            modules: [Navigation, Scrollbar],
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 24,
            //autoHeight: true,
            speed: 800,

            //touchRatio: 0,
            //simulateTouch: false,
            //loop: true,
            //preloadImages: false,
            //lazy: true,

            /*
            // Ефекти
            effect: 'fade',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            */

            // Пагінація
            /*
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            */

            // Скроллбар

            scrollbar: {
                el: '.team__scrollbar',
                draggable: true,
            },


            // Кнопки "вліво/вправо"
            navigation: {
                prevEl: '.team__button-prev',
                nextEl: '.team__button-next',
            },

            // Брейкпоінти
            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                    autoHeight: true,
                },
                480: {
                    slidesPerView: 2.1,
                    spaceBetween: 20,
                    autoHeight: true,
                },
                580: {
                    slidesPerView: 2.4,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            },

            // Події
            on: {}
        });
    }
    if (document.querySelector('.partners__slider')) {
        new Swiper('.partners__slider', {
            modules: [],
            observer: true,
            observeParents: true,
            slidesPerView: 5,
            spaceBetween: 0,
            speed: 800,

            breakpoints: {
                320: {
                    slidesPerView: 1.4,
                    autoHeight: true,
                },
                480: {
                    slidesPerView: 2.1,
                },
                580: {
                    slidesPerView: 2.2,
                },
                768: {
                    slidesPerView: 3.2,
                },
                992: {
                    slidesPerView: 4,
                },
                1200: {
                    slidesPerView: 5,
                },
            },

            on: {}
        });
    }
    if (document.querySelector('.reviews__slider')) { // Вказуємо склас потрібного слайдера
        // Створюємо слайдер
        new Swiper('.reviews__slider', { // Вказуємо склас потрібного слайдера
            // Підключаємо модулі слайдера
            // для конкретного випадку
            modules: [Navigation, Scrollbar],
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 24,
            //autoHeight: true,
            speed: 800,

            //touchRatio: 0,
            //simulateTouch: false,
            //loop: true,
            //preloadImages: false,
            //lazy: true,

            /*
            // Ефекти
            effect: 'fade',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            */

            // Пагінація
            /*
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            */

            // Скроллбар

            scrollbar: {
                el: '.reviews__scrollbar',
                draggable: true,
            },


            // Кнопки "вліво/вправо"
            navigation: {
                prevEl: '.reviews__button-prev',
                nextEl: '.reviews__button-next',
            },

            // Брейкпоінти
            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                    autoHeight: true,
                },
                480: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                    autoHeight: true,
                },
                580: {
                    slidesPerView: 1.8,
                    spaceBetween: 20,
                    autoHeight: true,
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                    autoHeight: true,
                },
                992: {
                    slidesPerView: 3.5,
                    spaceBetween: 24,
                    autoHeight: true,
                },
                1200: {
                    slidesPerView: 3.9,
                    spaceBetween: 24,
                    autoHeight: true,
                },
            },

            // Події
            on: {}
        });
    }
}

// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
    let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
    if (sliderScrollItems.length > 0) {
        for (let index = 0; index < sliderScrollItems.length; index++) {
            const sliderScrollItem = sliderScrollItems[index];
            const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
            const sliderScroll = new Swiper(sliderScrollItem, {
                observer: true,
                observeParents: true,
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: {
                    enabled: true,
                },
                scrollbar: {
                    el: sliderScrollBar,
                    draggable: true,
                    snapOnRelease: false
                },
                mousewheel: {
                    releaseOnEdges: true,
                },
            });
            sliderScroll.scrollbar.updateSize();
        }
    }
}

window.addEventListener("load", function (e) {
    // Запуск ініціалізації слайдерів
    initSliders();
    // Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
    //initSlidersScroll();
});