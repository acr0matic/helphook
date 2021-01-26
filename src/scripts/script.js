const languageSwitcher = document.getElementById('languageSwitcher');
const languageComponent = document.getElementById('languageComponent');

languageSwitcher.addEventListener('click', () => {
  const items = languageComponent.querySelectorAll('.language__item--hide');
  const container = languageComponent.querySelector('.language__container');

  items.forEach(item => {
    item.classList.toggle('language__item--visible');
  });

  container.classList.toggle('language__container--open');
  languageSwitcher.classList.toggle('language__control--open')
});

ymaps.ready(function () {
  container = document.getElementById('yandexMap');

  var map = new ymaps.Map(container, {
    center: [55.76, 37.64],
    zoom: 10
  });

  map.behaviors.disable('scrollZoom');

  var placemarks = {
    coordinates: [
      [55.76, 37.64],
      [55.74, 37.54],
      [55.76, 37.44]
    ],

    address: [
      'Россия, Москва, улица Свободы, 29',
      'Россия, Москва, улица Свободы, 25',
      'Россия, Москва, улица Свободы, 24'
    ]
  }

  placemarks.coordinates.forEach((item, i) => {
    var place = new ymaps.Placemark(
      item, {
      balloonContentBody: placemarks.address[i],
    },
      {
        iconImageHref: 'https://acr0matic.dev/helphook/img/icons/map__marker.svg',
        iconImageSize: [70, 70],
        iconLayout: 'default#image',
      }
    );

    map.geoObjects.add(place);
  });
});