import { CACH_KEEPING_TIME } from '../config/constants'
import { storage } from './storageService'

export default (state, setState) => {
  const { center, zoom, ts } = storage.get()

  if (new Date().getTime() - ts > CACH_KEEPING_TIME) storage.clear()

  const map = new ymaps.Map('g-map', {
    center: center || [53.903091, 27.558799],
    zoom: zoom || 10,
    searchControlProvider: 'yandex#search',
    controls: [],
  })

  window.gMap = map

  map.controls?.add('zoomControl', { position: { right: 20, top: 75 } })
  map.controls?.add('searchControl', {
    position: { right: 160, top: 20 },
  })

  map.events.add('boundschange', (e) => {
    console.log(e.get('target').geoObjects.getIterator().getNext().getGeoObjects())
    storage.set({
      bounds: e.originalEvent.newBounds,
      center: e.originalEvent.newCenter,
      zoom: e.originalEvent.newZoom,
    })
    // console.log(storage.get())
  })

  storage.set({
    bounds: map.getBounds(),
    center: map.getCenter(),
    zoom: map.getZoom(),
  })

  setState({
    ...state,
    map: map,
  })
}
