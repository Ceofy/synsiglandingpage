import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ColorBar from '../colorBar/colorBar';
import LinkOut from '../linkOut';
import ExpandPanel from './expandPanel';

import xIcon from '../../images/noun_x.svg';
import checkIcon from '../../images/noun_check.svg';
import blueXIcon from '../../images/noun_x_blue.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import {
  dataFields,
  dataFieldNames,
  experimentalValidation,
} from '../../enums/enums';

import styles from './queryPanelStyles/queryResult.module.css';
import Table from '../table/table2';

const QueryResult = (props) => {
  const [expandPanelContents, setExpandPanelContents] = useState(null);
  const [expandOpen, setExpandOpen] = useState(false);
  const [arrowsUp, setArrowsUp] = useState([true, true, true, true]);

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

  const handleArrows = (arrowIndex) => {
    const newArrows = [true, true, true, true];
    if (arrowsUp[arrowIndex]) {
      newArrows[arrowIndex] = false;

      //Figure out what data to submit
      switch (arrowIndex) {
        case 0:
          console.log('two');
          setExpandPanelContents(
            <div className={styles.tableContainer} key={arrowIndex}>
              <Table
                data={props.table2DataValues}
                headers={headers}
                navigation={false}
              />
            </div>
          );
          break;
        case 1:
          console.log('three');
          setExpandPanelContents(
            <div className={styles.tableContainer} key={arrowIndex}>
              <Table
                data={props.table3DataValues}
                headers={headers}
                navigation={false}
              />
            </div>
          );
          break;
        case 2:
          console.log('four');
          setExpandPanelContents(
            <div className={styles.tableContainer} key={arrowIndex}>
              <Table data={props.table4DataValues} navigation={false} />
            </div>
          );
          break;
        case 3:
          console.log('five');
          setExpandPanelContents(
            <div className={styles.tableContainer} key={arrowIndex}>
              <Table data={props.table5DataValues} navigation={false} />
            </div>
          );
      }

      setExpandOpen(true);
    } else {
      setExpandOpen(false);
    }
    setArrowsUp(newArrows);
  };
  console.log(expandPanelContents);

  const data = props.synsigDataValues;

  const findStatus = () => {
    //Positive training gene
    if (data[dataFields.TRAINING] === 'pos') {
      return 'Known SynGO synapse gene, used for training';
      //Negative training gene
    } else if (data[dataFields.TRAINING] === 'neg') {
      return 'Known non-synapse gene, used for training';
      //Not a synapse gene
    } else if (data[dataFields.SYNSIG] === 'no') {
      return 'Predicted non-synapse gene';
    } else {
      //Predicted to be synapse gene
      if (data[dataFields.SYNAPSE_STATUS] === 'new') {
        return 'Novel predicted synapse gene';
      } else {
        return 'Predicted synapse gene';
      }
    }
  };

  return (
    <div className={styles.queryResult}>
      <div className={styles.exContainer}>
        <img
          src={blueXIcon}
          className={styles.ex}
          onClick={props.handleClose}
        />
      </div>
      <div className={styles.mainTitle}>{data[dataFields.GENE]}</div>
      <div className={styles.mainText}>{capitalize(data[dataFields.NAME])}</div>
      <div className={styles.componentsContainer}>
        {/*Synsig and status component*/}
        <div className={styles.componentDiv} style={{ paddingRight: '1em' }}>
          {data[dataFields.TRAINING] === 'no' ? (
            <>
              <div className={styles.title}>SynSig</div>
              <div className={styles.componentsContainer}>
                <div className={styles.componentDiv}>
                  <div className={styles.text}>
                    {dataFieldNames.SYNAPSE_PERCENTILE}:{' '}
                    {parsePercentile(data[dataFields.SYNAPSE_PERCENTILE])}
                    <br />
                    <div className={styles.colorBar}>
                      <ColorBar
                        start={0}
                        end={99}
                        step={25}
                        pointerValue={parsePercentile(
                          data[dataFields.SYNAPSE_PERCENTILE]
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className={styles.title}>Status</div>
          <div className={styles.componentsContainer}>
            <div className={styles.componentDiv}>
              <div className={styles.text} style={{ marginBottom: 0 }}>
                {findStatus()}
              </div>
            </div>
          </div>
        </div>
        {/*Validation component*/}
        <div className={styles.componentDiv}>
          <div className={styles.title}>Validation</div>
          <div className={styles.componentsContainer}>
            <div className={styles.componentDiv} style={{ marginRight: '1em' }}>
              <div className={styles.subtitle}>Database Validation</div>
              <div className={styles.text}>
                {dataFieldNames.SYNGO}:{' '}
                {data[dataFields.SYNGO] === '1' ? (
                  <img src={checkIcon} className={styles.checkIcon} />
                ) : (
                  <img src={xIcon} className={styles.xIcon} />
                )}
                <br />
                {dataFieldNames.SYNDB}:{' '}
                {data[dataFields.SYNDB] === '1' ? (
                  <img src={checkIcon} className={styles.checkIcon} />
                ) : (
                  <img src={xIcon} className={styles.xIcon} />
                )}
                <br />
                {dataFieldNames.SYNSYSNET}:{' '}
                {data[dataFields.SYNSYSNET] === '1' ? (
                  <img src={checkIcon} className={styles.checkIcon} />
                ) : (
                  <img src={xIcon} className={styles.xIcon} />
                )}
              </div>
            </div>
            <div className={styles.componentDiv}>
              <div className={styles.subtitle}>
                Synapse proteomics validation
              </div>

              <div
                className={styles.text}
                style={{ paddingRight: 0, marginBottom: 0 }}
              >
                {dataFieldNames.CORTEX}:{' '}
                {data[dataFields.CORTEX] === '1' ? (
                  <>
                    <img src={checkIcon} className={styles.checkIcon} />
                  </>
                ) : (
                  <img src={xIcon} className={styles.xIcon} />
                )}
                {props.table2DataValues ? (
                  arrowsUp[experimentalValidation.CORTEX] ? (
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      onClick={() =>
                        handleArrows(experimentalValidation.CORTEX)
                      }
                      className={styles.upArrowIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      onClick={() =>
                        handleArrows(experimentalValidation.CORTEX)
                      }
                      className={styles.downArrowIcon}
                    />
                  )
                ) : null}
                <br />
                {dataFieldNames.STRIATUM}:{' '}
                {data[dataFields.STRIATUM] === '1' ? (
                  <>
                    <img src={checkIcon} className={styles.checkIcon} />
                  </>
                ) : (
                  <img src={xIcon} className={styles.xIcon} />
                )}
                {props.table3DataValues ? (
                  arrowsUp[experimentalValidation.STRIATUM] ? (
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      onClick={() =>
                        handleArrows(experimentalValidation.STRIATUM)
                      }
                      className={styles.upArrowIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      onClick={() =>
                        handleArrows(experimentalValidation.STRIATUM)
                      }
                      className={styles.downArrowIcon}
                    />
                  )
                ) : null}
                <br />
                {dataFieldNames.NGN2}:{' '}
                {data[dataFields.NGN2] === '1' ? (
                  <>
                    <img src={checkIcon} className={styles.checkIcon} />
                  </>
                ) : (
                  <img src={xIcon} className={styles.xIcon} />
                )}
                {props.table4DataValues ? (
                  arrowsUp[experimentalValidation.NGN2] ? (
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      onClick={() => handleArrows(experimentalValidation.NGN2)}
                      className={styles.upArrowIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      onClick={() => handleArrows(experimentalValidation.NGN2)}
                      className={styles.downArrowIcon}
                    />
                  )
                ) : null}
                <br />
                {dataFieldNames.FETAL}:{' '}
                {data[dataFields.FETAL] === '1' ? (
                  <>
                    <img src={checkIcon} className={styles.checkIcon} />
                  </>
                ) : (
                  <img src={xIcon} className={styles.xIcon} />
                )}
                {props.table5DataValues ? (
                  arrowsUp[experimentalValidation.FETAL] ? (
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      onClick={() => handleArrows(experimentalValidation.FETAL)}
                      className={styles.upArrowIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      onClick={() => handleArrows(experimentalValidation.FETAL)}
                      className={styles.downArrowIcon}
                    />
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExpandPanel open={expandOpen} contents={expandPanelContents} />
      {data[dataFields.FUNCTION_TOTAL].length > 0 ||
      data[dataFields.MF_TERMS].length > 0 ? (
        <div className={styles.componentDiv}>
          <div className={styles.title}>Function Analysis</div>
          <div className={styles.componentsContainer}>
            {data[dataFields.FUNCTION_TOTAL].length > 0 ? (
              <div
                className={styles.componentDiv}
                style={{ flexGrow: 0, marginRight: '1em' }}
              >
                <>
                  <div className={styles.subtitle}>Molecular functions</div>
                  <div className={styles.text}>
                    {data[dataFields.RECEPTOR_CHANNEL] === '1.0' ? (
                      <>
                        {dataFieldNames.RECEPTOR_CHANNEL}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.KINASE_PHOSPHATASE] === '1.0' ? (
                      <>
                        {dataFieldNames.KINASE_PHOSPHATASE}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.UBIQUITIN_E3] === '1.0' ? (
                      <>
                        {dataFieldNames.UBIQUITIN_E3}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.VESICLE_TRANSPORTERS] === '1.0' ? (
                      <>
                        {dataFieldNames.VESICLE_TRANSPORTERS}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.GTP_ATP_REGULATORS] === '1.0' ? (
                      <>
                        {dataFieldNames.GTP_ATP_REGULATORS}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.NUCLEIC_ACID_BINDING] === '1.0' ? (
                      <>
                        {dataFieldNames.NUCLEIC_ACID_BINDING}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.TRANSLATION] === '1.0' ? (
                      <>
                        {dataFieldNames.TRANSLATION}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.MEMBRANE_CELL_ADHESION] === '1.0' ? (
                      <>
                        {dataFieldNames.MEMBRANE_CELL_ADHESION}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.OTHER_REGULATORS] === '1.0' ? (
                      <>
                        {dataFieldNames.OTHER_REGULATORS}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.SCAFFOLDS_ADAPTORS] === '1.0' ? (
                      <>
                        {dataFieldNames.SCAFFOLDS_ADAPTORS}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.CYTOSKELETAL] === '1.0' ? (
                      <>
                        {dataFieldNames.CYTOSKELETAL}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.CALCIUM_ION_BINDING] === '1.0' ? (
                      <>
                        {dataFieldNames.CALCIUM_ION_BINDING}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.OTHER_ENZYMES] === '1.0' ? (
                      <>
                        {dataFieldNames.OTHER_ENZYMES}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.OTHER_PROTEIN_BINDERS] === '1.0' ? (
                      <>
                        {dataFieldNames.OTHER_PROTEIN_BINDERS}
                        <br />
                      </>
                    ) : null}
                    {data[dataFields.UNKNOWN_FUNCTIONS] === '1.0' ? (
                      <>
                        {dataFieldNames.UNKNOWN_FUNCTIONS}
                        <br />
                      </>
                    ) : null}
                  </div>
                </>
              </div>
            ) : null}
            {data[dataFields.MF_TERMS].length > 0 ? (
              <div
                className={styles.componentDiv}
                style={{ flexShrink: 1, flexBasis: '25vw' }}
              >
                <div className={styles.subtitle}>{dataFieldNames.MF_TERMS}</div>
                <div className={styles.text}>
                  {listToText(data[dataFields.MF_TERMS])}
                </div>
                <div style={{ marginTop: '-0.5em' }}>
                  <strong>
                    <LinkOut
                      link={
                        'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' +
                        data[dataFields.GENE]
                      }
                    >
                      GeneCards
                    </LinkOut>
                  </strong>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const capitalize = (string) => {
  if (string.length === 0) {
    return '';
  }
  return string[0].toUpperCase() + string.slice(1);
};
const listToText = (string) => capitalize(string.replace(/'|\[|\]/g, ''));

const parsePercentile = (percentile) => {
  const result = Math.floor(parseFloat(percentile));
  if (result === 100) {
    return 99;
  }
  return result;
};

QueryResult.propTypes = {
  synsigDataValues: PropTypes.object,
  table2Values: PropTypes.array,
  table3Values: PropTypes.array,
  table4Values: PropTypes.array,
  table5Values: PropTypes.array,
  handleClose: PropTypes.func,
};

export default QueryResult;
