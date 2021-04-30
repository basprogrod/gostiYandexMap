import React from 'react'
import { renderToString } from 'react-dom/server'
import vio from '../assets/img/violetCircle.svg'
import yel from '../assets/img/yellowCircle.svg'
import logo from '../assets/img/logoIcon.svg'
import circle from '../assets/img/circle.svg'
import Sidebar from '../components/Sidebar'
import PlacePoint from '../components/PlacePoint'
import { clOptoins } from '../config/constants'

let placemarks = []

export default (pointsArray, state, setState) => {
  const { map } = state

  if (!pointsArray.length) return
  map?.geoObjects.removeAll()

  const clusterer = new ymaps.Clusterer(clOptoins)

  placemarks = pointsArray.map((point, i) => {
    const Template = ymaps.templateLayoutFactory.createClass(renderToString(<PlacePoint data={{ price: `${point.price.daily} ${point.price.currency}`, index: i }} />))

    const myGeoObject = new ymaps.GeoObject(
      {
        // Описываем геометрию типа "Точка".
        geometry: {
          type: 'Point',
          coordinates: [point.latitude, point.longitude],
        },
        // Описываем данные геообъекта.
        properties: {
          onHover: PlacePoint.click,
          hintContent: `${point.price.daily} ${point.price.currency}`,
          iconContent: renderToString(<div className="yaps__icon-content">1</div>),
          indexToShow: i,
        },
      },
      {
        iconLayout: Template,
        iconImageHref: circle,
        hasBalloon: false,
        hasHint: false,
        iconShape: {
          type: 'Circle',
          coordinates: [0, 0],
          radius: 20,
        },
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
    Sidebar.open && Sidebar.open()

    for (const point of placemarks) {
      // point.options.set('iconImageHref', circle)
      // point.options.set('iconLayout', 'default#imageWithContent')
    }

    clusterer.getClusters().forEach((cl) => {
      const value = cl.properties._data.iconContent

      cl.options.set('iconImageHref', value > 3 ? vio : yel)
      cl.options.set('iconLayout', 'default#imageWithContent')
    })

    if (e.get('target').getGeoObjects) {
      const adsToShow = e
        .get('target')
        .getGeoObjects()
        .map((obj) => pointsArray[obj.properties._data.indexToShow])
      setState({ ...state, adsToShow, isShowFilter: false, isLoading: false })

      e.get('target').options.set('iconLayout', 'default#image')
      e.get('target').options.set('iconImageHref', logo)

      setState((state) => ({ ...state, cluster: clusterer, isLoading: false }))
    } else {
      const adsToShow = pointsArray[e.get('target').properties._data.indexToShow]

      setState({ ...state, adsToShow: [adsToShow], isShowFilter: false, isLoading: false })
    }
  })
  setState((state) => ({ ...state, cluster: clusterer, isShowFilter: false, isLoading: false }))
  map?.geoObjects.add(clusterer)
}
