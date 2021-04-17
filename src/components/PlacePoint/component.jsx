import React from 'react'
import Circle from '../svg/Circle'
import circle from '../../assets/img/circle.svg'

import './styles.scss'

const PlacePoint = ({ data }) => {
  return (
    <button className="yaps-placemarck" onMouseOver={() => console.log(123)}>
      <span className="yaps-placemarck__number">{data.index}</span>
      <span className="yaps-placemarck__image">
        {/* <Circle /> */}
        <img src={circle} alt="" />
      </span>
    </button>
  )
}

export default PlacePoint
