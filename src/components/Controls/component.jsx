import React from 'react'
import Edit from '../svg/Edit'
import ListIcon from '../svg/ListIcon'
import MapIcon from '../svg/MapIcon'

import './styles.scss'

const Controls = ({
  handleAnebleToDraw = () => {},
  handleDiableToDraw = () => {},
}) => {
  return (
    <div className="yaps-controls">
      <button
        className="yaps-btn yaps-controls__btn"
        onClick={handleAnebleToDraw}
      >
        <Edit />
        <span>Нарисовать область</span>
      </button>
      <button
        className="yaps-btn yaps-controls__btn"
        onClick={handleDiableToDraw}
      >
        <ListIcon />
        <span>Списком</span>
      </button>
      <button
        className="yaps-btn yaps-controls__btn active"
        onClick={handleDiableToDraw}
      >
        <MapIcon />
        <span>На карте</span>
      </button>
    </div>
  )
}

export default Controls
