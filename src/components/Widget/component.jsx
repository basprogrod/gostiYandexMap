import React from 'react'
import dict from '../../config/dict'
import Slider from 'react-slick'

import square from '../../assets/img/squareIcon.svg'

import './styles.scss'
import StarIcon from '../svg/StarIcon'

const Widget = ({ data }) => {
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
      <div className="yaps-widget__header">
        <span>Снять квартиру</span>
        <span>650 предложений</span>
      </div>
      <div className="yaps-widget__body">
        <Slider {...settings}>
          <div>
            <div className="yaps-widget__slide">
              <img
                src="https://im0-tub-by.yandex.net/i?id=37ddd5bae705676debe7686e3e1fffff&n=13"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="yaps-widget__slide">
              <img
                src="https://im0-tub-by.yandex.net/i?id=37ddd5bae705676debe7686e3e1fffff&n=13"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="yaps-widget__slide">
              <img
                src="https://im0-tub-by.yandex.net/i?id=37ddd5bae705676debe7686e3e1fffff&n=13"
                alt=""
              />
            </div>
          </div>
        </Slider>

        <div className="yaps-widget__fields">
          <div className="yaps-widget__field">
            <div className="yaps-widget__cell">ЖК «Каскад», 2/6 этаж</div>
            <div className="yaps-widget__cell">24/11/2020</div>
          </div>
          <div className="yaps-widget__field">
            <div className="yaps-widget__cell">2-комн. кв-ра</div>
            <div className="yaps-widget__cell">
              <img src={square} alt="" />
              <span>
                56 м<sup>2</sup>
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
              <img src={square} alt="" />
              <span>
                56 м<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="yaps-widget__footer">
        <button>{dict.widget.BUTTON}</button>
      </div>
    </div>
  )
}

export default Widget

//"yaps-widget__back-btn">
//          <img src={arrow} alt="" />
//          <span>{dict.widget.BACK_TO_FILTERS_BUTTON}</span>
//        </button>
