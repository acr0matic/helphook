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
    center: [44.558367, 38.095674],
    zoom: 15
  });

  map.behaviors.disable('scrollZoom');

  var placemarks = {
    coordinates: [
      [44.552373, 38.070620], // 1
      [44.550132, 38.071913], // 2
      [44.549374, 38.071617], // 3
      [44.548134, 38.072982], // 4
      [44.548847, 38.080816], // 5
      [44.552945, 38.100381], // 6
      [44.553446, 38.099132], // 7
      [44.553889, 38.096105], // 8
      [44.568353, 38.082927], // 9
      [44.558886, 38.091955], // 10
      [44.558006, 38.100004], // 11
      [44.554962, 38.106229], // 12
      [44.553934, 38.077016], // 13
      [44.554037, 38.109912], // 14
    ],

    address: [
      'Россия, Геленджик, Ульяновская улица, 28',    // 1
      'Россия, Геленджик, улица Гринченко, 31',      // 2
      'Россия, Геленджик, улица Гринченко, 35',      // 3
      'Россия, Геленджик, улица Леселидзе, 21А',     // 4
      'Россия, Геленджик, Курзальная улица, 72',     // 5
      'Россия, Геленджик, улица Островского, 152',   // 6
      'Россия, Геленджик, улица Островского, 146',   // 7
      'Россия, Геленджик, улица Сурикова, 40',       // 8
      'Россия, Геленджик, Садовая улица, 33',        // 9
      'Россия, Геленджик, Восточный переулок, 38',   // 10
      'Россия, Геленджик, Прасковеевская улица, 35', // 11
      'Россия, Геленджик, Дивноморская улица, 37к10',// 12
      'Россия, Геленджик, улица Тельмана, 7',        // 13
      'Россия, Геленджик, улица Островского, 149'    // 14
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