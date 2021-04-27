import React, { useEffect, useState } from 'react'
import CloseIcon from '../svg/CloseIcon'
import userIcon from '../../assets/img/user.svg'
import tg from '../../assets/img/tg.svg'
import vbr from '../../assets/img/vbr.svg'
import wts from '../../assets/img/wts.svg'
import geotag from '../../assets/img/geotag.svg'

import './styles.scss'
import { HOME, PHOTO_STORAGE_URL } from '../../config/constants'
import FavIcon from '../svg/FavIcon'

const onlyNumbs = (n) => {
  let res = ''

  for (const ch of n) {
    if ((+ch).toString() === 'NaN') continue
    res += ch
  }

  return res
}

const messengers = {
  tg: {
    icon: tg,
    link: 'https://telegram.me/',
    setLink(item) {
      return this.link + item.tgUser
    },
  },
  vb: {
    icon: vbr,
    // link: 'viber://chat?number=%2B',
    link: 'https://viber.click/',
    setLink(phone) {
      return this.link + onlyNumbs(phone)
    },
  },
  wt: {
    icon: wts,
    link: 'https://wapp.click/',
    setLink(phone) {
      return this.link + onlyNumbs(phone)
    },
  },
}

const Popup = ({ adsArray }) => {
  const [state, setState] = useState({
    isShow: false,
    isFav: false,
    ad: {},
  })

  Popup.open = (index, isFav = false) => {
    setState({ ...state, isShow: true, ad: adsArray[index], isFav })
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
      <div className={`yaps-popup ${state.isFav ? 'yaps-popup-fav' : ''}`} onClick={handleClosePopup}>
        <div className="yaps-popup__container" onClick={(e) => e.stopPropagation()}>
          <button className="yaps-popup__close-btn" onClick={handleClosePopup}>
            <CloseIcon />
          </button>
          <div className="yaps-popup__row">
            <div className="yaps-popup__tab">
              <b>{state.ad?.author.first_name}</b>
              <div className="yaps-popup__owner">
                <span>
                  <img src={userIcon} alt="" />
                  {state.ad?.author.subscription || 'Домовладелец'}
                </span>
                <span>ID: {state.ad.author.id}</span>
              </div>
            </div>
            <div className="yaps-popup__tab">
              {state.ad?.phones.map((item) => (
                <a key={item.id} className="yaps-popup__phlink" href={`tel:${item.text}`}>
                  <span>{item.text}</span>
                  {JSON.parse(item.messenger).map((el) => (
                    <a target="_blank" key={el} href={messengers[el].setLink(el === 'tg' ? item : item.text)}>
                      <img key={el} src={messengers[el].icon} alt="" />
                    </a>
                  ))}
                </a>
              ))}
            </div>
          </div>
          <div className="yaps-popup__row">
            <a href={`${HOME}/${state.ad?.city.slug}/${state.ad?.id}`} target="_blank" className="yaps-popup__cell ">
              <img className="yaps-popup__main-img" src={PHOTO_STORAGE_URL + state.ad?.photos[0].path} alt="" />
            </a>
            <div className="yaps-popup__cell descr">
              <div className="yaps-popup__price">
                <b>
                  <span>{state.ad?.price.daily}</span> {state.ad?.price.currency} / сутки
                </b>
                {state.isFav && (
                  <i>
                    <FavIcon />
                  </i>
                )}
              </div>
              <div className="yaps-popup__descr">
                <span>{state.ad?.roomAmount}</span>
                <span>
                  {state.ad?.area} м<sup>2</sup>
                </span>
                <span>
                  {state.ad?.floor} {`${state.ad?.floors ? `/ ${state.ad?.floors}` : ''}`} этаж
                </span>
              </div>
              <div className="yaps-popup__location">
                <img src={geotag} alt="" />
                <span>{state.ad?.address}</span>
              </div>

              <a className="yaps-popup__btn" href={`${HOME}/${state.ad?.city.slug}/${state.ad?.id}`} target="_blank">
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Popup
