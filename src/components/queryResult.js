import React from 'react';
import PropTypes from 'prop-types';

import ColorBar from './colorBar';

import styles from './componentStyles/queryResult.module.css';

const QueryResult = (props) => {
  const COLOR_BAR_HEIGHT = '8px';
  const COLOR_LINE_HEIGHT = '4px';
  const COLOR_POINTER_WIDTH = '10px';

  const status = findStatus(props.suppTable1SynSigValues);

  return (
    <div className={styles.queryResult}>
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
                    {props.suppTable1SynSigValues['Classification']}
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
                    {props.suppTable9EnSigValues['Classification']}
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
                  <div className={styles.title}>Validation</div>
                </td>
              </tr>

              <tr className={styles.tr}>
                <td className={styles.noWrapTd}>
                  <div className={styles.subtitle}>Database Validation:</div>
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

const findStatus = (data) => {
  const databaseList = ['SynGO', 'GO_Synapse', 'SynDB', 'SynSysNet'];
  let database = 0;
  for (let key of databaseList) {
    database += parseInt(data[key]);
  }

  const experimentList = ['Cortex', 'Striatum', 'NGN2', 'Fetal'];
  let experiment = 0;
  for (let key of experimentList) {
    experiment += parseInt(data[key]);
  }

  if (database) {
    return 'Known synapse gene';
  } else if (experiment) {
    return 'Novel synapse gene';
  } else {
    return 'Not a synapse gene';
  }
};

QueryResult.propTypes = {
  suppTable1SynSigValues: PropTypes.object,
  suppTable9EnSigValues: PropTypes.object,
  allFunctionTabValues: PropTypes.object,
};

export default QueryResult;
