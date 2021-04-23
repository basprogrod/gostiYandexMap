import React, { useEffect, useState } from 'react'
import onGetPosition from '../../utils/onGetPosition'
import { useDispatch, useSelector } from 'react-redux'
import getFiteredData from '../../store/thunks/getFiteredData'
import Sidebar from '../Sidebar'
import Controls from '../Controls'
import getOptions from '../../store/thunks/getOptions'
import getCities from '../../store/thunks/getCities'
import getAdTypes from '../../store/thunks/getAdTypes'
import createAdPoints from '../../utils/createAdPoints'
import useWindowWidth from '../../hooks/useWindowWidth'
import { SMALL_SREEN } from '../../config/constants'
import Widget from '../Widget'
import Filter from '../Filter'
import Loader from '../Loader/component'

import './styles.scss'
import Popup from '../Popup'
import setMapsControlsPosition from '../../utils/setMapsControlsPosition'
import Hint from '../Hint/component'
import hintDisplayer from '../../utils/hintDisplayer'

const App = () => {
  const width = useWindowWidth()

  const { ads, loading } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    map: null,
    isLoading: true,
    adsToShow: [],
    cluster: undefined,
    isShowFilter: false,
  })

  const init = () => {
    navigator.geolocation.getCurrentPosition(
      (e) => onGetPosition(state, setState, e),
      (e) => onGetPosition(state, setState, e)
    )
  }

  const handleBackToFilters = () => {
    setState((state) => ({ ...state, adsToShow: [] }))
  }

  const handleShowCloseFilter = () => {
    setState((state) => ({ ...state, isShowFilter: !state.isShowFilter }))
  }

  useEffect(() => {
    console.log('INIT YAPS')
    ymaps.ready(init)
  }, [])

  useEffect(() => {
    if (width < SMALL_SREEN) {
      setState({ ...state, adsToShow: ads })
    }
  }, [width, ads])

  useEffect(() => {
    dispatch(getOptions())
    dispatch(getCities())
    dispatch(getAdTypes())
    dispatch(getFiteredData({ type: 'flat' }))
  }, [])

  useEffect(() => {
    if (!ads.length) return
    createAdPoints(ads, state, setState)
  }, [ads])

  useEffect(() => {
    if (!state.cluster) return

    hintDisplayer(state.cluster)
  }, [state.cluster])

  useEffect(() => {
    setMapsControlsPosition(width, state.map)
  }, [width, state.map])

  return (
    <>
      <Hint />
      <Popup adsArray={state.adsToShow} />
      {state.isLoading && (
        <div className="loader">
          <div className="span">loading...</div>
        </div>
      )}
      <Controls handleShowCloseFilter={handleShowCloseFilter} isShowFilter={state.isShowFilter} width={width} />
      {width > SMALL_SREEN ? (
        <Sidebar width={width} handleBackToFilters={handleBackToFilters} adsArray={state.adsToShow} map={state.map} />
      ) : (
        !!state.adsToShow.length &&
        !state.isShowFilter && (
          <div className="yaps__ads">
            {state.adsToShow.map((ad, index) => (
              <Widget
                id={ad.id}
                index={index}
                key={ad.id}
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
        )
      )}

      {state.isShowFilter && <Filter map={map} handleShowCloseFilter={handleShowCloseFilter} width={width} />}

      <div id="g-map" className={loading ? 'load' : ''}>
        {loading && (
          <div className="yaps-loader-container">
            <Loader />
          </div>
        )}
      </div>
    </>
  )
}

export default App
