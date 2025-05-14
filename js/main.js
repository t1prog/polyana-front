$(function () {
  const root = document.getElementById('root');
  const body = document.body;
  let openedModal = null;

  const modalReset = () => {
    if (!openedModal) return;
    openedModal.classList.remove('modal--open');
    openedModal = null;
  };

  const lockToggle = (type) => {
    if (!type) {
      body.classList.toggle('lock');
      root.classList.toggle('modal-opened');
    }

    if (type === 'lock') {
      body.classList.add('lock');
      root.classList.add('modal-opened');
    }

    if (type === 'unlock') {
      body.classList.remove('lock');
      root.classList.remove('modal-opened');
      modalReset();
    }
  };

  const modalToggle = (block) => {
    if (openedModal) openedModal.classList.toggle('modal--open');
    block.classList.toggle('modal--open');
    openedModal = block;
  };

  // Запрещаем перетаскивание ссылок и изображений
  $('a, img').on('dragstart', (event) => {
    event.preventDefault();
  });

  $('.burger-handler').on('click', (event) => {
    const modal = document.getElementById('modal-burger');
    modalToggle(modal);
    lockToggle();
  });

  // Закрывашка для модалки
  $('.modal-close, .modal').on('click', (event) => {
    if ($(event.target).is('.modal') || $(event.target).is('.modal-close>*')) {
      lockToggle('unlock');
    }
  });

  window.addEventListener('resize', () => {
    const modals = document.querySelectorAll('modal');
    modals.forEach((item) => {
      if (item.classList.contains('modal--open')) {
        item.classList.remove('modal--open');
      }
    });
    lockToggle('unlock');
  });
});
