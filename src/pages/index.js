import React, { useState, useEffect, useRef } from 'react';

import SEO from '../components/seo';
import Panel from '../components/panel';
import LinkOut from '../components/linkOut';
import Layout from '../components/layout';
import TopPanel from '../components/topPanel/topPanel';
import ButtonLink from '../components/topPanel/buttonLink';

import VerticalTitle from '../components/topPanel/verticalTitle';
import VerticalButtonsContainer from '../components/topPanel/verticalButtonsContainer';

import Table from '../components/table/table';
import Tabs from '../components/tabs/tabs';
import QueryPanel from '../components/queryPanel/queryPanel';

import styles from './pageStyles/index.module.css';

import ucsd from '../images/ucsd.png';
import usc from '../images/usc.png';
import mit from '../images/mit.png';
import pnnl from '../images/pnnl.png';
import mcgill from '../images/mcgill.png';

import { useSuppTable1SynSig } from '../hooks/use-supp-table-1-syn-sig';
import { useSynSigAllFunctionTab } from '../hooks/use-syn-sig-all-function-tab';
import { useEnSigAllFunctionTab } from '../hooks/use-en-sig-all-function-tab';
import { useCoreGenesWebsiteVal } from '../hooks/use-core-genes-website-val';
import { useCoreAllFunctionTab } from '../hooks/use-core-all-function-tab';

const contrastBackgroundColor = 'rgba(65,182,255, 0.25)';
const contrastTextColor = 'black';

const IndexPage = () => {
  //Handle sorting
  const [sortOrder, setSortOrder] = useState({
    column: 'Gene',
    direction: 'asc',
  });

  //Handle searching
  const searchRef = useRef();
  const searchQuery = (gene) => {
    searchRef.current.searchQuery(gene);
    document.getElementById('search').scrollIntoView();
  };

  //Make queries
  const suppTable1SynSigData = useSuppTable1SynSig();
  const table3Data = useSynSigAllFunctionTab();
  const table6Data = useEnSigAllFunctionTab();
  const coreGenesData = useCoreGenesWebsiteVal();
  const table9Data = useCoreAllFunctionTab();

  //Process queries
  const suppTable1SynSigClassData = applyClasses(suppTable1SynSigData);
  const coreGenesClassData = applyClasses(coreGenesData);

  const fieldsList1 = [
    'Gene',
    'Average_Score',
    'Classification',
    'SynGO',
    'SynDB',
    'SynSysNet',
  ];
  const fieldsList2 = [
    'Gene',
    'Average_Score',
    'Classification',
    'Cortex',
    'Striatum',
    'hiPSC',
    'Fetal',
  ];

  const table1Data = extract(suppTable1SynSigClassData, fieldsList1);
  const table2Data = extract(suppTable1SynSigClassData, fieldsList2);

  const table7Data = extract(coreGenesClassData, fieldsList1);
  const table8Data = extract(coreGenesClassData, fieldsList2);

  //Handle tabs
  const [outerIndex, setOuterIndex] = useState(0);
  const [innerIndex, setInnerIndex] = useState(0);

  return (
    <Layout>
      <SEO title='SynSig' />
      <TopPanel>
        <VerticalTitle title='SynSig' subtitle='Synaptic Signatures' />
        <VerticalButtonsContainer>
          <ButtonLink text='Learn More' link='#about' tooltip={false} anchor />
        </VerticalButtonsContainer>
      </TopPanel>
      <Panel>
        <a id='search'>
          <h2>Search SynSig</h2>
        </a>
        <QueryPanel
          suppTable1SynSigData={suppTable1SynSigData}
          coreGenesData={coreGenesData}
          synSigAllFunctionTabData={table3Data}
          enSigAllFunctionTabData={table6Data}
          coreGenesAllFunctionTabData={table9Data}
          ref={searchRef}
        />
      </Panel>
      <Panel
        backgroundColor={contrastBackgroundColor}
        textColor={contrastTextColor}
      >
        <a id='about'>
          <h2>About SynSig</h2>
        </a>
        <p>
          {
            'The synapse is a complex protein-dense structure critical for proper brain functioning. The molecular composition of the synaptic network is incompletely defined, impeding our understanding of healthy and diseased neurological functions. To address this gap, we devised a machine learning system to capture core features of the synapse from their genomic, transcriptomic, and structural patterns – a “synaptic signature” – leading to the identification of novel synaptic proteins.'
          }
        </p>
        <p>
          {
            'Manuscript in preparation: Mei et al., "Identifying Synapse Genes Using Global Molecular Signatures." In Preparation.'
          }
        </p>
        <p>
          All code can be found on{' '}
          <LinkOut link='http://github.com'>GitHub</LinkOut>.
        </p>
      </Panel>
      <Panel>
        <h2>Collaborators</h2>
        <div className={styles.logosContainer}>
          <LinkOut link='https://medschool.ucsd.edu/Pages/default.aspx'>
            <img
              src={ucsd}
              style={{ position: 'relative', top: '0.65em' }}
              alt='UCSD School of Medicine Logo'
            />
          </LinkOut>
          <LinkOut link='https://www.pnnl.gov/'>
            <img
              src={pnnl}
              style={{ marginTop: '-2em' }}
              alt='Pacific Northwest National Laboratory Logo'
            />
          </LinkOut>
        </div>
        <div className={styles.logosContainer}>
          <LinkOut link='https://www.usc.edu/'>
            <img src={usc} alt='University of Southern California Logo' />
          </LinkOut>
          <LinkOut link='https://www.mit.edu/'>
            <img src={mit} alt='MIT Logo' />
          </LinkOut>
        </div>
        <div className={styles.logosContainer}>
          <LinkOut link='https://www.mcgill.ca/'>
            <img src={mcgill} alt='McGill University Logo' />
          </LinkOut>
        </div>
      </Panel>
    </Layout>
  );
};

const applyClasses = (data) => {
  const newData = [];

  const fields = [
    'Cortex',
    'Striatum',
    'hiPSC',
    'Fetal',
    'SynGO',
    'SynDB',
    'SynSysNet',
  ];

  for (let i = 0; i < data.length; i++) {
    const newObject = JSON.parse(JSON.stringify(data[i]));
    if ('Classification' in newObject) {
      if (
        newObject.Classification === 'SynSig' ||
        newObject.Classification === 'EnSig'
      ) {
        newObject.Classification = (
          <div className={styles.highlight}>{newObject.Classification}</div>
        );
      }
    }

    for (let j = 0; j < fields.length; j++) {
      if (newObject[fields[j]] === '1') {
        newObject[fields[j]] = <div className={styles.highlight}>1</div>;
      }
    }
    newData.push(newObject);
  }

  return newData;
};

const extract = (list, fields) => {
  const newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push(pick(list[i], fields));
  }
  return newList;
};

const pick = (object, fields) => {
  return fields.reduce((newObject, field) => {
    if (object.hasOwnProperty(field)) {
      newObject[field] = object[field];
    }
    return newObject;
  }, {});
};

export default IndexPage;
