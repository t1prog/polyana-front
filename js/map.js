(function (window) {
  'use strict';
  if (window.mapHandler) return;

  window.mapHandler = class {
    constructor() {
      this.root = document.getElementById('contact-map');
      this.coords = ['56.515878', '84.951977'];
    }

    init() {
      this.balloon = ymaps.templateLayoutFactory.createClass(
        '<div class="balloon-root">' +
          '<div class="close icon-base icon__close--green"></div>' +
          '<div class="arrow balloon-pin"></div>' +
          '<div class="balloon-body balloon">$[properties.balloonContent]</div>' +
          '</div>',
        {
          //Формирование макета
          build: function () {
            this.constructor.superclass.build.call(this);
            this._$element = $('.balloon-root', this.getParentElement());
            this.applyElementOffset();
            this._$element
              .find('.close')
              .on('click', $.proxy(this.onCloseClick, this));
            this._$element
              .find('.balloon-btn')
              .on('click', $.proxy(this.onSelectClick, this));
          },
          //удаление макета из DOM
          clear: function () {
            this._$element.find('.close').off('click');
            this.constructor.superclass.clear.call(this);
          },
          //закрытие балуна
          onCloseClick: function (e) {
            e.preventDefault();
            this.events.fire('userclose');
          },
          applyElementOffset: function () {
            this._$element.css({
              left: -(this._$element[0].offsetWidth / 2),
              top:
                -(
                  this._$element[0].offsetHeight +
                  this._$element.find('.arrow')[0].offsetHeight
                ) - 10,
            });
          },
        }
      );
      this.createMap();
    }

    createMap() {
      this.map = new ymaps.Map(
        'contact-map',
        {
          center: this.coords,
          zoom: 18,
          controls: [],
        },
        {
          maxZoom: 18,
          minZoom: 18,
          yandexMapDisablePoiInteractivity: true,
          suppressMapOpenBlock: true,
          // yandexMapType: 'map',
        }
      );

      this.mapControls();

      this.setMainMark();
    }
    // https://yandex.ru/maps/org/shchedraya_polyana/1802594738/reviews/?ll=84.951980%2C56.515861&z=15

    createMark(map, coords) {
      return new ymaps.Placemark(
        coords,
        {
          balloonContent: this.mapBalloon().outerHTML,
        },
        {
          iconColor: '#3E8357',
          balloonLayout: this.balloon,
          balloonPanelMaxMapArea: 1,
        }
      );
    }

    mapBalloon() {
      const parent = document.createElement('div');
      parent.classList.add('contacts-map__balloon-main');
      // Если есть ссылки - кидаем сюда
      const links = this.mapBalloonLinks();
      links.forEach((element) => {
        parent.appendChild(element);
      });

      return parent;
    }

    mapBalloonLinks(propLinks) {
      const links = propLinks || [
        {
          url: 'https://2gis.ru/tomsk/directions/points/%7C84.951876%2C56.516017%3B422741746321631?m=84.952157%2C56.516191%2F17',
          name: '2GIS',
        },
        {
          url: 'https://yandex.ru/maps/67/tomsk/?ll=84.951980%2C56.515861&mode=routes&rtext=~56.515861%2C84.951980&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D1802594738&z=15',
          name: 'Яндекс Карты',
        },
      ];

      return links.map((element) => {
        const aElem = document.createElement('a');
        aElem.classList.add('contacts-map__balloon-link');
        aElem.href = element.url;
        aElem.textContent = element.name;
        aElem.target = '_blank';
        return aElem;
      });
    }

    mapControls() {
      /**
      "drag" - перемещение карты при нажатой левой кнопке мыши либо одиночным касанием behavior.Drag;
      "scrollZoom" – изменение масштаба колесом мыши behavior.ScrollZoom;
      "dblClickZoom" - масштабирование карты двойным щелчком кнопки мыши behavior.DblClickZoom;
      "multiTouch" – масштабирование карты двойным касанием (например, пальцами на сенсорном экране) behavior.MultiTouch;
      "rightMouseButtonMagnifier" - увеличение области, выделенной правой кнопкой мыши (только для настольных браузеров), behavior.RightMouseButtonMagnifier;
      "leftMouseButtonMagnifier" - увеличение области, выделенной левой кнопкой мыши либо одиночным касанием, behavior.LeftMouseButtonMagnifier;
      "ruler" - измерение расстояния behavior.Ruler.
      "routeEditor" - редактор маршрутов behavior.RouteEditor;
      */
      this.map.behaviors.disable([
        'drag',
        'rightMouseButtonMagnifier',
        'scrollZoom',
        'dblClickZoom',
        'multiTouch',
        'leftMouseButtonMagnifier',
        'ruler',
        'routeEditor',
      ]);

      // Полное затирание двойных кликов
      this.map.events.group().events.types.dblclickdefaultaction = undefined;
      this.map.events.group().events.types.dblclick = undefined;
      // Скрыть авторские парава
      this.map.copyrights._layout._rootElement.style.display = 'none';
    }

    setMainMark() {
      const mainMark = this.createMark(this.map, this.coords);

      this.map.geoObjects.add(mainMark);
    }
  };

  // $(window).on('load', function () {
  //   const map = new window.ContactMap();
  //   console.log(map.init());
  // });

  $(function () {
    const map = new window.mapHandler();
    ymaps.ready(() => map.init());
  });
})(window);
