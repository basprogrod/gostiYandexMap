import Hint from '../components/Hint/component'

export default (cluster) => {
  cluster.events.add('mouseleave', () => Hint.close())

  cluster.events.add('mouseenter', (e) => {
    if (e.get('target').getGeoObjects === undefined) return

    const position = e.get('target').getOverlay()._value._view._lastPosition

    const theLowestPrice = e
      .get('target')
      .getGeoObjects()
      .sort((a, b) => {
        return parseInt(a.properties._data.hintContent) > parseInt(b.properties._data.hintContent) ? 1 : -1
      })

    const price = theLowestPrice[0].properties._data.hintContent

    Hint.open({ left: `${Math.floor(position[0]) + 22}px`, top: `${Math.floor(position[1]) - 19}px` }, price)
  })
}
