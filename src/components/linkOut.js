import React from 'react';
import PropTypes from 'prop-types';

const LinkOut = (props) => (
  <a
    href={props.link}
    target='_blank'
    rel='noopener noreferrer'
    className={props.className}
  >
    {props.children}
  </a>
);

LinkOut.propTypes = {
  link: PropTypes.string,
};

export default LinkOut;
