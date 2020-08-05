import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

import QueryForm from './queryForm';
import QueryResult from './queryResult';

import styles from './componentStyles/queryPanel.module.css';

let suppTable1SynSigDict;
let suppTable9EnSigDict;
let synSigAllFunctionTabDict;
let enSigAllFunctionTabDict;

const QueryPanel = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    searchQuery(gene) {
      handleSearchQuery(gene);
    },
  }));

  const [query, setQuery] = useState('');

  //0 for no query, 1 for true, -1 for false
  const [queryIsValid, setQueryIsValid] = useState(0);

  const [suppTable1SynSigValues, setSuppTable1SynSigValues] = useState();
  const [allFunctionTabValues, setAllFunctionTabValues] = useState();
  const [suppTable9EnSigValues, setSuppTable9EnSigValues] = useState();

  //Get data
  useMountEffect(() => {
    suppTable1SynSigDict = listToDict(props.suppTable1SynSigData, 'Gene');
    suppTable9EnSigDict = listToDict(props.suppTable9EnSigData, 'Gene');
    synSigAllFunctionTabDict = listToDict(
      props.synSigAllFunctionTabData,
      'Gene'
    );
    enSigAllFunctionTabDict = listToDict(props.enSigAllFunctionTabData, 'Gene');
  });

  //Handle query
  const handleChange = (value) => {
    setQuery(value);
    if (queryIsValid === -1 && value.length === 0) {
      setQueryIsValid(0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const upperQuery = query.toUpperCase();
    if (upperQuery in suppTable1SynSigDict) {
      handleSearchQuery(upperQuery);
    } else if (upperQuery.length === 0) {
      setQueryIsValid(0);
      document.getElementById('searchBar').focus();
    } else {
      setQueryIsValid(-1);
      document.getElementById('searchBar').focus();
    }
  };

  const handleSearchQuery = (gene) => {
    //Get relevant data
    setSuppTable1SynSigValues(suppTable1SynSigDict[gene]);
    setSuppTable9EnSigValues(suppTable9EnSigDict[gene]);

    if (gene in synSigAllFunctionTabDict) {
      setAllFunctionTabValues(synSigAllFunctionTabDict[gene]);
    } else {
      setAllFunctionTabValues(enSigAllFunctionTabDict[gene]);
    }

    setQueryIsValid(1);
    setQuery(gene);
  };

  return (
    <div className={styles.queryPanel}>
      <QueryForm
        text={
          queryIsValid >= 0
            ? 'Enter the name of a gene to search the SynSig database:'
            : 'Gene not found.'
        }
        query={query}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {queryIsValid === 1 ? (
        <QueryResult
          suppTable1SynSigValues={suppTable1SynSigValues}
          suppTable9EnSigValues={suppTable9EnSigValues}
          allFunctionTabValues={allFunctionTabValues}
        />
      ) : null}
    </div>
  );
});

const useMountEffect = (func) => {
  useEffect(func, []);
};

const listToDict = (list, key) => {
  const dict = {};
  for (let i = 0; i < list.length; i++) {
    dict[list[i][key].toUpperCase()] = list[i];
  }
  return dict;
};

QueryPanel.propTypes = {
  suppTable1SynSigData: PropTypes.array,
  suppTable9EnSigData: PropTypes.array,
  synSigAllFunctionTabData: PropTypes.array,
  enSigAllFunctionTabData: PropTypes.array,
};

export default QueryPanel;
