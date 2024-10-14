// Підключення функціоналу "Чертоги Фрілансера"
import {bodyLock, bodyUnlock, isMobile, _slideUp, _slideDown, _slideToggle} from "./functions.js";
// Підключення списку активних модулів
import {flsModules} from "./modules.js";

// Menu ==================================================================================================================
function initMenuFunctionality() {
    const menu = document.querySelector('.menu');
    const iconMenu = document.querySelector('.icon-menu');

    if (!menu) return;

    const menuItems = menu.querySelectorAll('.menu__item_submenu');
    const submenuLinks = menu.querySelectorAll('.submenu__link');
    const backButtons = menu.querySelectorAll('.menu__back');

    let activeSubmenu = null;
    let activeSubsubmenu = null;

    function removeActiveClassFromAll() {
        submenuLinks.forEach(link => link.classList.remove('_active'));
    }

    function updateDesktopMenuOpenClass() {
        if (!isMobile.any()) {
            const hasOpenMenu = document.querySelector('.menu__submenu._show') ||
                document.querySelector('.menu__subsubmenu._show');
            if (hasOpenMenu) {
                document.documentElement.classList.add('menu-open');
            } else {
                document.documentElement.classList.remove('menu-open');
            }
        }
    }

    function handleBackButton(menu) {
        if (!menu) return;

        if (menu.classList.contains('menu__subsubmenu')) {
            menu.classList.remove('_show');
            activeSubsubmenu = null;
            removeActiveClassFromAll();
        } else if (menu.classList.contains('menu__submenu')) {
            if (activeSubsubmenu) {
                handleBackButton(activeSubsubmenu);
            } else {
                menu.classList.remove('_show');
                activeSubmenu = null;
            }
        }
    }

    function closeMenu(menu, isBackButton = false) {
        if (!menu) return;

        if (isMobile.any() && isBackButton) {
            handleBackButton(menu);
            return;
        }

        menu.classList.remove('_show');

        if (isMobile.any()) {
            if (menu.classList.contains('menu__body')) {
                if (activeSubsubmenu) {
                    closeMenu(activeSubsubmenu);
                }
                activeSubmenu = null;
                if (!document.querySelector('.menu__submenu._show') &&
                    !document.querySelector('.menu__subsubmenu._show')) {
                    bodyUnlock();
                    document.documentElement.classList.remove('menu-open');
                }
            } else if (menu.classList.contains('menu__subsubmenu')) {
                activeSubsubmenu = null;
                removeActiveClassFromAll();
            }
        } else {
            if (menu.classList.contains('menu__submenu')) {
                if (activeSubsubmenu) {
                    closeMenu(activeSubsubmenu);
                }
                activeSubmenu = null;
            } else if (menu.classList.contains('menu__subsubmenu')) {
                activeSubsubmenu = null;
                removeActiveClassFromAll();
            }
            updateDesktopMenuOpenClass();
        }
    }

    function closeAllMenus() {
        if (activeSubsubmenu) {
            closeMenu(activeSubsubmenu);
        }
        if (activeSubmenu) {
            closeMenu(activeSubmenu);
        }
        removeActiveClassFromAll();
        bodyUnlock();
        document.documentElement.classList.remove('menu-open');
        iconMenu?.classList.remove('_active');
    }

    function openMenu(menu) {
        if (!menu) return;

        const isSubmenu = menu.classList.contains('menu__submenu');
        const isSubsubmenu = menu.classList.contains('menu__subsubmenu');

        menu.classList.add('_show');

        if (isMobile.any()) {
            if (isSubmenu) {
                activeSubmenu = menu;
                bodyLock();
                document.documentElement.classList.add('menu-open');
            } else if (isSubsubmenu) {
                activeSubsubmenu = menu;
                removeActiveClassFromAll();
                const parentLink = menu.previousElementSibling;
                if (parentLink?.classList.contains('submenu__link')) {
                    parentLink.classList.add('_active');
                }
            }
        } else {
            if (isSubmenu) {
                if (activeSubmenu && activeSubmenu !== menu) {
                    closeMenu(activeSubmenu);
                }
                activeSubmenu = menu;
            } else if (isSubsubmenu) {
                if (activeSubsubmenu && activeSubsubmenu !== menu) {
                    closeMenu(activeSubsubmenu);
                }
                activeSubsubmenu = menu;
                removeActiveClassFromAll();
                const parentLink = menu.previousElementSibling;
                if (parentLink?.classList.contains('submenu__link')) {
                    parentLink.classList.add('_active');
                }
            }
            updateDesktopMenuOpenClass();
        }
    }

    // Event Listeners
    backButtons.forEach(button => {
        button?.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentMenu = button.closest('.menu__submenu, .menu__subsubmenu');
            if (parentMenu) {
                handleBackButton(parentMenu);
            }
        });
    });

    menuItems.forEach(item => {
        const submenu = item.querySelector('.menu__submenu');
        item?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeSubmenu === submenu) {
                closeMenu(activeSubmenu);
            } else {
                if (activeSubmenu && !isMobile.any()) closeMenu(activeSubmenu);
                if (activeSubsubmenu) closeMenu(activeSubsubmenu);
                openMenu(submenu);
            }
        });
    });

    submenuLinks.forEach(link => {
        const subsubmenu = link.nextElementSibling;
        link?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeSubsubmenu === subsubmenu) {
                closeMenu(activeSubsubmenu);
            } else {
                if (activeSubsubmenu) closeMenu(activeSubsubmenu);
                openMenu(subsubmenu);
            }
        });
    });

    if (iconMenu) {
        iconMenu.addEventListener('click', function (e) {
            if (document.documentElement.classList.contains('menu-open')) {
                closeAllMenus();
            } else {
                bodyLock();
                document.documentElement.classList.add('menu-open');
                this.classList.add('_active');
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (menu && iconMenu && !menu.contains(e.target) && !iconMenu.contains(e.target)) {
            closeAllMenus();
        }
    });
}

// Language selector ==================================================================================================================
function initLangSelector(selector) {
    const langSelector = document.querySelector(selector);
    if (!langSelector) return;

    const currentLang = langSelector.querySelector('.current-lang');
    const dropdown = langSelector.querySelector('.lang-dropdown');
    const options = langSelector.querySelectorAll('.lang-option');

    const isMobileDevice = window.matchMedia("(max-width: 991.98px)").matches;

    if (isMobileDevice && dropdown) {
        langSelector.addEventListener('click', function (e) {
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!langSelector.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    options.forEach(option => {
        option?.addEventListener('click', function (e) {
            e.stopPropagation();
            const langCode = this.getAttribute('data-lang');
            if (currentLang && langCode) {
                currentLang.textContent = langCode;
                dropdown?.classList.remove('active');
            }
        });
    });
}

// Footer spollers ==================================================================================================================
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }

    // Получение слойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
        return item.dataset.spollers.split(",")[0];
    });

    // Инициализация слойлеров с медиа запросами
    if (spollersMedia.length > 0) {
        const breakpointsArray = [];
        spollersMedia.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        // Получаем уникальные брейкпоинты
        let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });

        // Работаем с каждым брейкпоинтом
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            // Объекты с нужными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });
            // Событие
            matchMedia.addListener(function () {
                initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }

    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        });
    }

    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }

    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }

    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}

