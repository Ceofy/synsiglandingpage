import React from 'react';
import PropTypes from 'prop-types';

import styles from './topPanelStyles/verticalTitle.module.css';

const VerticalTitle = (props) => (
  <div className={styles.titleDiv}>
    <h1>
      <span className={styles.title}>{props.title}</span>
      <span className={styles.subtitle}>{props.subtitle}</span>
    </h1>
  </div>
);

VerticalTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default VerticalTitle;
