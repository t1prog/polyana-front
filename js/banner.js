(function (window) {
  'use strict';
  if (window.BannerHandler) return;

  window.BannerHandler = class {
    constructor() {
      this.activeItem = document.querySelector(
        '.banner-slider__list-item.banner-slider__list-item--active'
      );
      this.activeBtn = document.querySelector(
        '.banner-desktop__menu-item.banner-desktop__menu-item--selected'
      );
    }
    init() {
      const menuBtns = document.querySelectorAll(
        '.banner-desktop__menu-list .banner-desktop__menu-item'
      );
      menuBtns.forEach((btn) => this.btnEvent(btn));

      // touch slider
      // const slider = document.querySelector('.banner-slider');
      // this.mobileSliderHandler(slider);
    }

    mobileSliderHandler(slider) {
      let startX, currentX;

      slider.addEventListener('touchstart', (event) => {
        if (!this.isMobile()) return;
        startX = event.touches[0].clientX;
      });

      slider.addEventListener('touchmove', (event) => {
        if (!this.isMobile()) return;
        currentX = event.touches[0].clientX;
        const diffX = currentX - startX;

        if (diffX > 50) {
          console.log('Swipe right detected');
        } else if (diffX < -50) {
          console.log('Swipe left detected');
        }
      });

      slider.addEventListener('touchend', () => {
        if (!this.isMobile()) return;
        // Логика для завершения свайпа или других действий
        console.log('Touch ended');
      });
    }

    isMobile() {
      return window.innerWidth <= 694;
    }

    btnEvent(btn) {
      const idCount = btn.id[btn.id.length - 1];

      btn.addEventListener('click', (e) => {
        this.startAnimate(this.getSlideById(idCount), btn);
      });
    }

    startAnimate(slide, btn) {
      this.setActive(slide, btn);
    }

    setActive(item, btn) {
      if (this.animateTimeout) return;

      const itemId = item.id[item.id.length - 1];

      // Убираем активный класс у текущего элемента
      this.activeItem.classList.remove('banner-slider__list-item--active');
      this.activeItem.classList.add('animate');

      // Добавляем классы к новому элементу
      item.classList.add('banner-slider__list-item--active');
      item.classList.add('animate');

      // Скрываем и показываем кнокпу
      this.bannerMenuHandler(this.activeBtn, btn);

      this.setTitle(itemId);

      // Обновляем активный элемент
      this.activeItem = item;

      // Устанавливаем таймер для ожидания завершения анимации
      this.animateTimeout = setTimeout(() => {
        // Завершаем анимацию
        this.animateTimeout = null; // Очищаем таймер
        // Чистим анимации
        document
          .querySelectorAll('.banner-slider__list-item')
          .forEach((item) => {
            item.classList.remove('animate');
          });
      }, 1500);
    }

    bannerMenuHandler(prev, next) {
      const prevOrder = prev.style.order;
      const nextOrder = next.style.order;
      const windowWidth = window.innerWidth;
      prev.classList.remove('banner-desktop__menu-item--selected');
      next.classList.add('banner-desktop__menu-item--selected');

      if (windowWidth <= 694) {
        prev.style.order = prevOrder;
        next.style.order = nextOrder;
      } else {
        prev.style.order = nextOrder;
        next.style.order = prevOrder;
      }
      this.activeBtn = next;
    }

    setTitle(id) {
      const menuItems = document.querySelectorAll('.banner-desktop__menu-name');
      const activeItem = document.querySelector(
        '.banner-desktop__menu-name--selected'
      );

      menuItems.forEach((item) => {
        const idCount = item.id[item.id.length - 1];

        if (id == idCount) {
          activeItem.classList.remove('banner-desktop__menu-name--selected');
          item.classList.add('banner-desktop__menu-name--selected');
        }
      });
    }

    getSlideById(id) {
      if (id === undefined || id === null) {
        console.warn('ID не был указан');
        return null;
      }

      const idStr = `banner-slide-${id}`;
      const slide = document.getElementById(idStr);

      if (!slide) {
        console.warn(`Слайд с ID = ${idStr} не найден.`);
      }

      return slide;
    }
  };

  $(function () {
    const handler = new window.BannerHandler();
    handler.init();
  });
})(window);
