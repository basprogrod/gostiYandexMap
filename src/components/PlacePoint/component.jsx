import React from 'react'
import Circle from '../svg/Circle'

import './styles.scss'

const PlacePoint = ({ data }) => {
  return (
    <div className="yaps-placemarck" onMouseOver={() => console.log(123)}>
      <span className="yaps-placemarck__number">{data.index}</span>
      <span className="yaps-placemarck__image">
        <Circle />
      </span>
    </div>
  )
}

export default PlacePoint
