import React, { useEffect, useState } from 'react'
import { YMaps, Map, Polygon, Clusterer, Placemark } from 'react-yandex-maps'
import points from '../../mocks/points'
import Controls from '../Controls'
import RountRedCloseIcon from '../svg/RountRedCloseIcon'

import './styles.scss'

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
  }
}

const App = () => {
  const [state, setState] = useState({
    pol: null,
  })

  const initPolygon = (e) => {
    if (!state.pol) {
      setState({ ...state, pol: e })
      return
    }

    const { pol } = state

    window.pol = state.pol
  }

  const handleAnebleToDraw = () => {
    const { pol } = state
    pol.editor.startDrawing()
  }

  const handleDiableToDraw = () => {
    const { pol } = state
    pol.editor.stopDrawing()
  }

  const handleRemovepolygon = () => {
    window.map.geoObjects.remove(state.pol)
  }

  useEffect(() => {
    const { pol } = state
    if (!state.pol) return

    pol.editor.events.add('statechange', () => {
      console.log('statechange', pol)
      console.log('statechange', pol.geometry.getCoordinates()[0])
    })

    pol.editor.events.add('edgedragend', () => {
      setTimeout(() => {
        console.log('edgedragend', pol.geometry.getCoordinates()[0])
      })
    })

    pol.editor.events.add('vertexdragend', () => {
      setTimeout(() => {
        console.log('vertexdragend', pol.geometry.getCoordinates()[0])
      })
    })
  }, [state.pol])

  return (
    <YMaps>
      <Controls
        handleAnebleToDraw={handleAnebleToDraw}
        handleDiableToDraw={handleDiableToDraw}
      />
      <Map
        instanceRef={(ref) => {
          if (!ref) return
          if (window.map) return
          window.map = ref
        }}
        style={{ width: '100%', height: '100%' }}
        defaultState={mapState}
        modules={['geoObject.addon.editor']}
      >
        <Polygon
          instanceRef={(ref) => ref && initPolygon(ref)}
          geometry={[]}
          options={{
            editorDrawingCursor: 'crosshair',
            editorMaxPoints: 5,
            fillColor: '#0F01',
            strokeColor: '#0000FF',
            strokeWidth: 1,
          }}
        />
        <Clusterer
          options={{
            // preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
          }}
        >
          {points.map((coordinates, idx) => (
            <Placemark
              key={idx}
              geometry={coordinates}
              properties={getPointData(idx)}
              options={getPointOptions()}
            />
          ))}
        </Clusterer>
      </Map>
      <button className="yaps__round-btn delete" onClick={handleRemovepolygon}>
        <RountRedCloseIcon />
      </button>
    </YMaps>
  )
}

export default App
