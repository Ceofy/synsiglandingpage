import React from 'react';
import PropTypes from 'prop-types';

import styles from './colorBarStyles/numberSegment.module.css';

const NumberSegment = (props) => {
  return (
    <div className={styles.numberSegment} style={{ minWidth: props.width }}>
      {props.value}
    </div>
  );
};

NumberSegment.propTypes = {
  value: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default NumberSegment;
