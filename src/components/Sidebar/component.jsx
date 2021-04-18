import React, { useState } from 'react'
import arrow from '../../assets/img/arrow.svg'
import Filter from '../Filter'
import Widget from '../Widget'

import './styles.scss'

const Sidebar = () => {
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

      <Filter />

      {/* <Widget /> */}
    </div>
  )
}
export default Sidebar
