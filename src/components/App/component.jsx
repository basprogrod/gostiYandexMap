import React, { useEffect, useState } from 'react'
import onGetPosition from '../utils/onGetPosition'
import onErrorGetPosition from '../utils/onErrorGetPosition'

import { useDispatch, useSelector } from 'react-redux'
import getFiteredData from '../../store/thunks/getFiteredData'

import './styles.scss'
import Sidebar from '../Sidebar'
import Controls from '../Controls'
import getOptions from '../../store/thunks/getOptions'
import getCities from '../../store/thunks/getCities'
import getAdTypes from '../../store/thunks/getAdTypes'
import createAdPoints from '../utils/createAdPoints'

const App = () => {
  const { ads, loading } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    map: null,
    isLoading: true,
    adsToShow: [],
    points: [],
    cluster: undefined,
  })

  const init = () => {
    navigator.geolocation.getCurrentPosition(
      (e) => onGetPosition(state, setState, e),
      (e) => onErrorGetPosition(state, setState, e)
    )
  }

  const handleBackToFilters = () => {
    setState((state) => ({ ...state, adsToShow: [] }))
    // console.log('-> state.cluster', state.cluster.getClusters())
  }

  useEffect(() => {
    ymaps.ready(init)
  }, [])

  useEffect(() => {
    if (state.isLoading) return
    dispatch(getOptions())
    dispatch(getCities())
    dispatch(getAdTypes())
    dispatch(
      getFiteredData({
        type: 'flat',
        // city: 'Минск',
      })
    )
  }, [state.isLoading])

  useEffect(() => {
    if (!ads.length) return
    // console.log('ads', ads)
    createAdPoints(ads, state, setState)
  }, [ads])

  return (
    <>
      {state.isLoading && (
        <div className="loader">
          <div className="span">loading...</div>
        </div>
      )}
      <Controls handleToDraw={() => {}} />
      <Sidebar
        handleBackToFilters={handleBackToFilters}
        adsArray={state.adsToShow}
        map={state.map}
      />
      <div id="g-map" className={loading ? 'load' : ''}></div>
    </>
  )
}

export default App
