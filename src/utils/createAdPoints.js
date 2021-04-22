import React from 'react'
import { renderToString } from 'react-dom/server'
import vio from '../assets/img/violetCircle.svg'
import yel from '../assets/img/yellowCircle.svg'
import logo from '../assets/img/logoIcon.svg'
import circle from '../assets/img/circle.svg'

let placemarks = []

export default (pointsArray, state, setState) => {
  const { map } = state

  const clIcons = [
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
  ]

  const clOptoins = {
    clusterIcons: clIcons,
    clusterNumbers: [2],
    groupByCoordinates: false,
    clusterDisableClickZoom: true,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false,
    hasBalloon: false,
    iconLayout: 'default#imageWithContent',
    iconImageSize: [40, 40],
    iconImageOffset: [-20, -20],
    iconContentOffset: [15, 13],
  }

  if (!pointsArray.length) return
  map?.geoObjects.removeAll()

  const clusterer = new ymaps.Clusterer(clOptoins)

  placemarks = pointsArray.map((point, i) => {
    // const Template = ymaps.templateLayoutFactory.createClass(
    //   renderToString(<PlacePoint data={{ index: i }} />)
    // )

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
          iconContent: renderToString(
            <div className="yaps__icon-content">1</div>
          ),
          indexToShow: i,
          // balloonContentHeader: 'Москва',
          // balloonContentBody: 'Столица России',
          // population: 11848762,
          // iconImageSize: [40, 40],
        },
      },
      {
        // Задаем пресет метки с точкой без содержимого.
        // preset: 'twirl#redDotIcon',
        iconLayout: 'default#imageWithContent',
        iconImageHref: circle,

        // iconImageOffset: [-20, -20],
        // iconContentOffset: [4, 5],
        hasBalloon: false,
        // iconLayout: Template,
        // Включаем возможность перетаскивания.
        // draggable: true,
        // Переопределяем макет содержимого нижней части балуна.
        // balloonContentFooterLayout: ymaps.templateLayoutFactory.createClass(
        //   'население: $[properties.population], координаты: $[geometry.coordinates]'
        // ),
        iconShape: {
          type: 'Circle',
          coordinates: [0, 0],
          radius: 20,
        },
        // Отключаем задержку закрытия всплывающей подсказки.
        hintHideTimeout: 0,
      }
    )

    myGeoObject.options.set('iconImageSize', [40, 40])
    myGeoObject.options.set('iconImageHref', circle)
    myGeoObject.options.set('iconImageOffset', [-20, -20])
    myGeoObject.options.set('iconContentOffset', [4, 5])

    return myGeoObject
  })

  clusterer.options.set({
    gridSize: 100,
    clusterDisableClickZoom: true,
  })
  clusterer.add(placemarks)

  clusterer.events.add('click', (e) => {
    for (const point of placemarks) {
      point.options.set('iconImageHref', circle)
      point.options.set('iconLayout', 'default#imageWithContent')
    }

    clusterer.getClusters().forEach((cl) => {
      const value = cl.properties._data.iconContent

      cl.options.set('iconImageHref', value > 3 ? vio : yel)
      cl.options.set('iconLayout', 'default#imageWithContent')
      // cl.options.set('iconContentOffset', [15, 15])
      // cl.options.set('clusterIcons', clIcons)
    })

    if (e.get('target').getGeoObjects) {
      const adsToShow = e
        .get('target')
        .getGeoObjects()
        .map((obj) => pointsArray[obj.properties._data.indexToShow])

      setState({ ...state, adsToShow, isShowFilter: false })

      e.get('target').options.set('iconLayout', 'default#image')
      e.get('target').options.set('iconImageHref', logo)

      setState((state) => ({ ...state, cluster: clusterer }))
    } else {
      const adsToShow =
        pointsArray[e.get('target').properties._data.indexToShow]

      setState({ ...state, adsToShow: [adsToShow], isShowFilter: false })

      e.get('target').options.set('iconLayout', 'default#image')
      // e.get('target').options.set('iconImageSize', [40, 40])
      // e.get('target').options.set('iconImageOffset', [-20, -20])
      // e.get('target').options.set('iconContentOffset', [15, 15])
      e.get('target').options.set('iconImageHref', logo)
    }
  })
  setState((state) => ({ ...state, cluster: clusterer, isShowFilter: false }))
  map?.geoObjects.add(clusterer)
}
