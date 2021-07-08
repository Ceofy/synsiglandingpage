import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ColorBar from '../colorBar/colorBar';
import LinkOut from '../linkOut';
import xIcon from '../../images/noun_x.svg';
import checkIcon from '../../images/noun_check.svg';
import blueXIcon from '../../images/noun_x_blue.svg';

import styles from './queryPanelStyles/queryResult.module.css';

const QueryResult = (props) => {
  const [gene, setGene] = useState();

  const COLOR_BAR_HEIGHT = '8px';
  const COLOR_LINE_HEIGHT = '4px';
  const COLOR_POINTER_WIDTH = '10px';

  useEffect(() => {
    if (props.coreGeneValues) {
      setGene(props.coreGeneValues['Gene']);
    } else {
      setGene(props.suppTable1SynSigValues['Gene']);
    }
  }, [props.coreGeneValues, props.suppTable1SynSigValues]);

  return (
    <div className={styles.queryResult}>
      <div className={styles.exContainer}>
        <img
          src={blueXIcon}
          className={styles.ex}
          onClick={props.handleClose}
        />
      </div>
      {props.coreGeneValues ? (
        <div className={styles.tableDivsContainer}>
          <div className={styles.fitTableDiv}>
            <table className={styles.fitTable}>
              <tbody className={styles.tbody}>
                <tr className={styles.tr}>
                  <td className={styles.td} colSpan={2}>
                    <div className={styles.title}>Validation</div>
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <td className={styles.noWrapTd}>
                    <div className={styles.subtitle}>Database Validation:</div>
                    <div className={styles.text}>
                      SynGO:{' '}
                      {props.coreGeneValues['SynGO'] === '1' ? (
                        <img src={checkIcon} className={styles.icon} />
                      ) : (
                        <img src={xIcon} className={styles.icon} />
                      )}
                      <br />
                      SynDB:{' '}
                      {props.coreGeneValues['SynDB'] === '1' ? (
                        <img src={checkIcon} className={styles.icon} />
                      ) : (
                        <img src={xIcon} className={styles.icon} />
                      )}
                      <br />
                      SynSysNet:{' '}
                      {props.coreGeneValues['SynSysNet'] === '1' ? (
                        <img src={checkIcon} className={styles.icon} />
                      ) : (
                        <img src={xIcon} className={styles.icon} />
                      )}
                    </div>
                  </td>
                  <td className={styles.noWrapTd}>
                    <div className={styles.subtitle}>
                      Experimental Validation:
                    </div>
                    <div className={styles.text}>
                      Cortex:{' '}
                      {props.coreGeneValues['Cortex'] === '1' ? (
                        <img src={checkIcon} className={styles.icon} />
                      ) : (
                        <img src={xIcon} className={styles.icon} />
                      )}
                      <br />
                      Striatum:{' '}
                      {props.coreGeneValues['Striatum'] === '1' ? (
                        <img src={checkIcon} className={styles.icon} />
                      ) : (
                        <img src={xIcon} className={styles.icon} />
                      )}
                      <br />
                      hiPSC:{' '}
                      {props.coreGeneValues['hiPSC'] === '1' ? (
                        <img src={checkIcon} className={styles.icon} />
                      ) : (
                        <img src={xIcon} className={styles.icon} />
                      )}
                      <br />
                      Fetal:{' '}
                      {props.coreGeneValues['Fetal'] === '1' ? (
                        <img src={checkIcon} className={styles.icon} />
                      ) : (
                        <img src={xIcon} className={styles.icon} />
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.tableDiv}>
            <table className={styles.table}>
              <tbody className={styles.tbody}>
                <tr className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.title}>Status</div>
                    <div className={styles.text}>Core synapse gene*</div>
                    <div className={styles.asteriskText}>
                      *Core synapse genes used for training do not have
                      predicted scores.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.tableDivsContainer}>
            <div className={styles.tableDiv}>
              <table className={styles.table}>
                <tbody className={styles.tbody}>
                  <tr className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.title}>SynSig</div>
                      <div className={styles.text}>
                        Synapse Percentile:{' '}
                        {Math.floor(
                          parseFloat(
                            props.suppTable1SynSigValues['Synapse_Percentile']
                          )
                        )}
                        <br />
                        <div className={styles.colorBar}>
                          <ColorBar
                            barHeight={COLOR_BAR_HEIGHT}
                            lineHeight={COLOR_LINE_HEIGHT}
                            start={0}
                            end={99}
                            step={25}
                            pointerWidth={COLOR_POINTER_WIDTH}
                            pointerValue={
                              props.suppTable1SynSigValues['Synapse_Percentile']
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.text}>
                        <div className={styles.title}>Status</div>
                        <div className={styles.text}>
                          {props.suppTable1SynSigValues['Status']}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.tableDiv}>
              <table className={styles.table}>
                <tbody className={styles.tbody}>
                  <tr className={styles.tr}>
                    <td className={styles.td} colSpan={2}>
                      <div className={styles.title}>Validation</div>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.subtitle}>
                        Database Validation:
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.subtitle}>
                        Experimental Validation:
                      </div>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.noWrapTd}>
                      <div className={styles.text}>
                        SynGO:{' '}
                        {props.suppTable1SynSigValues['SynGO'] === '1' ? (
                          <img src={checkIcon} className={styles.icon} />
                        ) : (
                          <img src={xIcon} className={styles.icon} />
                        )}
                        <br />
                        SynDB:{' '}
                        {props.suppTable1SynSigValues['SynDB'] === '1' ? (
                          <img src={checkIcon} className={styles.icon} />
                        ) : (
                          <img src={xIcon} className={styles.icon} />
                        )}
                        <br />
                        SynSysNet:{' '}
                        {props.suppTable1SynSigValues['SynSysNet'] === '1' ? (
                          <img src={checkIcon} className={styles.icon} />
                        ) : (
                          <img src={xIcon} className={styles.icon} />
                        )}
                      </div>
                    </td>
                    <td className={styles.noWrapTd}>
                      <div className={styles.text}>
                        Cortex:{' '}
                        {props.suppTable1SynSigValues['Cortex'] === '1' ? (
                          <img src={checkIcon} className={styles.icon} />
                        ) : (
                          <img src={xIcon} className={styles.icon} />
                        )}
                        <br />
                        Striatum:{' '}
                        {props.suppTable1SynSigValues['Striatum'] === '1' ? (
                          <img src={checkIcon} className={styles.icon} />
                        ) : (
                          <img src={xIcon} className={styles.icon} />
                        )}
                        <br />
                        hiPSC:{' '}
                        {props.suppTable1SynSigValues['hiPSC'] === '1' ? (
                          <img src={checkIcon} className={styles.icon} />
                        ) : (
                          <img src={xIcon} className={styles.icon} />
                        )}
                        <br />
                        Fetal:{' '}
                        {props.suppTable1SynSigValues['Fetal'] === '1' ? (
                          <img src={checkIcon} className={styles.icon} />
                        ) : (
                          <img src={xIcon} className={styles.icon} />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <div className={styles.tableDiv}>
        <table className={styles.bottomTable}>
          <tbody className={styles.tbody}>
            {props.allFunctionTabValues ? (
              <>
                <tr className={styles.tr}>
                  <td className={styles.td} colSpan={2}>
                    <div className={styles.title}>
                      Function Analysis{' '}
                      <span>
                        (
                        <LinkOut
                          link={
                            'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' +
                            gene
                          }
                        >
                          GeneCards
                        </LinkOut>
                        )
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <td className={styles.noWrapTd}>
                    <div className={styles.subtitle}>Summary:</div>
                    Signaling: {props.allFunctionTabValues['Signaling']}
                    <br />
                    Transport: {props.allFunctionTabValues['Transport']}
                    <br />
                    Organization: {props.allFunctionTabValues['Organization']}
                    <br />
                    Metabolism: {props.allFunctionTabValues['Metabolism']}
                    <br />
                    Development: {props.allFunctionTabValues['Development']}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.subtitle}>Known Functions:</div>
                    {props.allFunctionTabValues['Known_Functions']}
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.title}>
                      Function Analysis{' '}
                      <span>
                        (
                        <LinkOut
                          link={
                            'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' +
                            gene
                          }
                        >
                          GeneCards
                        </LinkOut>
                        )
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <td className={styles.td}>N/A</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

QueryResult.propTypes = {
  suppTable1SynSigValues: PropTypes.object,
  coreGeneValues: PropTypes.object,
  allFunctionTabValues: PropTypes.object,
  handleClose: PropTypes.func,
};

export default QueryResult;
