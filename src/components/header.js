import React from 'react';
import PropTypes from 'prop-types';

import LinkOut from './linkOut';

import styles from './componentStyles/header.module.css';

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <div className={styles.left}>
      <LinkOut
        className={styles.underlineLink}
        link='https://medschool.ucsd.edu/Pages/default.aspx'
      >
        UC San Diego
      </LinkOut>
      <LinkOut
        className={styles.noUnderlineLink}
        link='http://idekerlab.ucsd.edu'
      >
        {' - '}
      </LinkOut>
      <LinkOut
        className={styles.underlineLink}
        link='http://idekerlab.ucsd.edu'
      >
        Ideker Lab
      </LinkOut>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
