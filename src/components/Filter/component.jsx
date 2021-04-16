import React, { useState } from 'react'
import dict from '../../config/dict'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import './styles.scss'
import PlusIcon from '../svg/PlusIcon'
import MinusIcon from '../svg/MinusIcon'
import SearchIcon from '../svg/SearchIcon'
import Arrow from '../svg/Arrow'
import Dropdown from '../Dropdown/component'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const options1 = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const Filter = () => {
  const [state, setState] = useState({
    roomsValue: '1',
    priceRange: {
      from: '',
      to: '',
    },
    guestsNumber: 0,
    options: [],
  })

  const handleSelectChip = (value) => {
    const opts = [...state.options]
    const index = opts.findIndex((el) => el === value)

    if (index < 0) {
      opts.push(value)
    } else {
      opts.splice(index, 1)
    }

    setState((state) => ({
      ...state,
      options: opts,
    }))
  }

  const handleChoosePrice = (e) => {
    console.log(e.target.value)
    if (!/^\d+$|^$/.test(e.target.value)) return

    setState({
      ...state,
      priceRange: {
        ...state.priceRange,
        [e.target.dataset.field]: e.target.value,
      },
    })
  }

  const handleButtonChoose = (e) => {
    setState({ ...state, roomsValue: e.target.dataset.value })
  }

  const handleSetGuestsNumber = (e) => {
    if (state.guestsNumber < 0) {
      setState({
        ...state,
        guestsNumber: 0,
      })
      return
    } else {
      setState({
        ...state,
        guestsNumber: e.target.dataset.plus
          ? ++state.guestsNumber
          : --state.guestsNumber,
      })
    }
  }

  const handleChangeGuentsNumber = (e) => {
    console.log(e.target.value)
    if (!/^\d+$|^$/.test(e.target.value)) return
    setState({ ...state, guestsNumber: +e.target.value })
  }

  return (
    <div className="yaps-filter">
      <div className="yaps-filter__field">
        <div className="yaps-filter__field-title">{dict.filter.FLAT}</div>
        <Select
          className="yaps-filter__city-select yaps-filter__select"
          classNamePrefix="yaps"
          options={options}
          defaultValue={options[0]}
        />
      </div>
      <div className="yaps-filter__field">
        <Select
          className="yaps-filter__type-select yaps-filter__select"
          classNamePrefix="yaps"
          options={options1}
          defaultValue={options1[0]}
        />
      </div>
      <div className="yaps-filter__field">
        <div className="yaps-filter__field-title">{dict.filter.ROOMS}</div>
        <div className="yaps-filter__buttons-set">
          <button
            data-value="1"
            className={`${state.roomsValue === '1' ? 'active' : ''}`}
            onClick={handleButtonChoose}
          >
            1
          </button>
          <button
            data-value="2"
            className={`${state.roomsValue === '2' ? 'active' : ''}`}
            onClick={handleButtonChoose}
          >
            2
          </button>
          <button
            data-value="3"
            className={`${state.roomsValue === '3' ? 'active' : ''}`}
            onClick={handleButtonChoose}
          >
            3
          </button>
          <button
            data-value="4+"
            className={`${state.roomsValue === '4+' ? 'active' : ''}`}
            onClick={handleButtonChoose}
          >
            4+
          </button>
        </div>
      </div>
      <div className="yaps-filter__field">
        <div className="yaps-filter__field-title">{dict.filter.PRICE}</div>

        <div className="yaps-filter__inputs">
          <input
            type="text"
            value={state.priceRange.from}
            onChange={handleChoosePrice}
            data-field="from"
            placeholder={dict.filter.FROM}
          />
          <input
            type="text"
            value={state.priceRange.to}
            onChange={handleChoosePrice}
            data-field="to"
            placeholder={dict.filter.TO}
          />
          <span className="yaps-filter__field-price">BYN</span>
        </div>
      </div>
      <div className="yaps-filter__field">
        <div className="yaps-filter__field-title">{dict.filter.GUESTS}</div>
        <input
          type="text"
          className="yaps-filter__guests-input"
          value={state.guestsNumber > 0 ? state.guestsNumber : ''}
          onChange={handleChangeGuentsNumber}
        />
        <div className="yaps-filter__guests-buttons">
          <button data-minus onClick={handleSetGuestsNumber}>
            <MinusIcon />
          </button>
          <button data-plus onClick={handleSetGuestsNumber}>
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="yaps-filter__field btn">
        <button>
          <SearchIcon />
          <span>{dict.filter.SEARCH}</span>
        </button>
      </div>
      <Dropdown onSelect={handleSelectChip} selectedOptions={state.options} />
    </div>
  )
}

export default Filter
