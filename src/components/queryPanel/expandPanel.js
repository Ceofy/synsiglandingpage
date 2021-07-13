import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const Panel = withStyles({
  root: {
    marginBottom: '1em',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&$expanded': {
      margin: 'auto',
      marginBottom: '1em',
    },
  },
  expanded: {},
})(ExpansionPanel);

const Details = withStyles((theme) => ({
  root: {
    padding: '0',
  },
}))(ExpansionPanelDetails);

const ExpandPanel = (props) => {
  return (
    <Panel expanded={props.open}>
      <Details>{props.contents}</Details>
    </Panel>
  );
};

ExpandPanel.propTypes = {
  open: PropTypes.bool,
  contents: PropTypes.node,
};

export default ExpandPanel;
