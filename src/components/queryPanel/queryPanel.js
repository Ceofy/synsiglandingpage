import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import QueryForm from './queryForm';
import QueryResult from './queryResult';

import { useTraining } from '../../hooks/use-training';
import { useTables2 } from '../../hooks/use-tables2';
import { useTables3 } from '../../hooks/use-tables3';
import { useTables4 } from '../../hooks/use-tables4';
import { useTables5 } from '../../hooks/use-tables5';
import { usePredicted } from '../../hooks/use-predicted';

import styles from './queryPanelStyles/queryPanel.module.css';

import { dataFields, queryStatuses } from '../../enums/enums';
import TabsComponent from '../tabs';
import Table from '../table/table2';
import UserGuide from '../userGuide';

let synsigDataDict;
let table2DataDict;
let table3DataDict;
let table4DataDict;
let table5DataDict;

const QueryPanel = (props) => {
  //Acquire table data
  const tableS2 = useTables2();
  const tableS3 = useTables3();
  const tableS4 = useTables4();
  const tableS5 = useTables5();
  const training = useTraining();
  const predicted = usePredicted();

  const [query, setQuery] = useState('');
  const [queryStatus, setQueryStatus] = useState(queryStatuses.NO_QUERY);

  const [synsigDataValues, setsynsigDataValues] = useState(null);
  const [table2DataValues, setTable2DataValues] = useState(null);
  const [table3DataValues, setTable3DataValues] = useState(null);
  const [table4DataValues, setTable4DataValues] = useState(null);
  const [table5DataValues, setTable5DataValues] = useState(null);

  const [outerTab, setOuterTab] = useState(0);
  const [innerTab, setInnerTab] = useState(0);

  //Get data
  useEffect(() => {
    synsigDataDict = listToDict(props.synsigData, dataFields.GENE);
    table2DataDict = listToDictofLists(tableS2, dataFields.GENE_SYMBOL);
    table3DataDict = listToDictofLists(tableS3, dataFields.GENE_SYMBOL);
    table4DataDict = listToDictofLists(tableS4, dataFields.GENE_SYMBOL);
    table5DataDict = listToDictofLists(tableS5, dataFields.GENE_SYMBOL);
  }, []);

  //Handle query
  const handleChange = (value) => {
    setQuery(value);
    if (queryStatus === queryStatuses.INVALID && value.length === 0) {
      setQueryStatus(queryStatuses.NO_QUERY);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const upperQuery = query.toUpperCase();
    if (upperQuery in synsigDataDict) {
      handleSearchQuery(upperQuery);
    } else if (upperQuery.length === 0) {
      setQueryStatus(queryStatuses.NO_QUERY);
      document.getElementById('searchBar').focus();
    } else {
      setQueryStatus(queryStatuses.INVALID);
      document.getElementById('searchBar').focus();
    }
  };

  const handleSearchQuery = (gene) => {
    //Get relevant data
    setsynsigDataValues(synsigDataDict[gene]);
    setTable2DataValues(table2DataDict[gene]);
    setTable3DataValues(table3DataDict[gene]);
    setTable4DataValues(table4DataDict[gene]);
    setTable5DataValues(table5DataDict[gene]);

    setQueryStatus(queryStatuses.VALID);
    setQuery(gene);
    setOuterTab(0);
  };

  const handleClose = () => {
    setQueryStatus(queryStatus.NO_QUERY);
    setQuery('');
    document.getElementById('searchBar').focus();
  };

  const headers = [
    'Gene Symbol',
    'ΣCoverage',
    'Σ# Proteins',
    'Σ# Unique Peptides',
    'Σ# Peptides',
    'Σ# PSMs',
    'Score A2',
    'Coverage A2',
    '# Peptides A2',
    '# PSM A2',
    'Score A4',
    'Coverage A4',
    '# Peptides A4',
    '# PSM A4',
    '# AAs',
    'MW [kDa]',
    'calc. pI',
  ];

  return (
    <div className={styles.queryPanel}>
      <QueryForm
        text={
          queryStatus === queryStatuses.INVALID
            ? 'Gene not found.'
            : 'Enter the name of a gene to search the SynSig database:'
        }
        query={query}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <TabsComponent
        onSelect={setOuterTab}
        selectedIndex={outerTab}
        tabNames={[
          'Search Results',
          'Training Genes',
          'Predicted Genes',
          'Experimental Validation',
          'User Guide',
        ]}
        contents={[
          queryStatus === queryStatuses.VALID ? (
            <QueryResult
              synsigDataValues={synsigDataValues}
              table2DataValues={table2DataValues}
              table3DataValues={table3DataValues}
              table4DataValues={table4DataValues}
              table5DataValues={table5DataValues}
              handleClose={handleClose}
            />
          ) : (
            <div style={{ padding: '4em 1em 2em', color: 'gray' }}>
              Search the SynSig database to view results here
            </div>
          ),
          ,
          <div className={styles.tableContainer}>
            <Table
              clickable={true}
              clickEvent={(gene) => handleSearchQuery(gene)}
              clickEventKey={dataFields.GENE}
              data={training}
              headers={['Gene', 'Positive/Negative Training Gene']}
            />
          </div>,
          <div className={styles.tableContainer}>
            <Table
              clickable={true}
              clickEvent={(gene) => handleSearchQuery(gene)}
              clickEventKey={dataFields.GENE}
              data={predicted}
              headers={['Gene', 'Synapse Likelihood Score Percentile']}
            />
          </div>,
          <div className={styles.tabContainer}>
            <TabsComponent
              onSelect={setInnerTab}
              selectedIndex={innerTab}
              tabNames={[
                'Adult mouse cortex',
                'Adult mouse striatum',
                'Human iPSC',
                'Human fetal brain',
              ]}
              contents={[
                <div className={styles.tableContainer}>
                  <Table data={tableS2} headers={headers} />
                </div>,
                <div className={styles.tableContainer}>
                  <Table data={tableS3} headers={headers} />
                </div>,
                <div className={styles.tableContainer}>
                  <Table data={tableS4} />
                </div>,
                <div className={styles.tableContainer}>
                  <Table data={tableS5} />
                </div>,
              ]}
            />
          </div>,
          <UserGuide />,
        ]}
      ></TabsComponent>
    </div>
  );
};

const listToDict = (list, key) => {
  const dict = {};
  for (let i = 0; i < list.length; i++) {
    dict[list[i][key].toUpperCase()] = list[i];
  }
  return dict;
};

const listToDictofLists = (list, key) => {
  const dict = {};
  for (let i = 0; i < list.length; i++) {
    const dictKey = list[i][key].toUpperCase();
    if (dict[dictKey] === undefined) {
      dict[dictKey] = [list[i]];
    } else {
      dict[dictKey].push(list[i]);
    }
  }
  return dict;
};

QueryPanel.propTypes = {
  synsigData: PropTypes.array,
};

export default QueryPanel;
