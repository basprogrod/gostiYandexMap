import React, { useEffect, useState } from 'react'
import onGetPosition from '../utils/onGetPosition'
import onErrorGetPosition from '../utils/onErrorGetPosition'

import { useDispatch } from 'react-redux'
import getFiteredData from '../../store/thunks/getFiteredData'

import './styles.scss'
import Sidebar from '../Sidebar'
import getOptions from '../../store/thunks/getOptions'
import getCities from '../../store/thunks/getCities'

const App = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    map: null,
    pol: null,
    isDrawning: false,
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
  }, [])

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
