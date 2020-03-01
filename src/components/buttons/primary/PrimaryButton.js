import React, { useState } from 'react';
import styles from './primiaryButton.scss';
import PropTypes from 'prop-types';

const PrimaryButton = ({ title, loading, styleProps, onClick }) => {

  const [ opacity, setOpacity ] = useState(1);

  const { btnStyles, containerStyle } = styleProps;

  return (
    <div className={`${styles['cmpt-container']} ${containerStyle || ''}`}>
      <button
        style={{ opacity }}
        className={`${styles['btn-style']} ${btnStyles || ''}`}
        onMouseOver={() => setOpacity(0.8)}
        onMouseOut={() => setOpacity(1)}
        disabled={loading}
        onClick={onClick}
      >
        {title}
      </button>

    </div>
  )
}


PrimaryButton.defaultProps = {
  title: '',
  loading: false,
  styleProps: {},
  onClick: () => {}
}

PrimaryButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  styleProps: PropTypes.object,
  onClick: PropTypes.func
}

export default PrimaryButton;