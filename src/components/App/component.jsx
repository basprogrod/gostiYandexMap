import React, { useEffect, useState } from 'react'
import onGetPosition from '../utils/onGetPosition'
import onErrorGetPosition from '../utils/onErrorGetPosition'

import { useDispatch, useSelector } from 'react-redux'
import getFiteredData from '../../store/thunks/getFiteredData'

import './styles.scss'
import Sidebar from '../Sidebar'
import getOptions from '../../store/thunks/getOptions'
import getCities from '../../store/thunks/getCities'
import getAdTypes from '../../store/thunks/getAdTypes'
import createAdPoints from '../utils/createAdPoints'

const App = () => {
  const { ads } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    map: null,
    isLoading: true,
  })

  const init = () => {
    navigator.geolocation.getCurrentPosition(
      (e) => onGetPosition(state, setState, e),
      (e) => onErrorGetPosition(state, setState, e)
    )
  }

  useEffect(() => {
    ymaps.ready(init)
  }, [])

  useEffect(() => {
    dispatch(getOptions())
    dispatch(getCities())
    dispatch(getAdTypes())
  }, [])

  useEffect(() => {
    if (!ads.length) return
    createAdPoints(ads, state.map)
  }, [ads])

  return (
    <>
      {state.isLoading && (
        <div className="loader">
          <div className="span">loading...</div>
        </div>
      )}
      {/* <Controls handleToDraw={handleToDraw} isDrawning={state.isDrawning} /> */}
      <Sidebar />
      <div id="g-map"></div>
    </>
  )
}

export default App
