import { storage } from './storageService'

export default (state, setState, e) => {
  console.log('-> e', e)
  const { center, zoom, ts } = storage.get()

  if (new Date().getTime() - ts > 5000) storage.clear()

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
  })
}
