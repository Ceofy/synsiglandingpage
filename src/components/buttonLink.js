import React from 'react';
import PropTypes from 'prop-types';

import styles from './componentStyles/buttonLink.module.css';

const ButtonLink = (props) => (
  <span>
    <div className={props.tooltip ? styles.tooltip : ''}>
      <div className={props.vertical ? styles.vertical : styles.horizontal}>
        <a
          target={props.anchor ? '' : '_blank'}
          rel='noopener noreferrer'
          href={props.link}
          className={props.vertical ? styles.vertical : styles.horizontal}
          onClick={props.onClick}
        >
          <button type='submit'>
            <span className={styles.buttonText}>{props.text}</span>
          </button>
        </a>
      </div>
      <span
        className={[
          styles.tooltipText,
          props.tooltipPosition === 'top' ? styles.top : styles.bottom,
        ].join(' ')}
      >
        {props.tooltipText}
      </span>
      <span
        className={[
          styles.tooltipConnector,
          props.tooltipPosition === 'top' ? styles.top : styles.bottom,
        ].join(' ')}
      />
    </div>
  </span>
);

ButtonLink.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  vertical: PropTypes.bool,
  tooltip: PropTypes.bool,
  tooltipText: PropTypes.node,
  tooltipPosition: PropTypes.string,
  anchor: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonLink.defaultProps = {
  vertical: true,
  tooltip: false,
};

export default ButtonLink;
