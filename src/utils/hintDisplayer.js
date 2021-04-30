import Hint from '../components/Hint/component'

let lastEl = undefined

export default (cluster) => {
  cluster.events.add('click', (e) => {
    if (lastEl) lastEl.classList.remove('withImage')
    if (e.get('target').getGeoObjects) return

    const index = e.get('target').properties._data.indexToShow

    const el = document.querySelector(`[data-place-index="${index}"]`)
    el.classList.add('withImage')

    lastEl = el
  })
  cluster.events.add('mouseleave', (e) => {
    const index = e.get('target').properties._data.indexToShow

    document.querySelector(`[data-place-index="${index}"]`)?.classList.remove('active')

    Hint.close()
  })

  cluster.events.add('mouseenter', (e) => {
    // PlacePoint.click()
    if (e.get('target').getGeoObjects === undefined) {
      const index = e.get('target').properties._data.indexToShow

      document.querySelector(`[data-place-index="${index}"]`).classList.add('active')
    } else {
      const position = e.get('target').getOverlay()._value._view._lastPosition

      const theLowestPrice = e
        .get('target')
        .getGeoObjects()
        .sort((a, b) => {
          return parseInt(a.properties._data.hintContent) > parseInt(b.properties._data.hintContent) ? 1 : -1
        })

      const price = theLowestPrice[0].properties._data.hintContent

      Hint.open({ left: `${Math.floor(position[0]) + 22}px`, top: `${Math.floor(position[1]) - 19}px` }, price)
    }
  })
}
