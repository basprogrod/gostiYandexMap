import React from 'react'
import Circle from '../svg/Circle'
import logoIcon from '../../assets/img/logoIcon.svg'

import './styles.scss'

const PlacePoint = ({ data }) => {
  return (
    <button className="yaps-placemarck">
      <div data-place-index={data.index} className="yaps-placemarck__hint">
        {data.price}
      </div>
      <div className="yaps-placemarck__logo-image">
        <img src={logoIcon} alt="" />
      </div>
      <span className="yaps-placemarck__number">1</span>

      <span className="yaps-placemarck__image">
        <Circle />
      </span>
    </button>
  )
}

export default PlacePoint
