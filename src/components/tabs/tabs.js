import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from './tabsStyles/tabs.module.css';
import './tabsStyles/tabsStyles.css';

export default (props) => {
  return (
    <Tabs
      className={[styles.outerTabs, 'outerTabs'].join(' ')}
      selectedIndex={props.outerIndex}
      onSelect={props.setOuterIndex}
    >
      <TabList style={{ borderBottom: 'none' }}>
        {props.majorTabs.map((tab) => (
          <Tab
            key={tab}
            style={{
              width: (100 / props.majorTabs.length).toString() + '%',
              textAlign: 'center',
            }}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      {props.majorTabs.map((tabs, index) => (
        <TabPanel key={index} className='tabPanel'>
          <Tabs
            className={[styles.tabs, 'tableTabs'].join(' ')}
            selectedIndex={props.innerIndex}
            onSelect={props.setInnerIndex}
          >
            <TabList style={{ textAlign: 'center' }}>
              {mapMinorTabList(props.minorTabs, props.tabDistribution, index)}
            </TabList>
            {mapMinorTabPanelList(props.contents, props.tabDistribution, index)}
          </Tabs>
        </TabPanel>
      ))}
    </Tabs>
  );
};

const mapMinorTabList = (tabNames, tabDistribution, index) => {
  let endIndex;
  if (tabDistribution.length === index + 1) {
    endIndex = tabNames.length;
  } else {
    endIndex = tabDistribution[index + 1];
  }

  const tabList = [];
  for (let i = tabDistribution[index]; i < endIndex; i++) {
    tabList.push(<Tab key={tabNames[i]}>{tabNames[i]}</Tab>);
  }

  return tabList;
};

const mapMinorTabPanelList = (tabContent, tabDistribution, index) => {
  let endIndex;
  if (tabDistribution.length === index + 1) {
    endIndex = tabContent.length;
  } else {
    endIndex = tabDistribution[index + 1];
  }

  const tabPanelList = [];
  for (let i = tabDistribution[index]; i < endIndex; i++) {
    tabPanelList.push(<TabPanel key={i}>{tabContent[i]}</TabPanel>);
  }

  return tabPanelList;
};

Tabs.propTypes = {
  majorTabs: PropTypes.array,
  minorTabs: PropTypes.array,
  contents: PropTypes.array,
  tabDistribution: PropTypes.array,
  outerIndex: PropTypes.number,
  innerIndex: PropTypes.number,
  setOuterIndex: PropTypes.func,
  setInnerIndex: PropTypes.func,
};
