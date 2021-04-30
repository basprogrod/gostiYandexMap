import React, { useState } from 'react'

import './styles.scss'

const initState = {
  isShow: false,
  position: { left: '500px', top: '500px' },
  price: '',
}

const Hint = () => {
  const [state, setState] = useState(initState)

  Hint.open = (position, price) => {
    setState({ position, price, isShow: true })
  }

  Hint.close = () => setState(initState)

  return (
    <div className="yaps-hint">
      {state.isShow && (
        <div style={{ left: state.position.left, top: state.position.top }} className="yaps-hint__panel">
          от {state.price}
        </div>
      )}
    </div>
  )
}

export default Hint
