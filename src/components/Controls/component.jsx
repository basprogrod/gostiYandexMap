import React from 'react'
import Edit from '../svg/Edit'
import ListIcon from '../svg/ListIcon'
import MapIcon from '../svg/MapIcon'

import './styles.scss'

const Controls = ({ isDrawning, handleToDraw = () => {} }) => {
  return (
    <div className="yaps-controls">
      <button
        className={`yaps-btn yaps-controls__btn ${isDrawning ? 'invert' : ''}`}
        onClick={handleToDraw}
      >
        <Edit />
        <span>{isDrawning ? 'Закончить рисование' : 'Нарисовать область'}</span>
      </button>
      <button className="yaps-btn yaps-controls__btn">
        <ListIcon />
        <span>Списком</span>
      </button>
      <button className="yaps-btn yaps-controls__btn active">
        <MapIcon />
        <span>На карте</span>
      </button>
    </div>
  )
}

export default Controls
