import React, { useState, useEffect, useRef } from 'react';

import SEO from '../components/seo';
import Panel from '../components/panel';
import LinkOut from '../components/linkOut';
import Layout from '../components/layout';
import TopPanel from '../components/topPanel/topPanel';
import ButtonLink from '../components/topPanel/buttonLink';

import VerticalTitle from '../components/topPanel/verticalTitle';
import VerticalButtonsContainer from '../components/topPanel/verticalButtonsContainer';

import QueryPanel from '../components/queryPanel/queryPanel';

import styles from './pageStyles/index.module.css';

import ucsd from '../images/ucsd.png';
import usc from '../images/usc.png';
import mit from '../images/mit.png';
import pnnl from '../images/pnnl.png';
import mcgill from '../images/mcgill.png';

import { useSynsigData } from '../hooks/use-synsig-data';

const contrastBackgroundColor = 'rgba(65,182,255, 0.25)';
const contrastTextColor = 'black';

const IndexPage = () => {
  //Make queries
  const synsigData = useSynsigData();

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
        <QueryPanel synsigData={synsigData} />
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
          <LinkOut link='https://github.com/KarenYuanMei/SynSig_Updated'>
            GitHub
          </LinkOut>
          .
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
            <img src={mcgill} alt='McGill University Logo'></img>
          </LinkOut>
        </div>
      </Panel>
    </Layout>
  );
};

export default IndexPage;
