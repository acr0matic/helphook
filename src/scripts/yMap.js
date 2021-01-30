ymaps.ready(function () {
  container = document.getElementById('yandexMap');

  var map = new ymaps.Map(container, {
    center: [44.558367, 38.095674],
    zoom: 15
  });

  map.behaviors.disable('scrollZoom');

  fetch('../data/map.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (const key in data) {
        const element = data[key];

        let iconSize = [70, 70];
        let address = element.address;

        if (/\/en/.test(window.location.href)) address = element.address_en;

        if (window.matchMedia("(max-width: 768px)").matches) iconSize = [35, 35];

        var place = new ymaps.Placemark(
          element.coordinates, {
          balloonContentBody: address,
        },
          {
            iconImageHref: '../img/icons/map__marker.svg',
            iconImageSize: iconSize,
            iconLayout: 'default#image',
          }
        );

        map.geoObjects.add(place);
      }
    });
});