import React, { useState } from 'react';
import styles from './generalSelect.scss';
import PropTypes from 'prop-types';

const GeneralSelect = ({ items, onChange, selectedIndex }) => {

  const handleChange = (index) => {
    onChange(index);
  }

  return (
    <div className={styles['cmpt-container']}>
      <select onChange={(e) => handleChange(e.target.value)} value={selectedIndex}>
        {
          items.map((item, index) => {
            return (
              <option value={`${index}`} key={index}>{item}</option>
            )
          })
        }
      </select>
    </div>
  )
}

GeneralSelect.defaultProps = {
  items: ['default'],
  onChange: () => {},
  selectedIndex: 0,
}

GeneralSelect.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  selectedIndex: PropTypes.string
}

export default GeneralSelect;