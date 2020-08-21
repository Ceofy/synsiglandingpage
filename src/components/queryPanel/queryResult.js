import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ColorBar from '../colorBar/colorBar';
import LinkOut from '../linkOut';

import styles from './queryPanelStyles/queryResult.module.css';

const QueryResult = (props) => {
  const [gene, setGene] = useState();
  const [status, setStatus] = useState('');

  const COLOR_BAR_HEIGHT = '8px';
  const COLOR_LINE_HEIGHT = '4px';
  const COLOR_POINTER_WIDTH = '10px';

  useEffect(() => {
    if (props.suppTable1SynSigValues !== undefined) {
      setStatus(
        findStatus(props.suppTable1SynSigValues, props.suppTable9EnSigValues)
      );
    }

    if (props.coreGeneValues) {
      setGene(props.coreGeneValues['Gene']);
    } else {
      setGene(props.suppTable1SynSigValues['Gene']);
    }
    console.log(status);
  }, []);

  return (
    <div className={styles.queryResult}>
      <div className={styles.exContainer}>
        <i
          className={['fas fa-times', styles.ex].join(' ')}
          onClick={props.handleClose}
        ></i>
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
                        <i
                          className={['fas fa-check', styles.check].join(' ')}
                        ></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                      <br />
                      GO Synapse:{' '}
                      {props.coreGeneValues['GO_Synapse'] === '1' ? (
                        <i
                          className={['fas fa-check', styles.check].join(' ')}
                        ></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                      <br />
                      SynDB:{' '}
                      {props.coreGeneValues['SynDB'] === '1' ? (
                        <i
                          className={['fas fa-check', styles.check].join(' ')}
                        ></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                      <br />
                      SynSysNet:{' '}
                      {props.coreGeneValues['SynSysNet'] === '1' ? (
                        <i
                          className={['fas fa-check', styles.check].join(' ')}
                        ></i>
                      ) : (
                        <i className='fas fa-times'></i>
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
                        <i
                          className={['fas fa-check', styles.check].join(' ')}
                        ></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                      <br />
                      Striatum:{' '}
                      {props.coreGeneValues['Striatum'] === '1' ? (
                        <i
                          className={['fas fa-check', styles.check].join(' ')}
                        ></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                      <br />
                      hiPSC:{' '}
                      {props.coreGeneValues['hiPSC'] === '1' ? (
                        <i
                          className={['fas fa-check', styles.check].join(' ')}
                        ></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                      <br />
                      Fetal:{' '}
                      {props.coreGeneValues['Fetal'] === '1' ? (
                        <i
                          className={['fas fa-check', styles.check].join(' ')}
                        ></i>
                      ) : (
                        <i className='fas fa-times'></i>
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
                        Average Score:{' '}
                        {parseFloat(
                          props.suppTable1SynSigValues['Average_Score']
                        ).toFixed(2)}
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
                        {parseFloat(
                          props.suppTable9EnSigValues['Average_Score']
                        ).toFixed(2)}
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
                          <i
                            className='fas fa-check'
                            style={{ color: 'rgb(255, 140, 0)' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                        <br />
                        GO Synapse:{' '}
                        {props.suppTable1SynSigValues['GO_Synapse'] === '1' ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'rgb(255, 140, 0)' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                        <br />
                        SynDB:{' '}
                        {props.suppTable1SynSigValues['SynDB'] === '1' ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'rgb(255, 140, 0)' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                        <br />
                        SynSysNet:{' '}
                        {props.suppTable1SynSigValues['SynSysNet'] === '1' ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'rgb(255, 140, 0)' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </div>
                    </td>
                    <td className={styles.noWrapTd}>
                      <div className={styles.text}>
                        Cortex:{' '}
                        {props.suppTable1SynSigValues['Cortex'] === '1' ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'rgb(255, 140, 0)' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                        <br />
                        Striatum:{' '}
                        {props.suppTable1SynSigValues['Striatum'] === '1' ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'rgb(255, 140, 0)' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                        <br />
                        hiPSC:{' '}
                        {props.suppTable1SynSigValues['hiPSC'] === '1' ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'rgb(255, 140, 0)' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                        <br />
                        Fetal:{' '}
                        {props.suppTable1SynSigValues['Fetal'] === '1' ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'rgb(255, 140, 0)' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td} colSpan={2}>
                      <div className={styles.title}>Status</div>
                      <div className={styles.text}>{status}</div>
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

const findStatus = (synSigData, enSigData) => {
  const databaseList = ['SynGO', 'GO_Synapse', 'SynDB', 'SynSysNet'];
  let database = false;
  for (let key of databaseList) {
    if (synSigData[key] === '1') {
      return 'Known synapse gene';
    }
  }

  const experimentList = ['Cortex', 'Striatum', 'hiPSC', 'Fetal'];
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
  handleClose: PropTypes.func,
};

export default QueryResult;
