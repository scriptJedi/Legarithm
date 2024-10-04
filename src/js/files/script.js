// Підключення функціоналу "Чертоги Фрілансера"
import {bodyLock, bodyUnlock, isMobile} from "./functions.js";
// Підключення списку активних модулів
import {flsModules} from "./modules.js";

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');
    const menuItems = document.querySelectorAll('.menu__item_submenu');
    const submenuLinks = document.querySelectorAll('.submenu__link');
    const backButtons = document.querySelectorAll('.menu__back');
    const iconMenu = document.querySelector('.icon-menu');
    let activeSubmenu = null;
    let activeSubsubmenu = null;

    function closeMenu(menu, isBackButton = false) {
        if (menu) {
            menu.classList.remove('_show');
            if (menu.classList.contains('menu__submenu')) {
                // Если это не клик по кнопке back, закрываем subsubmenu
                if (!isBackButton && activeSubsubmenu) {
                    closeMenu(activeSubsubmenu);
                }
                activeSubmenu = null;
                // Только если нет активных подменю и это не клик по кнопке back, убираем общие классы
                if (!isBackButton &&
                    !document.querySelector('.menu__submenu._show') &&
                    !document.querySelector('.menu__subsubmenu._show')) {
                    bodyUnlock();
                    document.documentElement.classList.remove('menu-open');
                }
            } else if (menu.classList.contains('menu__subsubmenu')) {
                activeSubsubmenu = null;
                const parentLink = menu.previousElementSibling;
                if (parentLink && parentLink.classList.contains('submenu__link')) {
                    parentLink.classList.remove('_active');
                }
            }
        }
    }

    function closeAllMenus() {
        if (activeSubsubmenu) {
            closeMenu(activeSubsubmenu);
        }
        if (activeSubmenu) {
            closeMenu(activeSubmenu);
        }
        bodyUnlock();
        document.documentElement.classList.remove('menu-open');
    }

    function openMenu(menu) {
        if (menu) {
            menu.classList.add('_show');
            if (menu.classList.contains('menu__submenu')) {
                activeSubmenu = menu;
                bodyLock();
                document.documentElement.classList.add('menu-open');
            } else if (menu.classList.contains('menu__subsubmenu')) {
                activeSubsubmenu = menu;
                const parentLink = menu.previousElementSibling;
                if (parentLink && parentLink.classList.contains('submenu__link')) {
                    parentLink.classList.add('_active');
                }
            }
        }
    }

    // Обновленный обработчик для кнопок "назад"
    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentMenu = button.closest('.menu__submenu, .menu__subsubmenu');
            if (parentMenu) {
                // Передаем флаг isBackButton в функцию closeMenu
                closeMenu(parentMenu, true);
            }
        });
    });

    // Остальные обработчики остаются без изменений
    menuItems.forEach(item => {
        const submenu = item.querySelector('.menu__submenu');
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeSubmenu === submenu) {
                closeMenu(activeSubmenu);
            } else {
                if (activeSubmenu) closeMenu(activeSubmenu);
                if (activeSubsubmenu) closeMenu(activeSubsubmenu);
                openMenu(submenu);
            }
        });
    });

    submenuLinks.forEach(link => {
        const subsubmenu = link.nextElementSibling;
        link.addEventListener('click', (e) => {
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
            }
            iconMenu.classList.toggle('_active');
        });
    }

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !iconMenu.contains(e.target)) {
            closeAllMenus();
            iconMenu.classList.remove('_active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const langSelector = document.querySelector('.header__lang');
    const currentLang = langSelector.querySelector('.current-lang');
    const dropdown = langSelector.querySelector('.lang-dropdown');
    const options = langSelector.querySelectorAll('.lang-option');

    // Определяем, является ли устройство мобильным
    const isMobile = window.matchMedia("(max-width: 991.98px)").matches;

    if (isMobile) {
        langSelector.addEventListener('click', function (e) {
            dropdown.classList.toggle('active');
        });

        // Закрываем dropdown при клике вне его
        document.addEventListener('click', function (e) {
            if (!langSelector.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Обработка выбора языка
    options.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            const langCode = this.getAttribute('data-lang');
            currentLang.textContent = langCode;
            dropdown.classList.remove('active');
            // Здесь можно добавить логику для смены языка на сайте
        });
    });
});