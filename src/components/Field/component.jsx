import React from 'react'

const Field = ({ title, children }) => {
  return (
    <div className="yaps-filter-field">
      {title && <div className="yaps-filter-field__title">{title}</div>}
    </div>
  )
}

export default Field
