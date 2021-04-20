import React, { useState } from 'react'
import arrow from '../../assets/img/arrow.svg'
import dict from '../../config/dict'
import Filter from '../Filter'
import Widget from '../Widget'

import './styles.scss'

const Sidebar = ({ adsArray, handleBackToFilters }) => {
  const [state, setState] = useState({
    isOpen: true,
  })
  const handleOpenCloseSidebar = () => {
    setState({ ...state, isOpen: !state.isOpen })
  }

  return (
    <div className={`yaps-sidebar ${state.isOpen ? 'open' : ''}`}>
      <button
        className="yaps-sidebar__open-btn"
        onClick={handleOpenCloseSidebar}
      >
        <img src={arrow} alt="" />
      </button>

      {!!adsArray.length && (
        <>
          <button
            className="yaps-sidebar__back-btn"
            onClick={handleBackToFilters}
          >
            <img src={arrow} alt="" />
            <span>{dict.widget.BACK_TO_FILTERS_BUTTON}</span>
          </button>

          <div className="yaps-sidebar__header">
            <span>Снять квартиру</span>
            <span>650 предложений</span>
          </div>
        </>
      )}

      {!adsArray.length ? (
        <Filter />
      ) : (
        <div className="yaps-sidebar__widget-container">
          {adsArray.map((ad) => (
            <Widget
              key={ad.id}
              adres={ad.name}
              date={ad.updated_at}
              commonSquare={55}
              descr={ad.description}
              price={ad.price?.daily}
              currency={ad.price?.currency}
              photos={ad.photos}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default Sidebar
