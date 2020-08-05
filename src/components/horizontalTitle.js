import React from 'react';
import PropTypes from 'prop-types';

import styles from './componentStyles/horizontalTitle.module.css';

const HorizontalTitle = (props) => (
  <>
    <h1 className={styles.title}>{props.title}</h1>
    <div className={styles.subtitle}>{props.subtitle}</div>
  </>
);

HorizontalTitle.propTypes = {
  title: [PropTypes.string, PropTypes.node],
  subtitle: [PropTypes.string, PropTypes.node],
};

export default HorizontalTitle;
