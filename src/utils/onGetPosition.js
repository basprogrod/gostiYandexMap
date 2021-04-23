import { useLayoutEffect } from 'react'
import { CACH_KEEPING_TIME } from '../config/constants'
import { storage } from './storageService'

export default (state, setState, e) => {
  if (e instanceof GeolocationPositionError) {
    alert('Определение геопозиции заблокировано пользователем!')
  }

  const { center, zoom, ts } = storage.get()

  if (new Date().getTime() - ts > CACH_KEEPING_TIME) storage.clear()

  const centerFromEvent = [e.coords?.latitude, e.coords?.longitude]

  const map = new ymaps.Map('g-map', {
    center: center || (centerFromEvent.every((el) => !!el) && centerFromEvent) || [53.903091, 27.558799],
    zoom: zoom || 10,
    searchControlProvider: 'yandex#search',
    controls: [],
  })

  window.map = map

  map.controls?.add('zoomControl', { position: { right: 20, top: 75 } })
  map.controls?.add('searchControl', {
    position: { right: 160, top: 20 },
    // size: 'small',
  })

  map.events.add('boundschange', (e) => {
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
