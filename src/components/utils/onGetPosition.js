import { CACH_KEEPING_TIME } from '../../config/constants'
import { storage } from './storageService'

export default (state, setState, e) => {
  const { center, zoom, ts } = storage.get()

  if (new Date().getTime() - ts > CACH_KEEPING_TIME) storage.clear()

  const map = new ymaps.Map('g-map', {
    center: center || [e.coords.latitude, e.coords.longitude],
    zoom: zoom || 10,
    controls: [
      /* 'zoomControl', 'geolocationControl' */
    ],
  })

  window.map = map

  map.events.add('boundschange', (e) => {
    storage.set({
      bounds: e.originalEvent.newBounds,
      center: e.originalEvent.newCenter,
      zoom: e.originalEvent.newZoom,
    })
    console.log(storage.get())
  })

  setState({
    ...state,
    isLoading: false,
    map: map,
  })
}
