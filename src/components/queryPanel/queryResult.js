import React, { useState, useEffect } from 'react';
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

import { useGeneAliases } from '../../hooks/use-gene-aliases';

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
  const geneAliases = useGeneAliases();


  useEffect(() => {
    setExpandOpen(false);
    setArrowsUp([true, true, true, true]);
  }, [props.synsigDataValues]);

  const humanHeaders = [
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
        case experimentalValidation.FETAL:
          setExpandPanelContents(
            <div className={styles.tableContainer} key={arrowIndex}>
              <Table
                data={props.fetalDataValues}
                headers={humanHeaders}
                navigation={false}
              />
            </div>
          );
          break;
        case experimentalValidation.STRIATUM:
          setExpandPanelContents(
            <div className={styles.tableContainer} key={arrowIndex}>
              <Table data={props.striatumDataValues} navigation={false} />
            </div>
          );
          break;
        case experimentalValidation.NGN2:
          setExpandPanelContents(
            <div className={styles.tableContainer} key={arrowIndex}>
              <Table
                data={props.ngn2DataValues}
                navigation={false}
                headers={humanHeaders}
              />
            </div>
          );
          break;
        case experimentalValidation.CORTEX:
          setExpandPanelContents(
            <div className={styles.tableContainer} key={arrowIndex}>
              <Table data={props.cortexDataValues} navigation={false} />
            </div>
          );
      }

      setExpandOpen(true);
    } else {
      setExpandOpen(false);
    }
    setArrowsUp(newArrows);
  };

  const data = props.synsigDataValues;

  const aliases = geneAliases.genesMap[data[dataFields.GENE]];

  const aliasDisplays = aliases != null ? <div className={styles.mainText}>{`Aliases: ${aliases.join(', ')}`}</div> : null

  return (
    <div className={styles.queryResult}>
      <div className={styles.exContainer}>
        <img
          src={blueXIcon}
          className={styles.ex}
          onClick={props.handleClose}
          alt={'Close'}
        />
      </div>
      <div className={styles.mainTitle}>{data[dataFields.GENE]}</div>
      <div className={styles.mainText}>{capitalize(data[dataFields.NAME])}</div>
      {aliasDisplays}
      <div className={styles.componentsContainer}>
        {/*Synsig and status component*/}
        {data[dataFields.TRAINING] === 'no' ? (
          <div className={styles.componentDiv} style={{ paddingRight: '1em' }}>
            <div className={styles.title}>SynSig</div>
            <div className={styles.componentsContainer}>
              <div className={styles.componentDiv}>
                <div className={styles.text}>
                  {dataFieldNames.SYNAPSE_PERCENTILE}:{' '}
                  {parsePercentile(data[dataFields.SYNAPSE_PERCENTILE])}
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

                {data[dataFields.SYNAPSE_STATUS] === 'new' ? (
                  <div
                    className={styles.title}
                    style={{ color: 'rgb(255, 140, 0)' }}
                  >
                    Novel predicted synapse gene
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        {/*Validation component*/}
        <div className={styles.componentDiv}>
          <div className={styles.title}>Validation</div>
          <div className={styles.componentsContainer}>
            <div className={styles.componentDiv} style={{ marginRight: '1em' }}>
              <div className={styles.subtitle}>Database Validation</div>
              <div className={styles.text}>
                {dataFieldNames.SYNGO}:{' '}
                {data[dataFields.SYNGO] === '1' ? (
                  <img
                    src={checkIcon}
                    className={styles.checkIcon}
                    alt={'Check mark'}
                  />
                ) : (
                  <img src={xIcon} className={styles.xIcon} alt={'X'} />
                )}
                <br />
                {dataFieldNames.SYNDB}:{' '}
                {data[dataFields.SYNDB] === '1' ? (
                  <img
                    src={checkIcon}
                    className={styles.checkIcon}
                    alt={'Check mark'}
                  />
                ) : (
                  <img src={xIcon} className={styles.xIcon} alt={'X'} />
                )}
                <br />
                {dataFieldNames.SYNSYSNET}:{' '}
                {data[dataFields.SYNSYSNET] === '1' ? (
                  <img
                    src={checkIcon}
                    className={styles.checkIcon}
                    alt={'Check mark'}
                  />
                ) : (
                  <img src={xIcon} className={styles.xIcon} alt={'X'} />
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
                  <img
                    src={checkIcon}
                    className={styles.checkIcon}
                    alt={'Check mark'}
                  />
                ) : (
                  <img src={xIcon} className={styles.xIcon} alt={'X'} />
                )}
                {props.cortexDataValues ? (
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
                  <img
                    src={checkIcon}
                    className={styles.checkIcon}
                    alt={'Check mark'}
                  />
                ) : (
                  <img src={xIcon} className={styles.xIcon} alt={'X'} />
                )}
                {props.striatumDataValues ? (
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
                  <img
                    src={checkIcon}
                    className={styles.checkIcon}
                    alt={'Check mark'}
                  />
                ) : (
                  <img src={xIcon} className={styles.xIcon} alt={'X'} />
                )}
                {props.ngn2DataValues ? (
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
                  <img
                    src={checkIcon}
                    className={styles.checkIcon}
                    alt={'Check mark'}
                  />
                ) : (
                  <img src={xIcon} className={styles.xIcon} alt={'X'} />
                )}
                {props.fetalDataValues ? (
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
          {data[dataFields.TRAINING] === 'yes' ? (
            <div className={styles.title}>SynGO_CC training gene</div>
          ) : data[dataFields.TRAINING] === 'no' ? (
            <div className={styles.title}>Non-SynGO_CC training gene</div>
          ) : null}
        </div>
      </div>

      <ExpandPanel open={expandOpen} contents={expandPanelContents} />

      <div className={styles.componentDiv} style={{ marginTop: '1em' }}>
        <div className={styles.title}>Functional Annotation</div>
        <div className={styles.componentsContainer}>
          <div className={styles.componentDiv}>
            {data[dataFields.MF_TERMS].length > 0 &&
            data[dataFields.MF_TERMS] !== 'None' ? (
              <div className={styles.text}>
                {listToText(data[dataFields.MF_TERMS])}
              </div>
            ) : null}
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
        </div>
      </div>
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
  fetalDataValues: PropTypes.array,
  ipscDataValues: PropTypes.array,
  cortexDataValues: PropTypes.array,
  striatumDataValues: PropTypes.array,
  handleClose: PropTypes.func,
};

export default QueryResult;
