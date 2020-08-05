import React from 'react';
import styles from './componentStyles/topPanel.module.css';

const TopPanel = ({ children }) => (
  <div className={styles.background}>
    <div className={styles.container}>
      <div className={styles.contents}>{children}</div>
    </div>
  </div>
);

export default TopPanel;