// Counter ==================================================================================================================
function numberItems(sectionSelector, itemsSelector, innerSelector, useParentheses = false, useDot = false) {
    const section = document.querySelector(sectionSelector);

    if (section) {
        const items = section.querySelectorAll(itemsSelector);

        if (items.length > 0) {
            items.forEach((item, index) => {
                const numberElement = item.querySelector(innerSelector);
                if (numberElement) {
                    const number = index + 1;
                    let formattedNumber = number.toString().padStart(2, '0');

                    if (useParentheses) {
                        formattedNumber = `(${formattedNumber})`;
                    }
                    if (useDot) {
                        formattedNumber = `${formattedNumber}.`;
                    }

                    numberElement.textContent = formattedNumber;
                }
            });
        }
    }
}

// Progress line ==================================================================================================================
function initializeProgressTracking(containerSelector, progressLineSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    const progressLine = document.querySelector(progressLineSelector);
    const steps = container.querySelectorAll('.company-start__step');

    if (!container || !progressLine || steps.length === 0) {
        return;
    }

    // Default options
    const defaultOptions = {
        startOffset: 0.3, // Start progress when the container is 50% in view by default
        endOffset: 0.6 // End progress when the container is fully scrolled out of view
    };

    // Merge default options with user-provided options
    const settings = {...defaultOptions, ...options};

    function updateProgress() {
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;

        // Calculate the progress
        let progress;
        const startPoint = windowHeight * (1 - settings.startOffset);
        const endPoint = -containerHeight * settings.endOffset;

        if (containerTop > startPoint) {
            progress = 0;
        } else if (containerTop < endPoint) {
            progress = 100;
        } else {
            progress = ((startPoint - containerTop) / (startPoint - endPoint)) * 100;
        }

        progressLine.style.setProperty('--progress', `${progress}%`);
    }

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();
}

// Initialization ===================================================================================================================
document.addEventListener('DOMContentLoaded', () => {
    initMenuFunctionality();
    initLangSelector('.header__lang');
    initLangSelector('.footer__lang');
    numberItems(
        '.strengths',
        '.item-strengths',
        '.item-strengths__number',
        true,  // use parentheses
        false  // don't use dot
    );
    numberItems(
        '.workflow',
        '.workflow__item',
        '.workflow__number',
        false,  // don't use parentheses
        true    // use dot
    );
    numberItems(
        '.requirements',
        '.item-requirements',
        '.item-requirements__number',
        true,
        false
    );
    numberItems(
        '.start-company',
        '.company-start__step',
        '.company-start__step-number',
        false,
        false
    );
    initializeProgressTracking('.company-start__steps', '.company-start__progress-line');

});