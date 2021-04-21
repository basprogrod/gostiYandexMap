import { storage } from './storageService'

export default (state, setState, e) => {
  const { center, zoom, ts } = storage.get()

  const map = new ymaps.Map('g-map', {
    center: center || [53.901614, 27.556883],
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
  alert('Пользователь запретил определение места положения')
}
