import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
//import { MDBDataTableV5 } from 'mdbreact';

import styles from './tableStyles/table.module.css';
import './tableStyles/tableStyles.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { readTableData } from '../../utils/readTableData';

const Table = (props) => {
  const [data, setData] = useState(readTableData(props.data, props.clickEvent));

  return (
    <div className={styles.tableContainer}>
      <span className={styles.innerTableContainer}>
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
          onSort={(value) => {
            props.setSortOrder(value);
          }}
          order={[props.sortOrder.column, props.sortOrder.direction]}
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
