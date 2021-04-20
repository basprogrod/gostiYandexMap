import React from 'react'
import dict from '../../config/dict'
import Slider from 'react-slick'

import square from '../../assets/img/squareIcon.svg'

import './styles.scss'
import StarIcon from '../svg/StarIcon'

const Widget = ({
  address,
  date,
  commonSquare,
  descr,
  price,
  currency,
  photos,
}) => {
  // const {}
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div className="yaps-widget">
      <div className="yaps-widget__body">
        <Slider {...settings}>
          {photos.map((ph) => (
            <div key={ph.id}>
              <div className="yaps-widget__slide">
                <img src={`https://gosti24.by/storage/${ph.path}`} alt="" />
              </div>
            </div>
          ))}
        </Slider>

        <div className="yaps-widget__fields">
          <div className="yaps-widget__field">
            <div className="yaps-widget__cell">{address}</div>
            <div className="yaps-widget__cell yaps-widget__cell-grey">
              {date}
            </div>
          </div>
          <div className="yaps-widget__field">
            <div className="yaps-widget__cell">{descr}</div>
            <div className="yaps-widget__cell">
              <img src={square} alt="" />
              <span>
                {commonSquare} м<sup>2</sup>
              </span>
            </div>
          </div>
          <div className="yaps-widget__field">
            <div className="yaps-widget__cell">
              <button className="yaps-widget__to-fav-btn">
                <span>
                  <StarIcon />
                </span>
                В избранное
              </button>
            </div>
            <div className="yaps-widget__cell">
              <span>
                {price} {currency} / 1 сут.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="yaps-widget__footer">
        <button className="yaps-widget__show-phone-btn">
          {dict.widget.BUTTON}
        </button>
      </div>
    </div>
  )
}

export default Widget
