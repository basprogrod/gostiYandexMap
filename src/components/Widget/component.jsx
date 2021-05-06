import React, { useEffect, useState } from 'react'
import dict from '../../config/dict'
import Slider from 'react-slick'

import square from '../../assets/img/squareIcon.svg'
import sliderArrow from '../../assets/img/sliderArrow.svg'

import './styles.scss'
import Popup from '../Popup'
import { HOME, PHOTO_STORAGE_URL } from '../../config/constants'
import { useDispatch } from 'react-redux'
import addToFav from '../../store/thunks/addToFav'
import removeFromFav from '../../store/thunks/removeFromFav'
import FavIcon from '../svg/FavIcon'

const Widget = ({ address, date, commonSquare, descr, price, currency, photos, index, id, fav = false, city }) => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    isItFav: false,
  })

  useEffect(() => {
    setState({ ...state, isItFav: fav })
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <span>
        <img className="yasp-slider-arrow yasp-slider-arrow__left" src={sliderArrow} alt="назад" />
      </span>
    ),
    nextArrow: (
      <span>
        <img className="yasp-slider-arrow yasp-slider-arrow__right" src={sliderArrow} alt="вперед" />
      </span>
    ),
  }

  const hendleOpenPopup = () => {
    Popup.open && Popup.open(index, state.isItFav)
  }

  const handleAddToFav = () => {
    if (state.isItFav) {
      dispatch(removeFromFav(id))
    } else {
      dispatch(addToFav(id))
    }

    setState({ ...state, isItFav: !state.isItFav })
  }
  return (
    <div className="yaps-widget">
      <div className="yaps-widget__body">
        <Slider {...settings}>
          {photos.map((ph) => (
            <div key={ph.id}>
              <div className="yaps-widget__slide">
                <a href={`${HOME + city.slug}/${id}`} target="_blank">
                  <img src={PHOTO_STORAGE_URL + ph.path} alt="" />
                </a>
              </div>
            </div>
          ))}
        </Slider>

        <div className="yaps-widget__fields">
          <div className="yaps-widget__field">
            <div className="yaps-widget__cell">
              <a target="_blank" href={`${HOME + city.slug}/${id}`}>
                {address}
              </a>
            </div>
            <div className="yaps-widget__cell yaps-widget__cell-grey">{date}</div>
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
              <button className={`yaps-widget__to-fav-btn ${state.isItFav ? 'active' : ''}`} onClick={handleAddToFav}>
                <span>
                  <FavIcon />
                </span>
                {state.isItFav ? 'В избранном' : 'В избранное'}
              </button>
            </div>
            <div className="yaps-widget__cell yaps-widget__cell-price">
              <span>
                {price} {currency} / 1 сут.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="yaps-widget__footer">
        <button className="yaps-widget__show-phone-btn" onClick={hendleOpenPopup}>
          <b>{dict.widget.BUTTON}</b>
        </button>
        <a className="yaps-widget__show-phone-btn yaps-widget__show-phone-btn-o" href={`${HOME + city.slug}/${id}`} target="_blank">
          <b>{dict.widget.BUTTON_MORE}</b>
        </a>
      </div>
    </div>
  )
}

export default Widget
