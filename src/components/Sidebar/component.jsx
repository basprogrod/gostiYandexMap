import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import arrow from '../../assets/img/arrow.svg'
import { SMALL_SREEN } from '../../config/constants'
import dict from '../../config/dict'
import useWindowWidth from '../../hooks/useWindowWidth'
import Filter from '../Filter'
import Widget from '../Widget'

import './styles.scss'

const Sidebar = ({ adsArray, handleBackToFilters, map, width }) => {
  const { adsType, adsCount } = useSelector((state) => state)

  const [state, setState] = useState({
    isOpen: true,
  })

  if (!Sidebar.open) {
    Sidebar.open = () => {
      setState({ ...state, isOpen: true })
    }
  }

  useEffect(() => {
    return () => {
      delete Sidebar.open
    }
  }, [])

  const handleOpenCloseSidebar = () => {
    setState({ ...state, isOpen: !state.isOpen })
  }

  return (
    <div className={`yaps-sidebar ${state.isOpen ? 'open' : ''}`}>
      <button className="yaps-sidebar__open-btn" onClick={handleOpenCloseSidebar}>
        <img src={arrow} alt="" />
      </button>

      {!!adsArray.length && width > SMALL_SREEN && (
        <>
          <button className="yaps-sidebar__back-btn" onClick={handleBackToFilters}>
            <img src={arrow} alt="" />
            <span>{dict.widget.BACK_TO_FILTERS_BUTTON}</span>
          </button>

          <div className="yaps-sidebar__header">
            <span>{adsType}</span>
            <span>{adsCount} предложений</span>
          </div>
        </>
      )}

      {!adsArray.length ? (
        <Filter map={map} />
      ) : (
        <div className="yaps-sidebar__widget-container">
          {adsArray.map((ad, index) => (
            <Widget
              city={ad.city}
              id={ad.id}
              key={ad.id}
              index={index}
              address={ad.address}
              date={ad.createdAt}
              commonSquare={ad.area}
              descr={ad.roomAmount}
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
