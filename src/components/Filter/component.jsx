import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dict from '../../config/dict'
import Select from 'react-select'
import PlusIcon from '../svg/PlusIcon'
import MinusIcon from '../svg/MinusIcon'
import SearchIcon from '../svg/SearchIcon'
import Dropdown from '../Dropdown/component'
import getFiteredData from '../../store/thunks/getFiteredData'
import { filterFields, SMALL_SREEN, MAX_PRICE_LENGTH } from '../../config/constants'
import Loader from '../Loader/component'

import './styles.scss'

const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#ffdf2c',
    primary: '#19a24b',
    primary50: '#ffdf2c',
  },
})

const { CITY, TYPE, ROOM_NUMBER, FROM, TO, OPTIONS, VISITORS } = filterFields

const Filter = ({ map, handleShowCloseFilter, width }) => {
  const dispatch = useDispatch()
  const { options, cities, types, loading } = useSelector((state) => state)

  const [state, setState] = useState({
    [ROOM_NUMBER]: '', // TODO,
    [FROM]: '',
    [TO]: '',
    [TYPE]: 'flat',
    [VISITORS]: 1,
    [OPTIONS]: [],
    [CITY]: '',
  })

  const handleSelectChip = (value) => {
    const opts = [...state[OPTIONS]]
    const index = opts.findIndex((el) => el === value)

    if (index < 0) {
      opts.push(value)
    } else {
      opts.splice(index, 1)
    }

    setState((state) => ({
      ...state,
      [OPTIONS]: opts,
    }))
  }

  const handleUnsetChips = () => {
    setState((state) => ({
      ...state,
      [OPTIONS]: [],
    }))
  }

  const handleChoosePrice = (e) => {
    if (e.target.value.length > MAX_PRICE_LENGTH) return
    if (!/^\d+$|^$/.test(e.target.value)) return

    setState({
      ...state,
      [e.target.dataset.field]: e.target.value,
    })
  }

  const handleButtonChoose = (e) => {
    if (e.target.dataset.value === state[ROOM_NUMBER]) {
      setState({ ...state, [ROOM_NUMBER]: '' })
      return
    }

    setState({ ...state, [ROOM_NUMBER]: e.target.dataset.value })
  }

  const handleSetGuestsNumber = (e) => {
    setState({
      ...state,
      [VISITORS]: e.target.dataset.plus ? ++state[VISITORS] : --state[VISITORS],
    })

    if (state.visitors <= 0) {
      setState({
        ...state,
        [VISITORS]: 0,
      })
    }
  }

  const handleChangeGuentsNumber = (e) => {
    console.log(e.target.value)
    if (!/^\d+$|^$/.test(e.target.value)) return
    setState({ ...state, [VISITORS]: +e.target.value })
  }

  const handleCitiesSelectChange = (e) => {
    setState((state) => ({ ...state, [CITY]: e.value }))
  }

  const handleTypesSelectChange = (e) => {
    setState((state) => ({ ...state, [TYPE]: e.value }))
  }

  const handleSubmifFilter = () => {
    if (loading) return
    if (width < SMALL_SREEN) handleShowCloseFilter()
    map.geoObjects.removeAll()
    dispatch(getFiteredData(state))
  }

  return (
    <div className="yaps-filter">
      {/* <div className="yaps-filter__field">
        <div className="yaps-filter__field-title">{dict.filter.FLAT}</div>
        <Select
          className="yaps-filter__city-select yaps-filter__select"
          classNamePrefix="yaps"
          options={cities}
          // defaultValue={}
          theme={theme}
          placeholder="Выберите город"
          onChange={handleCitiesSelectChange}
        />
      </div> */}
      <div className="yaps-filter__field">
        {!!types.length && <Select className="yaps-filter__type-select" classNamePrefix="yaps" options={types} theme={theme} defaultValue={types[0]} onChange={handleTypesSelectChange} />}
      </div>
      <div className="yaps-filter__field">
        <div className="yaps-filter__field-title">{dict.filter.ROOMS}</div>
        <div className="yaps-filter__buttons-set">
          <button data-value="1" className={`${state[ROOM_NUMBER] === '1' ? 'active' : ''}`} onClick={handleButtonChoose}>
            1
          </button>
          <button data-value="2" className={`${state[ROOM_NUMBER] === '2' ? 'active' : ''}`} onClick={handleButtonChoose}>
            2
          </button>
          <button data-value="3" className={`${state[ROOM_NUMBER] === '3' ? 'active' : ''}`} onClick={handleButtonChoose}>
            3
          </button>
          <button data-value="4+" className={`${state[ROOM_NUMBER] === '4+' ? 'active' : ''}`} onClick={handleButtonChoose}>
            4+
          </button>
        </div>
      </div>
      <div className="yaps-filter__field">
        <div className="yaps-filter__field-title">{dict.filter.PRICE}</div>

        <div className="yaps-filter__inputs">
          <input type="text" value={state[FROM]} onChange={handleChoosePrice} data-field={FROM} placeholder={dict.filter.FROM} />
          <input type="text" value={state[TO]} onChange={handleChoosePrice} data-field={TO} placeholder={dict.filter.TO} />
          <span className="yaps-filter__field-price">BYN</span>
        </div>
      </div>
      <div className="yaps-filter__field">
        <div className="yaps-filter__field-title">{dict.filter.GUESTS}</div>
        <input type="text" className="yaps-filter__guests-input" value={state[VISITORS] > 0 ? state[VISITORS] : ''} onChange={handleChangeGuentsNumber} />
        <div className="yaps-filter__guests-buttons">
          <button data-minus onClick={handleSetGuestsNumber}>
            <MinusIcon />
          </button>
          <button data-plus onClick={handleSetGuestsNumber}>
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="yaps-filter__field yaps-filer__btn">
        <button onClick={handleSubmifFilter}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <SearchIcon /> <span>{dict.filter.SEARCH}</span>
            </>
          )}
        </button>
      </div>
      <Dropdown options={options} onSelect={handleSelectChip} selectedOptions={state[OPTIONS]} unsetChips={handleUnsetChips} />
    </div>
  )
}

export default Filter
