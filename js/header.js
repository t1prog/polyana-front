(function (window) {
  'use strict';
  if (window.HeaderHandler) return;

  window.HeaderHandler = class {
    constructor() {
      this.root = document.getElementById('header');
      this.burger = this.root.querySelector('.burger-handler');
      this.menu = this.root.querySelector('.header__menu');
      this.logo = this.root.querySelector('.header-main__logo');
      this.topContainer = this.root.querySelector('.header-main__container');
      this.searchMobileBtn = this.root.querySelector(
        '.header-main__search-btn'
      );
      this.searchInput = this.root.querySelector('.header-main__search-input');
      this.searchContainer = this.root.querySelector(
        '.header-main__search-container'
      );
      this.body = document.body;
    }

    init() {
      console.log('Header initialized');
      this.bindEvents();
    }

    bindEvents() {
      // this.burger.addEventListener('click', () => {
      //   this.toggleMenu();
      // });
      this.searchMobileBtn.addEventListener('click', () => {
        this.toggleSearch();
      });
    }

    toggleSearch() {
      this.topContainer.classList.toggle('modile-search');
      this.logo.classList.toggle('animate');

      const isActive = this.topContainer.classList.entries('modile-search');

      if (isActive) {
        this.searchInput.focus();
      }

      this.searchInput.addEventListener('blur', () => {
        if (isActive) {
          this.topContainer.classList.remove('modile-search');
          this.logo.classList.remove('animate');
        }
      });
    }

    toggleMenu() {
      this.burger.classList.toggle('active');
      this.menu.classList.toggle('active');
      this.body.classList.toggle('lock');
    }
  };

  $(function () {
    const handler = new window.HeaderHandler();
    handler.init();
  });
})(window);
