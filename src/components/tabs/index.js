import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './tabStyles/tabs.module.css';
import './tabStyles/tabsStyles.css';

const TabsComponent = (props) => {
  let index = 0;
  if (props.tabNames !== undefined && props.contents !== undefined) {
    return (
      <Tabs onSelect={props.onSelect} selectedIndex={props.selectedIndex}>
        <TabList className={styles.tabList}>
          {props.tabNames.map((name) => (
            <Tab key={name}>
              <div className={styles.tabName}>{name}</div>
            </Tab>
          ))}
        </TabList>
        {props.contents.map((content) => (
          <TabPanel key={index++}>{content}</TabPanel>
        ))}
      </Tabs>
    );
  } else {
    return null;
  }
};

TabsComponent.defaultProps = {
  tabNames: [],
  contents: [],
};

TabsComponent.propTypes = {
  tabNames: PropTypes.array,
  contents: PropTypes.array,
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
};

export default TabsComponent;
