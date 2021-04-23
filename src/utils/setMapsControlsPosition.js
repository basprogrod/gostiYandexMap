import { MEDIUM_SREEN, SMALL_SREEN } from '../config/constants'

export default (width, map) => {
  if (width < SMALL_SREEN && width < MEDIUM_SREEN) {
    map?.controls.get('searchControl').options.set('position', { top: 68, right: 20 })
    map?.controls.get('zoomControl').options.set('position', { top: 120, right: 20 })
  }

  if (width > SMALL_SREEN && width < MEDIUM_SREEN) {
    map?.controls.get('searchControl').options.set('position', { top: 20, right: 70 })
  }
  if (width > MEDIUM_SREEN) {
    map?.controls.get('searchControl').options.set('position', { top: 20, right: 160 })
  }
}
