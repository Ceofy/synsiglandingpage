import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

import QueryForm from './queryForm';
import QueryResult from './queryResult';

import styles from './queryPanelStyles/queryPanel.module.css';

let suppTable1SynSigDict;
let coreGenesDict;
let synSigAllFunctionTabDict;
let enSigAllFunctionTabDict;
let coreGenesAllFunctionTabDict;

const QueryPanel = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    searchQuery(gene) {
      handleSearchQuery(gene);
    },
  }));

  const [query, setQuery] = useState('');

  //0 for no query, 1 for true, -1 for false
  const [queryIsValid, setQueryIsValid] = useState(0);
  const [isCoreGene, setIsCoreGene] = useState(false);

  const [suppTable1SynSigValues, setSuppTable1SynSigValues] = useState();
  const [coreGeneValues, setCoreGeneValues] = useState();
  const [allFunctionTabValues, setAllFunctionTabValues] = useState();

  //Get data
  useMountEffect(() => {
    suppTable1SynSigDict = listToDict(props.suppTable1SynSigData, 'Gene');
    coreGenesDict = listToDict(props.coreGenesData, 'Gene');
    synSigAllFunctionTabDict = listToDict(
      props.synSigAllFunctionTabData,
      'Gene'
    );
    enSigAllFunctionTabDict = listToDict(props.enSigAllFunctionTabData, 'Gene');
    coreGenesAllFunctionTabDict = listToDict(
      props.coreGenesAllFunctionTabData,
      'Gene'
    );
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
    if (upperQuery in suppTable1SynSigDict || upperQuery in coreGenesDict) {
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
    if (gene in suppTable1SynSigDict) {
      setIsCoreGene(false);
      setSuppTable1SynSigValues(suppTable1SynSigDict[gene]);

      if (gene in synSigAllFunctionTabDict) {
        setAllFunctionTabValues(synSigAllFunctionTabDict[gene]);
      } else {
        setAllFunctionTabValues(enSigAllFunctionTabDict[gene]);
      }
    } else {
      setIsCoreGene(true);
      setCoreGeneValues(coreGenesDict[gene]);
      setAllFunctionTabValues(coreGenesAllFunctionTabDict[gene]);
    }

    setQueryIsValid(1);
    setQuery(gene);
  };

  const handleClose = () => {
    setQueryIsValid(0);
    setQuery('');
    document.getElementById('searchBar').focus();
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
        isCoreGene ? (
          <QueryResult
            coreGeneValues={coreGeneValues}
            allFunctionTabValues={allFunctionTabValues}
            handleClose={handleClose}
          />
        ) : (
          <QueryResult
            suppTable1SynSigValues={suppTable1SynSigValues}
            allFunctionTabValues={allFunctionTabValues}
            handleClose={handleClose}
          />
        )
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
  coreGenesData: PropTypes.array,
  synSigAllFunctionTabData: PropTypes.array,
  enSigAllFunctionTabData: PropTypes.array,
  coreGenesAllFunctionTabData: PropTypes.array,
};

export default QueryPanel;
