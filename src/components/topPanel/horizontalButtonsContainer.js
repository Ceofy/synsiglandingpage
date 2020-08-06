import React from 'react';
import styles from './componentStyles/horizontalButtonsContainer.module.css';

const HorizontalButtonsContainer = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default HorizontalButtonsContainer;
