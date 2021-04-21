import React, { useState } from 'react'
import { SMALL_SREEN } from '../../config/constants'
import useWindowWidth from '../../hooks/useWindowWidth'
import Edit from '../svg/Edit'
import ListIcon from '../svg/ListIcon'
import MapIcon from '../svg/MapIcon'

import './styles.scss'

const Controls = ({ handleShowCloseFilter, isShowFilter }) => {
  const width = useWindowWidth()

  return (
    <div className={`yaps-controls ${width < SMALL_SREEN ? 'mobile' : ''}`}>
      {width < SMALL_SREEN && (
        <button
          className="yaps-btn yaps-controls__btn"
          onClick={handleShowCloseFilter}
        >
          <span>{isShowFilter ? 'Карта' : 'Фильтры'}</span>
        </button>
      )}
      <button className="yaps-btn yaps-controls__btn">
        <ListIcon />
        <span>Списком</span>
      </button>
      {/* <button className="yaps-btn yaps-controls__btn active">
        <MapIcon />
        <span>На карте</span>
      </button> */}
    </div>
  )
}

export default Controls
