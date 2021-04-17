import React, { useEffect, useRef, useState } from 'react'
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
  // {
  //   id: 'может и не быть id',
  //   type: 'Для Kek',
  //   items: [
  //     'kek1',
  //     'longkek2',
  //     'name with kek spaces2',
  //     'longname3 kek',
  //     'name with kek spaces3',
  //   ],
  // },
]

const Dropdown = ({ options, onSelect, selectedOptions, unsetChips }) => {
  const listRef = useRef(null)
  const [state, setState] = useState({ isOpen: false })

  const handleOpen = () => {
    const height = listRef.current.scrollHeight + 'px'

    if (state.isOpen) {
      listRef.current.style.height = '0px'
    } else {
      listRef.current.style.height = height
    }

    setState({ ...state, isOpen: !state.isOpen })
    unsetChips()
  }

  return (
    <div className="yaps-dropdown">
      <ul
        ref={listRef}
        className={`yaps-dropdown__list ${state.isOpen ? 'active' : ''}`}
      >
        {options.map((item) => (
          <li key={item.id} className="yaps-dropdown__item">
            <span className="yaps-dropdown__item-title">{item.name}:</span>
            <span className="yaps-dropdown__item-chips">
              {item.children.map((el, index) => {
                const handleClick = () => {
                  onSelect(el.id)
                }
                return (
                  <button
                    key={index}
                    className={`yaps-dropdown__chip ${
                      selectedOptions.some((opt) => opt === el.id)
                        ? 'active'
                        : ''
                    }`}
                    onClick={handleClick}
                  >
                    <span>{el.name}</span>
                    <CrossIcon className="yaps-dropdown__chip-icon" />
                  </button>
                )
              })}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`yaps-dropdown__open-btn ${state.isOpen ? 'active' : ''}`}
        onClick={handleOpen}
      >
        <span>
          {state.isOpen ? dict.filter.LESS_OPTIONS : dict.filter.MORE_OPTIONS}
        </span>
        <Arrow />
      </button>
    </div>
  )
}

export default Dropdown
