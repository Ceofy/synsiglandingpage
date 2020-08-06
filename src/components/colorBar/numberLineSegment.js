import React from 'react';
import PropTypes from 'prop-types';

import styles from './colorBarStyles/numberLineSegment.module.css';

const NumberLineSegment = (props) => {
  const classNames = [];
  classNames.push(styles.numberLineSegment);
  if (props.leftTick) {
    classNames.push(styles.leftTick);
  }
  if (props.rightTick) {
    classNames.push(styles.rightTick);
  }

  return (
    <div
      className={classNames.join(' ')}
      style={{
        borderTopColor: props.color,
        width: props.width,
        height: props.height,
      }}
    ></div>
  );
};

NumberLineSegment.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  leftTick: PropTypes.bool,
  rightTick: PropTypes.bool,
  color: PropTypes.string,
};

export default NumberLineSegment;
