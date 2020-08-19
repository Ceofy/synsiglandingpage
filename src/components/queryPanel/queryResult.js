import React from 'react';
import PropTypes from 'prop-types';

import ColorBar from '../colorBar/colorBar';

import styles from './queryPanelStyles/queryResult.module.css';

const QueryResult = (props) => {
  const COLOR_BAR_HEIGHT = '8px';
  const COLOR_LINE_HEIGHT = '4px';
  const COLOR_POINTER_WIDTH = '10px';

  let status;

  if (props.suppTable1SynSigValues !== undefined) {
    status = findStatus(
      props.suppTable1SynSigValues,
      props.suppTable9EnSigValues
    );
  }

  return (
    <div className={styles.queryResult}>
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
                      SynGO: {props.coreGeneValues['SynGO']}
                      <br />
                      GO Synapse: {props.coreGeneValues['GO_Synapse']}
                      <br />
                      SynDB: {props.coreGeneValues['SynDB']}
                      <br />
                      SynSysNet: {props.coreGeneValues['SynSysNet']}
                    </div>
                  </td>
                  <td className={styles.noWrapTd}>
                    <div className={styles.subtitle}>
                      Experimental Validation:
                    </div>
                    <div className={styles.text}>
                      Cortex: {props.coreGeneValues['Cortex']}
                      <br />
                      Striatum: {props.coreGeneValues['Striatum']}
                      <br />
                      NGN2: {props.coreGeneValues['NGN2']}
                      <br />
                      Fetal: {props.coreGeneValues['Fetal']}
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
                    <div className={styles.title}>Synapse Status:</div>
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
                        Average Score:{' '}
                        {props.suppTable1SynSigValues['Average_Score']}
                        <br />
                        Classification:{' '}
                        {props.suppTable1SynSigValues['Classification']}*
                        <div className={styles.colorBar}>
                          <ColorBar
                            barHeight={COLOR_BAR_HEIGHT}
                            lineHeight={COLOR_LINE_HEIGHT}
                            start={2.4}
                            mid={4.7}
                            end={6}
                            pointerWidth={COLOR_POINTER_WIDTH}
                            pointerValue={
                              props.suppTable1SynSigValues['Average_Score']
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.text}>
                        <div className={styles.title}>EnSig</div>
                        Average Score:{' '}
                        {props.suppTable9EnSigValues['Average_Score']}
                        <br />
                        Classification:{' '}
                        {props.suppTable9EnSigValues['Classification']}*
                        <div className={styles.colorBar}>
                          <ColorBar
                            barHeight={COLOR_BAR_HEIGHT}
                            lineHeight={COLOR_LINE_HEIGHT}
                            start={2.4}
                            mid={4.65}
                            end={6}
                            pointerWidth={COLOR_POINTER_WIDTH}
                            pointerValue={
                              props.suppTable9EnSigValues['Average_Score']
                            }
                          />
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
                      <div className={styles.title}>Synapse Status: </div>
                      <div className={styles.text}>{status}</div>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td} colSpan={2}>
                      <div className={styles.title}>Validation</div>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.noWrapTd}>
                      <div className={styles.subtitle}>
                        Database Validation:
                      </div>
                      <div className={styles.text}>
                        SynGO: {props.suppTable1SynSigValues['SynGO']}
                        <br />
                        GO Synapse: {props.suppTable1SynSigValues['GO_Synapse']}
                        <br />
                        SynDB: {props.suppTable1SynSigValues['SynDB']}
                        <br />
                        SynSysNet: {props.suppTable1SynSigValues['SynSysNet']}
                      </div>
                    </td>
                    <td className={styles.noWrapTd}>
                      <div className={styles.subtitle}>
                        Experimental Validation:
                      </div>
                      <div className={styles.text}>
                        Cortex: {props.suppTable1SynSigValues['Cortex']}
                        <br />
                        Striatum: {props.suppTable1SynSigValues['Striatum']}
                        <br />
                        NGN2: {props.suppTable1SynSigValues['NGN2']}
                        <br />
                        Fetal: {props.suppTable1SynSigValues['Fetal']}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.asteriskText}>
            *SynSig Classification is thresholded at similarity score of 4.7 to
            the core synapse genes; EnSig classification is thresholded at 4.65.
            Lower threshold will include more synapse genes, but will also lead
            to more false discoveries.
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
                    <div className={styles.title}>Function Analysis</div>
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
              <tr className={styles.tr}>
                <td className={styles.td} colSpan={2}>
                  <span className={styles.title}>Function Analysis:</span> N/A
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const findStatus = (synSigData, enSigData) => {
  const databaseList = ['SynGO', 'GO_Synapse', 'SynDB', 'SynSysNet'];
  let database = false;
  for (let key of databaseList) {
    if (synSigData[key] === '1') {
      return 'Known synapse gene';
    }
  }

  const experimentList = ['Cortex', 'Striatum', 'NGN2', 'Fetal'];
  let experiment = false;
  for (let key of experimentList) {
    if (synSigData[key] === '1') {
      return 'Novel synapse gene';
    }
  }

  if (
    synSigData['Classification'] === 'SynSig' ||
    enSigData['Classification'] === 'EnSig'
  ) {
    return 'Predicted synapse gene';
  }

  return 'Not a synapse gene';
};

QueryResult.propTypes = {
  suppTable1SynSigValues: PropTypes.object,
  suppTable9EnSigValues: PropTypes.object,
  coreGeneValues: PropTypes.object,
  allFunctionTabValues: PropTypes.object,
};

export default QueryResult;
