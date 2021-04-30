import Filter from '../components/Filter'
import { CACH_KEEPING_TIME } from '../config/constants'
import { storage } from './storageService'
import stor from '../store'
import store from '../store'
import getFiteredData from '../store/thunks/getFiteredData'

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
    storage.set({
      bounds: e.originalEvent.newBounds,
      center: e.originalEvent.newCenter,
      zoom: e.originalEvent.newZoom,
    })

    if (stor.getState().loading) return

    store.dispatch(getFiteredData({}, undefined, true))
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
