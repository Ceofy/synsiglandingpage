import React from 'react';
import styles from './topPanelStyles/verticalButtonsContainer.module.css';

const VerticalButtonsContainer = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default VerticalButtonsContainer;
