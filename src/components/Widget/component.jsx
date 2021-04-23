import React, { useEffect, useState } from 'react'
import dict from '../../config/dict'
import Slider from 'react-slick'

import square from '../../assets/img/squareIcon.svg'
import sliderArrow from '../../assets/img/sliderArrow.svg'

import './styles.scss'
import StarIcon from '../svg/StarIcon'
import Popup from '../Popup'
import { PHOTO_STORAGE_URL } from '../../config/constants'
import { useDispatch } from 'react-redux'
import addToFav from '../../store/thunks/addToFav'
import removeFromFav from '../../store/thunks/removeFromFav'

const Widget = ({ address, date, commonSquare, descr, price, currency, photos, index, id, fav = false }) => {
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
        <img src={sliderArrow} alt="назад" />
      </span>
    ),
    nextArrow: (
      <span>
        <img src={sliderArrow} alt="вперед" />
      </span>
    ),
  }

  const hendleOpenPopup = () => {
    Popup.open && Popup.open(index)
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
                <img src={PHOTO_STORAGE_URL + ph.path} alt="" />
              </div>
            </div>
          ))}
        </Slider>

        <div className="yaps-widget__fields">
          <div className="yaps-widget__field">
            <div className="yaps-widget__cell">{address}</div>
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
        <button className="yaps-widget__show-phone-btn" onClick={hendleOpenPopup}>
          {dict.widget.BUTTON}
        </button>
      </div>
    </div>
  )
}

export default Widget
