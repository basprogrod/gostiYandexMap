import React, { useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { YMaps, Map, Polygon, Clusterer, Placemark } from 'react-yandex-maps'
import points from '../../mocks/points'
import Controls from '../Controls'
import RountRedCloseIcon from '../svg/RountRedCloseIcon'
import Circle from '../svg/Circle'
import circle from '../../assets/img/circle.svg'

import './styles.scss'
import PlacePoint from '../PlacePoint'
import Sidebar from '../Sidebar'

const container = document.createElement('div')
container.id = 'g-map'

const mapState = {
  center: [55.751574, 37.573856],
  zoom: 9,
  behaviors: ['default', 'scrollZoom'],
}

const getPointData = (index) => {
  return {
    balloonContentBody: 'placemark <strong>balloon ' + index + '</strong>',
    clusterCaption: 'placemark <strong>' + index + '</strong>',
  }
}

const getPointOptions = () => {
  return {
    preset: 'islands#violetIcon',
    balloonContent: 'Маленькая иконка',
    balloonIconImageHref:
      'https://yandex.ru/images/search?pos=0&img_url=https%3A%2F%2Fwww.zastavki.com%2Fpictures%2Foriginals%2F2014%2FNature___Rivers_and_lakes_Turquoise_lake_in_the_mountains_083623_.jpg&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&lr=213&rpt=simage&source=wiz',
  }
}

const App = () => {
  const [state, setState] = useState({
    map: null,
    pol: null,
    isDrawning: false,
    isLoading: true,
  })

  const handleToDraw = () => {
    const { pol, isDrawning } = state

    state.pol.geometry.remove(state.pol)

    if (isDrawning) {
      pol.editor.stopDrawing()
    } else {
      pol.editor.startDrawing()
    }
  }

  const handleRemovepolygon = () => {
    // state.map.geoObjects.removeAll()
    state.pol.geometry.remove(state.pol)
  }

  const init = () => {
    // if (window.map) return

    const map = new ymaps.Map('g-map', {
      center: [55.76, 37.64],
      zoom: 10,
      controls: ['zoomControl', 'geolocationControl'],
    })

    const clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: true,
      hintContent: 'Москва',
    })

    clusterer.add(
      points.map(
        (coords, i) =>
          new ymaps.GeoObject(
            {
              geometry: {
                type: 'Point',
                coordinates: coords,
              },
              properties: {
                balloonContent: renderToString(
                  <img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />
                ),
                // iconContent: i,
                hintContent: 'Москва',

                // iconContentSize: [40, 40],
              },
            },
            {
              iconLayout: ymaps.templateLayoutFactory.createClass(
                renderToString(<PlacePoint data={{ index: i }} />)
              ),
              iconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 40,
              },

              // Отключаем кнопку закрытия балуна.
              // balloonCloseButton: false,
              // Балун будем открывать и закрывать кликом по иконке метки.
              hideIconOnBalloonOpen: false,
            }
          )
      )
    )

    const pol = new ymaps.Polygon(
      [],
      { hintContent: 'Многоугольник' },
      {
        fillColor: '#6699ff',
        // Делаем полигон прозрачным для событий карты.
        interactivityModel: 'default#transparent',
        strokeWidth: 1,
        opacity: 0.5,
        editorMaxPoints: 5,
      }
    )

    map.geoObjects.add(pol)
    map.geoObjects.add(clusterer)

    const stateMonitor = new ymaps.Monitor(pol.editor.state)

    stateMonitor.add('drawing', function (newValue) {
      pol.options.set('strokeColor', newValue ? '#FF0000' : '#0000FF')
      setState((state) => ({ ...state, isDrawning: newValue }))
    })

    pol.editor.events.add('statechange', function () {
      console.log(pol.geometry.getCoordinates()[0])
    })

    pol.editor.events.add('vertexdragend', function () {
      console.log(pol.geometry.getCoordinates()[0])
    })

    pol.editor.events.add('edgedragend', function () {
      console.log(pol.geometry.getCoordinates()[0])
    })

    window.pol = pol
    window.map = map

    // Включаем режим редактирования с возможностью добавления новых вершин.

    setState({
      ...state,
      map: map,
      pol: pol,
      polState: stateMonitor,
      isLoading: false,
    })
  }

  useEffect(() => {
    ymaps.ready(init)
  }, [])

  return (
    <>
      {state.isLoading && (
        <div className="loader">
          <div className="span">loading...</div>
        </div>
      )}
      <Controls handleToDraw={handleToDraw} isDrawning={state.isDrawning} />
      <Sidebar />
      <div id="g-map"></div>
      <button className="yaps__round-btn delete" onClick={handleRemovepolygon}>
        <RountRedCloseIcon />
      </button>
    </>

    // <YMaps>

    //   <Map
    //     instanceRef={(ref) => {
    //       if (!ref) return
    //       if (window.map) return
    //       window.map = ref
    //     }}
    //     style={{ width: '100%', height: '100%' }}
    //     defaultState={mapState}
    //     modules={['geoObject.addon.editor']}
    //   >
    //     <Polygon
    //       instanceRef={(ref) => ref && initPolygon(ref)}
    //       geometry={[]}
    //       options={{
    //         editorDrawingCursor: 'crosshair',
    //         editorMaxPoints: 5,
    //         fillColor: '#0F01',
    //         strokeColor: '#0000FF',
    //         strokeWidth: 1,
    //       }}
    //     />
    //     <Clusterer
    //       options={{
    //         // preset: 'islands#invertedVioletClusterIcons',
    //         groupByCoordinates: false,
    //         clusterDisableClickZoom: true,
    //         clusterHideIconOnBalloonOpen: false,
    //         geoObjectHideIconOnBalloonOpen: false,
    //       }}
    //     >
    //       {points.map((coordinates, idx) => (
    //         <Placemark
    //           key={idx}
    //           geometry={coordinates}
    //           properties={getPointData(idx)}
    //           options={{
    //             preset: 'islands#greenIcon',
    //             balloonContent: 'Маленькая иконка',
    //             draggable: true,
    //             openBalloonOnClick: true,
    //             openEmptyBalloon: true,
    //           }}
    //         />
    //       ))}
    //     </Clusterer>
    //   </Map>

    // </YMaps>
  )
}

export default App
