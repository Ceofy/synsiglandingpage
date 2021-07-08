import React from 'react';
import PropTypes from 'prop-types';

import ColorBar from '../colorBar/colorBar';
import LinkOut from '../linkOut';

import xIcon from '../../images/n2.svg';
import checkIcon from '../../images/noun_check.svg';
import blueXIcon from '../../images/noun_x_blue.svg';

import styles from './queryPanelStyles/queryResult.module.css';

import { dataFields, dataFieldNames } from '../../enums/enums';

const QueryResult = (props) => {
  const COLOR_BAR_HEIGHT = '8px';
  const COLOR_LINE_HEIGHT = '4px';
  const COLOR_POINTER_WIDTH = '10px';

  const capitalize = (string) => string[0].toUpperCase() + string.slice(1);
  const listToText = (string) => capitalize(string.replace(/'|\[|\]/g, ''));
  const findStatus = () => {
    //Positive training gene
    if (data[dataFields.TRAINING] === 'pos') {
      return 'Known SynGO synapse gene, used for training';
      //Negative training gene
    } else if (data[dataFields.TRAINING] === 'neg') {
      return 'Known non-synapse gene, used for training';
      //Verified synapse gene
    } else if (data[dataFields.ALL_SUM] > 0) {
      return 'Known synapse gene';
    } else {
      //Predicted to be synapse gene
      if (data[dataFields.SYNSIG] === 'yes') {
        return 'Novel predicted synapse gene';
        //Predicted not to be a synapse gene
      } else {
        return 'Predicted non-synapse gene';
      }
    }
  };

  const data = props.synsigDataValues;

  return (
    <div className={styles.queryResult}>
      <div className={styles.exContainer}>
        <img
          src={blueXIcon}
          className={styles.ex}
          onClick={props.handleClose}
        />
      </div>
      <div className={styles.title}>{data[dataFields.GENE]}</div>
      <div className={styles.text}>{capitalize(data[dataFields.NAME])}</div>
      <div className={styles.tableDivsContainer}>
        <div className={styles.fitTableDiv}>
          {data[dataFields.TRAINING] === 'no' ? (
            <>
              <div className={styles.title}>SynSig</div>
              <div className={styles.text}>
                {dataFieldNames.SYNAPSE_PERCENTILE}:{' '}
                {Math.floor(parseFloat(data[dataFields.SYNAPSE_PERCENTILE]))}
                <br />
                <div className={styles.colorBar}>
                  <ColorBar
                    barHeight={COLOR_BAR_HEIGHT}
                    lineHeight={COLOR_LINE_HEIGHT}
                    start={0}
                    end={99}
                    step={25}
                    pointerWidth={COLOR_POINTER_WIDTH}
                    pointerValue={data[dataFields.SYNAPSE_PERCENTILE]}
                  />
                </div>
              </div>
            </>
          ) : null}
          <div className={styles.title}>Status</div>
          <div className={styles.text}>{findStatus()}</div>
        </div>
        <div className={styles.fitTableDiv}>
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.tr}>
                <td className={styles.td} colSpan={2}>
                  <div className={styles.title}>Validation</div>
                </td>
              </tr>
              <tr className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.subtitle}>Database Validation:</div>
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
                    {dataFieldNames.SYNGO}:{' '}
                    {data[dataFields.SYNGO] === '1' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.SYNDB}:{' '}
                    {data[dataFields.SYNDB] === '1' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.SYNSYSNET}:{' '}
                    {data[dataFields.SYNSYSNET] === '1' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                  </div>
                </td>
                <td className={styles.noWrapTd}>
                  <div className={styles.text}>
                    {dataFieldNames.CORTEX}:{' '}
                    {data[dataFields.CORTEX] === '1' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.STRIATUM}:{' '}
                    {data[dataFields.STRIATUM] === '1' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.NGN2}:{' '}
                    {data[dataFields.NGN2] === '1' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.FETAL}:{' '}
                    {data[dataFields.FETAL] === '1' ? (
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
      <div className={styles.tableDiv}>
        <table className={styles.bottomTable}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <td className={styles.td} colSpan={2}>
                <div className={styles.title}>Function Analysis</div>
              </td>
            </tr>
            <tr className={styles.tr}>
              {data[dataFields.TRAINING] === 'no' ? (
                <td className={styles.noWrapTd}>
                  <div className={styles.subtitle}>Summary:</div>
                  <div className={styles.text}>
                    {dataFieldNames.RECEPTOR_CHANNEL}:{' '}
                    {data[dataFields.RECEPTOR_CHANNEL] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.KINASE_PHOSPHATASE}:{' '}
                    {data[dataFields.KINASE_PHOSPHATASE] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.UBIQUITIN_E3}:{' '}
                    {data[dataFields.UBIQUITIN_E3] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.VESICLE_TRANSPORTERS}:{' '}
                    {data[dataFields.VESICLE_TRANSPORTERS] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.GTP_ATP_REGULATORS}:{' '}
                    {data[dataFields.GTP_ATP_REGULATORS] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.NUCLEIC_ACID_BINDING}:{' '}
                    {data[dataFields.NUCLEIC_ACID_BINDING] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.TRANSLATION}:{' '}
                    {data[dataFields.TRANSLATION] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.MEMBRANE_CELL_ADHESION}:{' '}
                    {data[dataFields.MEMBRANE_CELL_ADHESION] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.OTHER_REGULATORS}:{' '}
                    {data[dataFields.OTHER_REGULATORS] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.SCAFFOLDS_ADAPTORS}:{' '}
                    {data[dataFields.SCAFFOLDS_ADAPTORS] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.CYTOSKELETAL}:{' '}
                    {data[dataFields.CYTOSKELETAL] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.CALCIUM_ION_BINDING}:{' '}
                    {data[dataFields.CALCIUM_ION_BINDING] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.OTHER_ENZYMES}:{' '}
                    {data[dataFields.OTHER_ENZYMES] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.OTHER_PROTEIN_BINDERS}:{' '}
                    {data[dataFields.OTHER_PROTEIN_BINDERS] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                    {dataFieldNames.UNKNOWN_FUNCTIONS}:{' '}
                    {data[dataFields.UNKNOWN_FUNCTIONS] === '1.0' ? (
                      <img src={checkIcon} className={styles.icon} />
                    ) : (
                      <img src={xIcon} className={styles.icon} />
                    )}
                    <br />
                  </div>
                </td>
              ) : null}
              <td className={styles.td}>
                <div className={styles.subtitle}>Known Functions:</div>
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

QueryResult.propTypes = {
  synsigDataValues: PropTypes.object,
  handleClose: PropTypes.func,
};

export default QueryResult;
