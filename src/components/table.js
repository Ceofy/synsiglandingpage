import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
//import { MDBDataTableV5 } from 'mdbreact';

import styles from './componentStyles/table.module.css';
import './componentStyles/tableStyles.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { readTableData } from '../utils/readTableData';

const Table = (props) => {
  const data = readTableData(props.data);

  //Add click event
  if (props.clickEvent) {
    for (let i = 0; i < data.rows.length; i++) {
      data.rows[i].clickEvent = () => {
        props.clickEvent(data.rows[i]['Gene']);
      };
    }
  }

  const setSort = (value) => {
    props.setSortOrder(value);
  };

  return (
    <div className={styles.tableContainer}>
      <span className={styles.innerTableContainer}>
        <MDBDataTable
          className={styles.table}
          data={data}
          bordered
          hover
          //order={[props.sortOrder.column, props.sortOrder.direction]}
          order={['Gene', 'asc']}
          responsive
          striped
          tbodyColor='white'
          theadColor='white'
          small
          entries={10}
          autoWidth
          onSort={(value) => {
            setSort(value);
            //console.log(value);
          }}
        />
      </span>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  clickEvent: PropTypes.func,
  sortOrder: PropTypes.object,
  setSortOrder: PropTypes.func,
};

export default Table;
