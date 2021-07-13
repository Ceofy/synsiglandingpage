import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';

import styles from './tableStyles/table.module.css';
import './tableStyles/tableStyles.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { readTableData } from '../../utils/readTableData';

const Table = (props) => {
  const [data, setData] = useState(
    readTableData(
      props.data,
      props.headers,
      props.clickEvent,
      props.clickEventKey
    )
  );

  if (data !== null) {
    return (
      <div className={styles.tableContainer}>
        <span
          className={
            props.clickable
              ? [styles.innerTableContainer, styles.clickable].join(' ')
              : styles.innerTableContainer
          }
        >
          <MDBDataTable
            className={styles.table}
            data={data}
            bordered
            hover
            responsive
            striped
            tbodyColor='white'
            theadColor='white'
            small
            entries={10}
            autoWidth
            searching={props.navigation}
            paging={props.navigation}
          />
        </span>
      </div>
    );
  }
  return null;
};

Table.defaultProps = {
  navigation: true,
};

Table.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  clickEvent: PropTypes.func,
  navigation: PropTypes.bool,
};

export default Table;
