import React from 'react';
import PropTypes from 'prop-types';

import styles from './componentStyles/panel.module.css';

const Panel = (props) => (
  <div
    className={styles.container}
    style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
  >
    {props.children}
  </div>
);

Panel.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

Panel.defaultProps = {
  backgroundColor: 'white',
  textColor: 'rgba(0, 0, 0, 0,8)',
};

export default Panel;
