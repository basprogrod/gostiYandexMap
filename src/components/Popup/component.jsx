import React, { useEffect, useState } from 'react'
import CloseIcon from '../svg/CloseIcon'
import userIcon from '../../assets/img/user.svg'
import tg from '../../assets/img/tg.svg'
import vbr from '../../assets/img/vbr.svg'
import wts from '../../assets/img/wts.svg'
import geotag from '../../assets/img/geotag.svg'

import './styles.scss'

const Popup = () => {
  const [state, setState] = useState({
    isShow: false,
    name: '',
    role: '',
    id: '',
    phones: ['', ''],
    price: '',
    currency: '',
  })
  Popup.open = () => {
    setState({ ...state, isShow: true })
  }

  useEffect(() => {
    //Рефу добавить с установкой класса
    return () => {
      delete Popup.open
    }
  }, [])

  const handleClosePopup = () => {
    setState({ ...state, isShow: false })
  }

  return (
    state.isShow && (
      <div className="yaps-popup" onClick={handleClosePopup}>
        <div className="yaps-popup__container" onClick={(e) => e.stopPropagation()}>
          <button className="yaps-popup__close-btn" onClick={handleClosePopup}>
            <CloseIcon />
          </button>
          <div className="yaps-popup__row">
            <div className="yaps-popup__tab">
              <b>Анастасия Васильевна</b>
              <div className="yaps-popup__owner">
                <span>
                  <img src={userIcon} alt="" />
                  Домовладелец
                </span>
                <span>ID: 24675665</span>
              </div>
            </div>
            <div className="yaps-popup__tab">
              <a className="yaps-popup__phlink" href="tel:+375336268287">
                <span>+375 (33) 626-82-87</span>
                <img src={tg} alt="" />
              </a>
              <a className="yaps-popup__phlink" href="tel:+375336268287">
                <span>+375 (33) 626-82-87</span>
                <img src={wts} alt="" />
                <img src={vbr} alt="" />
              </a>
            </div>
          </div>
          <div className="yaps-popup__row">
            <div className="yaps-popup__cell ">
              <img className="yaps-popup__main-img" src="https://rf-onlinegame.ucoz.net/40s1_rf_online.jpg" alt="" />
            </div>
            <div className="yaps-popup__cell descr">
              <div className="yaps-popup__price">
                <span>142</span> BYN / сутки
              </div>
              <div className="yaps-popup__descr">
                <span>2-комн. квартира</span>
                <span>
                  56 м<sup>2</sup>
                </span>
                <span>2/6 этаж</span>
              </div>
              <div className="yaps-popup__location">
                <img src={geotag} alt="" />
                <span>г.Минск, п-т Партиза</span>
              </div>

              <button className="yaps-popup__btn">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Popup
