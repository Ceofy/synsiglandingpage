import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";

import QueryForm from "./queryForm";
import QueryResult from "./queryResult";

import { useTraining } from "../../hooks/use-training";
import { useFetal } from "../../hooks/use-fetal";
import { useNgn2 } from "../../hooks/use-ngn2";
import { useCortex } from "../../hooks/use-cortex";
import { useStriatum } from "../../hooks/use-striatum";
import { usePredicted } from "../../hooks/use-predicted";
import { useGeneAliases } from "../../hooks/use-gene-aliases";
import { useIntegrated } from "../../hooks/use-integrated";

import styles from "./queryPanelStyles/queryPanel.module.css";

import {
  dataFields,
  experimentalValidationNames,
  queryStatuses,
} from "../../enums/enums";
import TabsComponent from "../tabs";
import Table from "../table/table2";
import UserGuide from "../userGuide";

let synsigDataDict;
let fetalDataDict;
let ngn2DataDict;
let cortexDataDict;
let striatumDataDict;
let allGenesAndAliases = [];
let fuse;

const QueryPanel = (props) => {
  //Acquire table data
  const fetal = useFetal();
  const ngn2 = useNgn2();
  const cortex = useCortex();
  const striatum = useStriatum();
  const training = useTraining();
  const predicted = usePredicted();
  const geneAliases = useGeneAliases();
  const integrated = useIntegrated();


  const [query, setQuery] = useState("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [queryStatus, setQueryStatus] = useState(queryStatuses.NO_QUERY);

  const [synsigDataValues, setsynsigDataValues] = useState(null);
  const [fetalDataValues, setFetalDataValues] = useState(null);
  const [ngn2DataValues, setNgn2DataValues] = useState(null);
  const [cortexDataValues, setCortexDataValues] = useState(null);
  const [striatumDataValues, setStriatumDataValues] = useState(null);

  const [outerTab, setOuterTab] = useState(0);
  const [innerTab, setInnerTab] = useState(0);

  //Get data
  useEffect(() => {
    synsigDataDict = listToDict(props.synsigData, dataFields.GENE);
    fetalDataDict = listToDictofLists(fetal, dataFields.GENE_SYMBOL);
    ngn2DataDict = listToDictofLists(ngn2, dataFields.GENE_SYMBOL);
    cortexDataDict = listToDictofLists(cortex, dataFields.GENE_SYMBOL);
    striatumDataDict = listToDictofLists(striatum, dataFields.GENE_SYMBOL);

    allGenesAndAliases = [
      ...Object.keys(synsigDataDict),
      ...Object.keys(geneAliases.aliasesMap),
    ];

    fuse = new Fuse(allGenesAndAliases, {
      distance: 30,
      threshold: 0.3,
      location: 0,
    });
  }, []);

  //Handle query
  const handleChange = (value) => {
    const autocompleteSuggestions = fuse.search(value);
    setQuery(value);
    // take the first 10 suggestions
    setAutocompleteSuggestions(autocompleteSuggestions.slice(0, 25));
    console.log(autocompleteSuggestions);
    if (queryStatus === queryStatuses.INVALID && value.length === 0) {
      setQueryStatus(queryStatuses.NO_QUERY);
    }
  };

  const setAndSubmit = (value) => {
    setQuery(value);
    const upperQuery = value.toUpperCase();
    const isInSynSigData = upperQuery in synsigDataDict;
    const aliasCaseInsensitive = Object.keys(geneAliases.aliasesMap).find(
      (key) => key.toUpperCase() === upperQuery
    );

    if (isInSynSigData) {
      handleSearchQuery(upperQuery);
    } else if (aliasCaseInsensitive) {
      handleSearchQuery(geneAliases.aliasesMap[aliasCaseInsensitive]);
    } else if (upperQuery.length === 0) {
      setQueryStatus(queryStatuses.NO_QUERY);
    } else {
      setQueryStatus(queryStatuses.INVALID);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const upperQuery = query.toUpperCase();
    const isInSynSigData = upperQuery in synsigDataDict;
    const aliasCaseInsensitive = Object.keys(geneAliases.aliasesMap).find(
      (key) => key.toUpperCase() === upperQuery
    );

    if (isInSynSigData) {
      handleSearchQuery(upperQuery);
    } else if (aliasCaseInsensitive) {
      handleSearchQuery(geneAliases.aliasesMap[aliasCaseInsensitive]);
    } else if (upperQuery.length === 0) {
      setQueryStatus(queryStatuses.NO_QUERY);
    } else {
      setQueryStatus(queryStatuses.INVALID);
    }
  };

  const handleSearchQuery = (gene) => {
    //Get relevant data
    setsynsigDataValues(synsigDataDict[gene]);
    setFetalDataValues(removeEmptyColumns(fetalDataDict[gene]));
    setNgn2DataValues(removeEmptyColumns(ngn2DataDict[gene]));
    setCortexDataValues(removeEmptyColumns(cortexDataDict[gene]));
    setStriatumDataValues(removeEmptyColumns(striatumDataDict[gene]));

    setQueryStatus(queryStatuses.VALID);
    setQuery(gene);
    setOuterTab(0);
  };

  const handleClose = () => {
    setQueryStatus(queryStatus.NO_QUERY);
    setQuery("");
  };

  const humanHeaders = [
    "Gene Symbol",
    "ΣCoverage",
    "Σ# Proteins",
    "Σ# Unique Peptides",
    "Σ# Peptides",
    "Σ# PSMs",
    "Score A2",
    "Coverage A2",
    "# Peptides A2",
    "# PSM A2",
    "Score A4",
    "Coverage A4",
    "# Peptides A4",
    "# PSM A4",
    "# AAs",
    "MW [kDa]",
    "calc. pI",
  ];

  return (
    <div className={styles.queryPanel}>
      <QueryForm
        text1={
          queryStatus === queryStatuses.INVALID
            ? "Gene not found."
            : "Enter the HGNC symbol of a gene to search the SynSig database:"
        }
        text2={
          queryStatus === queryStatuses.INVALID ? (
            <div
              style={{
                width: "40vw",
                minWidth: "20em",
                color: "gray",
                marginTop: "1em",
              }}
            >
              Our searchable pool is restricted to genes that meet our criteria
              for machine learning. See User Guide > Predicted Genes.
            </div>
          ) : null
        }
        query={query}
        autocompleteSuggestions={autocompleteSuggestions}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setAndSubmit={setAndSubmit}
      />
      <TabsComponent
        onSelect={setOuterTab}
        selectedIndex={outerTab}
        tabNames={[
          "Search Results",
          "User Guide",
          "Training Genes",
          "Predicted Genes",
          "MO-1200",
          "Synapse Proteomics Validation",
        ]}
        contents={[
          queryStatus === queryStatuses.VALID ? (
            <QueryResult
              synsigDataValues={synsigDataValues}
              fetalDataValues={fetalDataValues}
              ngn2DataValues={ngn2DataValues}
              cortexDataValues={cortexDataValues}
              striatumDataValues={striatumDataValues}
              handleClose={handleClose}
            />
          ) : (
            <div style={{ padding: "4em 1em 2em", color: "gray" }}>
              Search the SynSig database to view results here
            </div>
          ),
          <UserGuide />,
          <div className={styles.tableContainer}>
            <Table
              clickable={true}
              clickEvent={(gene) => handleSearchQuery(gene)}
              clickEventKey={dataFields.GENE}
              data={training}
              headers={["Gene", "Positive/Negative Training Gene"]}
            />
          </div>,
          <div className={styles.tableContainer}>
            <Table
              clickable={true}
              clickEvent={(gene) => handleSearchQuery(gene)}
              clickEventKey={dataFields.GENE}
              data={predicted}
              headers={["Gene", "Synapse Likelihood Score Percentile"]}
            />
          </div>,
                    <div className={styles.tableContainer}>
                    <Table
                      clickable={true}
                      clickEvent={(gene) => handleSearchQuery(gene)}
                      clickEventKey={dataFields.GENE}
                      data={integrated}
                      headers={["Gene"]}
                    />
                  </div>,
          <div className={styles.tabContainer}>
            <TabsComponent
              onSelect={setInnerTab}
              selectedIndex={innerTab}
              tabNames={[
                experimentalValidationNames.CORTEX,
                experimentalValidationNames.STRIATUM,
                experimentalValidationNames.NGN2,
                experimentalValidationNames.FETAL,
              ]}
              contents={[
                <div className={styles.tableContainer}>
                  <Table data={cortex} />
                </div>,
                <div className={styles.tableContainer}>
                  <Table data={striatum} />
                </div>,
                <div className={styles.tableContainer}>
                  <Table data={ngn2} headers={humanHeaders} />
                </div>,
                <div className={styles.tableContainer}>
                  <Table data={fetal} headers={humanHeaders} />
                </div>,
              ]}
            />
          </div>,
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

const removeEmptyColumns = (list) => {
  if (list !== undefined) {
    for (let key in list[0]) {
      let empty = true;
      for (let item of list) {
        if (item[key] != null && item[key] !== "") {
          empty = false;
          break;
        }
      }
      if (empty) {
        for (let item of list) {
          delete item[key];
        }
      }
    }
  }
  return list;
};

QueryPanel.propTypes = {
  synsigData: PropTypes.array,
};

export default QueryPanel;
