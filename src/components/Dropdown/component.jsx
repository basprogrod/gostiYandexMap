import React, { useState } from 'react'
import dict from '../../config/dict'
import Arrow from '../svg/Arrow'
import CrossIcon from '../svg/CrossIcon'

import './styles.scss'

const chips = [
  {
    id: 'может и не быть id',
    type: 'Оснащение',
    items: ['name', 'longname', 'name with spaces'],
  },
  {
    id: 'может и не быть id',
    type: 'Для досуга',
    items: [
      'name1',
      'longname2',
      'name with spaces2',
      'longname3',
      'name with spaces3',
    ],
  },
  {
    id: 'может и не быть id',
    type: 'Для Kek',
    items: [
      'kek1',
      'longkek2',
      'name with kek spaces2',
      'longname3 kek',
      'name with kek spaces3',
    ],
  },
]

const Dropdown = ({ options = chips, onSelect, selectedOptions }) => {
  const [state, setState] = useState({ isOpen: false })

  const handleOpen = () => {
    setState({ ...state, isOpen: !state.isOpen })
  }

  return (
    <div className="yaps-dropdown">
      <ul className={`yaps-dropdown__list ${state.isOpen ? 'active' : ''}`}>
        {options.map((item, index) => (
          <li key={index} className="yaps-dropdown__item">
            <span className="yaps-dropdown__item-title">{item.type}</span>
            <span className="yaps-dropdown__item-chips">
              {item.items.map((el, index) => {
                const handleClick = () => {
                  onSelect(el)
                }
                return (
                  <button
                    key={index}
                    className={`yaps-dropdown__chip ${
                      selectedOptions.some((opt) => opt === el) ? 'active' : ''
                    }`}
                    onClick={handleClick}
                  >
                    <span>{el}</span>
                    <CrossIcon className="yaps-dropdown__chip-icon" />
                  </button>
                )
              })}
            </span>
          </li>
        ))}
      </ul>

      <button className="yaps-dropdown__open-btn" onClick={handleOpen}>
        <span>{dict.filter.MORE_OPTIONS}</span>
        <Arrow />
      </button>
    </div>
  )
}

export default Dropdown
