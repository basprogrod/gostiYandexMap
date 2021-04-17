import React from 'react'
import { renderToString } from 'react-dom/server'
import PlacePoint from '../PlacePoint'
import vio from '../../assets/img/violetCircle.svg'
import yel from '../../assets/img/yellowCircle.svg'

export default (pointsArray, map) => {
  console.log('-> pointsArray', pointsArray)
  if (!pointsArray.length) return
  map.geoObjects.removeAll()

  const clusterer = new ymaps.Clusterer({
    clusterIcons: [
      {
        href: yel,
        size: [40, 40],
        offset: [-20, -20],
      },
      {
        href: vio,
        size: [40, 40],
        offset: [-20, -20],
      },
    ],

    clusterNumbers: [2],
    // clusterIconLayout: 'default#pieChart',
    /**
     * Через кластеризатор можно указать только стили кластеров,
     * стили для меток нужно назначать каждой метке отдельно.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
     */
    // preset: 'islands#invertedVioletClusterIcons',
    /**
     * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
     */
    groupByCoordinates: false,
    /**
     * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
     */
    clusterDisableClickZoom: true,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false,
  })

  const points = pointsArray.map((point, i) => {
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
          hintContent: `${point.price.daily} ${point.price.currency}`,
          balloonContentHeader: 'Москва',
          balloonContentBody: 'Столица России',
          population: 11848762,
        },
      },
      {
        // Задаем пресет метки с точкой без содержимого.
        // preset: 'twirl#redDotIcon',
        // iconLayout: 'default#image',

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

    return myGeoObject
  })
  clusterer.options.set({
    gridSize: 100,
    clusterDisableClickZoom: true,
  })
  clusterer.add(points)
  map.geoObjects.add(clusterer)
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
