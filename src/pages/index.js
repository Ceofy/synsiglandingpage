import React, { useState, useEffect, useRef } from 'react';

import SEO from '../components/seo';
import Panel from '../components/panel';
import LinkOut from '../components/linkOut';
import Layout from '../components/layout';
import TopPanel from '../components/topPanel';
import ButtonLink from '../components/buttonLink';

import VerticalTitle from '../components/verticalTitle';
import VerticalButtonsContainer from '../components/verticalButtonsContainer';

import Table from '../components/table';
import Tabs from '../components/tabs';
import QueryPanel from '../components/queryPanel';

import styles from './pageStyles/index.module.css';

import ucsd from '../images/ucsd.png';
import usc from '../images/usc.png';
import mit from '../images/mit.png';
import pnnl from '../images/pnnl.png';

import { useSuppTable1SynSig } from '../hooks/use-supp-table-1-syn-sig';
import { useSynSigAllFunctionTab } from '../hooks/use-syn-sig-all-function-tab';
import { useSuppTable9EnSig } from '../hooks/use-supp-table-9-en-sig';
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

  useEffect(() => {
    console.log(sortOrder);
  }, [sortOrder]);

  //Handle searching
  const searchRef = useRef();
  const searchQuery = (gene) => {
    searchRef.current.searchQuery(gene);
    document.getElementById('search').scrollIntoView();
  };

  //Make queries
  const suppTable1SynSigData = useSuppTable1SynSig();
  const table3Data = useSynSigAllFunctionTab();
  const suppTable9EnSigData = useSuppTable9EnSig();
  const table6Data = useEnSigAllFunctionTab();
  const coreGenesData = useCoreGenesWebsiteVal();
  const table9Data = useCoreAllFunctionTab();

  //Process queries
  const suppTable1SynSigClassData = applyClasses(suppTable1SynSigData);
  const suppTable9EnSigClassData = applyClasses(suppTable9EnSigData);
  const coreGenesClassData = applyClasses(coreGenesData);

  const fieldsList1 = [
    'Gene',
    'Average_Score',
    'Classification',
    'SynGO',
    'GO_Synapse',
    'SynDB',
    'SynSysNet',
  ];
  const fieldsList2 = [
    'Gene',
    'Average_Score',
    'Classification',
    'Cortex',
    'Striatum',
    'NGN2',
    'Fetal',
  ];

  const table1Data = extract(suppTable1SynSigClassData, fieldsList1);
  const table2Data = extract(suppTable1SynSigClassData, fieldsList2);

  const table4Data = extract(suppTable9EnSigClassData, fieldsList1);
  const table5Data = extract(suppTable9EnSigClassData, fieldsList2);

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
          <ButtonLink
            text='Search SynSig'
            link='#search'
            tooltip={false}
            anchor
            onClick={() => {
              window.setTimeout(function () {
                document.getElementById('searchBar').focus();
              }, 0);
            }}
          />
          <ButtonLink
            text='View in GitHub'
            link='http://www.github.com/'
            tooltip={false}
          />
        </VerticalButtonsContainer>
      </TopPanel>
      <Panel backgroundColor='white' textColor='rgba(0, 0, 0, 0.8)'>
        <h2>SynSig</h2>
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
      </Panel>
      <Panel
        backgroundColor={contrastBackgroundColor}
        textColor={contrastTextColor}
      >
        <a id='search'>
          <h2>Search SynSig</h2>
        </a>
        <QueryPanel
          suppTable1SynSigData={suppTable1SynSigData}
          suppTable9EnSigData={suppTable9EnSigData}
          synSigAllFunctionTabData={table3Data}
          enSigAllFunctionTabData={table6Data}
          ref={searchRef}
        />
      </Panel>
      <Panel>
        <a id='data' className={styles.anchor}>
          <h2>SynSig Data</h2>
        </a>
        <Tabs
          majorTabs={['SynSig', 'EnSig', 'Core Synapse Genes']}
          contents={[
            <Table
              data={table1Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
            <Table
              data={table2Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
            <Table
              data={table3Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
            <Table
              data={table4Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
            <Table
              data={table5Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
            <Table
              data={table6Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
            <Table
              data={table7Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
            <Table
              data={table8Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
            <Table
              data={table9Data}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />, //clickEvent={searchQuery} />,
          ]}
          minorTabs={[
            'Prediction of SynSig Genes',
            'Experimental Validation of SynSig Genes',
            'Functional Analysis of SynSig Genes',
            'Prediction of EnSig Genes',
            'Experimental Validation of EnSig Genes',
            'Functional Analysis of EnSig Genes',
            'Database Validation of Core Synapse Genes',
            'Experimental Validation of Core Synapse Genes',
            'Functional Analysis of Core Synapse Genes',
          ]}
          tabDistribution={[0, 3, 6]}
          outerIndex={outerIndex}
          innerIndex={innerIndex}
          setOuterIndex={setOuterIndex}
          setInnerIndex={setInnerIndex}
        />
      </Panel>
      <Panel
        backgroundColor={contrastBackgroundColor}
        textColor={contrastTextColor}
      >
        <h2>SynSig Data Legend</h2>

        <h3>
          <a
            href='#data'
            onClick={() => {
              setOuterIndex(2);
              setInnerIndex(0);
            }}
            className={styles.smallA}
          >
            Core synapse genes:
          </a>
        </h3>
        <p>
          Canonical synapse genes used for training to predict SynSig and EnSig
          genes.
        </p>

        <h3>
          <a
            href='#data'
            onClick={() => {
              setOuterIndex(0);
              setInnerIndex(0);
            }}
            className={styles.smallA}
          >
            Prediction of SynSig genes:
          </a>
        </h3>
        <p>
          SynSig contains synapse genes predicted using synaptic signatures in
          multi-omics data. The "Average Score" shows the computed ranking of
          protein-coding genes, classifying each gene as either SynSig (likely
          to be synapse) or Negative in "Classification." Binary values in
          SynGO, GO Synapse, SynSysNet, and SynaptomeDB indicate synapse
          database validation of prediction.
        </p>

        <h3>
          <a
            href='#data'
            onClick={() => {
              setOuterIndex(1);
              setInnerIndex(0);
            }}
            className={styles.smallA}
          >
            Prediction of EnSig genes:
          </a>
        </h3>
        <p>
          Synapse genes predicted using synaptic signatures outside of the
          brain.
        </p>

        <h3>
          <a
            href='#data'
            onClick={() => {
              setOuterIndex(0);
              setInnerIndex(1);
            }}
            className={styles.smallA}
          >
            Experimental Validation:
          </a>
        </h3>
        <p>
          Synapse proteomics screens validate SynSig and EnSig genes. Binary
          values indicate either "1" for detected or "0" for not detected in
          each screen.
        </p>

        <h3>
          <a
            href='#data'
            onClick={() => {
              setOuterIndex(0);
              setInnerIndex(2);
            }}
            className={styles.smallA}
          >
            Functional Analysis:
          </a>
        </h3>
        <p>Biological function annotation of each synapse candidate.</p>
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
      </Panel>
    </Layout>
  );
};

const applyClasses = (data) => {
  const newData = [];

  const fields = [
    'Cortex',
    'Striatum',
    'NGN2',
    'Fetal',
    'SynGO',
    'GO_Synapse',
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
