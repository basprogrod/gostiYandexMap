import React from 'react'
import { renderToString } from 'react-dom/server'
import PlacePoint from '../PlacePoint'

export default (pointsArray, map) => {
  console.log('-> pointsArray', pointsArray)
  if (!pointsArray.length) return
  // map.geoObjects.removeAll()

  pointsArray.forEach((point, i) => {
    const Template = ymaps.templateLayoutFactory.createClass(
      renderToString(<PlacePoint data={{ index: i }} />)
    )

    const myGeoObject = new ymaps.GeoObject(
      {
        // Описываем геометрию типа "Точка".
        geometry: {
          type: 'Point',
          coordinates: [point.latitude, point.longitude],
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: 'Москва',
          balloonContentHeader: 'Москва',
          balloonContentBody: 'Столица России',
          population: 11848762,
        },
      },
      {
        // Задаем пресет метки с точкой без содержимого.
        // preset: 'twirl#redDotIcon',
        iconLayout: Template,
        // Включаем возможность перетаскивания.
        // draggable: true,
        // Переопределяем макет содержимого нижней части балуна.
        balloonContentFooterLayout: ymaps.templateLayoutFactory.createClass(
          'население: $[properties.population], координаты: $[geometry.coordinates]'
        ),
        iconShape: {
          type: 'Circle',
          coordinates: [0, 0],
          radius: 40,
        },
        // Отключаем задержку закрытия всплывающей подсказки.
        hintHideTimeout: 0,
      }
    )

    myGeoObject.events.add('click', (e) => {
      console.log(e)
    })

    map.geoObjects.add(myGeoObject)
  })
}

// clusterer.add(
//   points.map(
//     (coords, i) =>
//       new ymaps.Placemark(
//         coords,
//         {
//           balloonContent: renderToString(
//             <img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />
//           ),
//           // iconContent: i,
//           hintContent: 'Москва',

//           iconContentSize: [40, 40],
//         },
//         {
//           iconLayout: ymaps.templateLayoutFactory.createClass(
//             renderToString(<PlacePoint data={{ index: i }} />)
//           ),
//           iconShape: {
//             type: 'Circle',
//             coordinates: [0, 0],
//             radius: 40,
//           },

//           // Отключаем кнопку закрытия балуна.
//           // balloonCloseButton: false,
//           // Балун будем открывать и закрывать кликом по иконке метки.
//           hideIconOnBalloonOpen: false,
//         }
//       )
//   )
// )
