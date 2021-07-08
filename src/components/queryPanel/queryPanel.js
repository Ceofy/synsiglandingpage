import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

import QueryForm from './queryForm';
import QueryResult from './queryResult2';

import styles from './queryPanelStyles/queryPanel.module.css';

import { dataFields, queryStatuses } from '../../enums/enums';

let synsigDataDict;

const QueryPanel = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    searchQuery(gene) {
      handleSearchQuery(gene);
    },
  }));

  const [query, setQuery] = useState('');

  //0 for no query, 1 for true, -1 for false
  const [queryStatus, setQueryStatus] = useState(queryStatuses.NO_QUERY);

  const [synsigDataValues, setsynsigDataValues] = useState(null);

  //Get data
  useEffect(() => {
    synsigDataDict = listToDict(props.synsigData, dataFields.GENE);
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
    setQueryStatus(queryStatuses.VALID);
    setQuery(gene);
  };

  const handleClose = () => {
    setQueryStatus(queryStatus.NO_QUERY);
    setQuery('');
    document.getElementById('searchBar').focus();
  };

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
      {queryStatus === queryStatuses.VALID ? (
        <QueryResult
          synsigDataValues={synsigDataValues}
          handleClose={handleClose}
        />
      ) : null}
    </div>
  );
});

const listToDict = (list, key) => {
  const dict = {};
  for (let i = 0; i < list.length; i++) {
    dict[list[i][key].toUpperCase()] = list[i];
  }
  return dict;
};

QueryPanel.propTypes = {
  synsigData: PropTypes.array,
};

export default QueryPanel;
