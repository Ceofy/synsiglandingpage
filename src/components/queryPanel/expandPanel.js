import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const Panel = withStyles({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(ExpansionPanel);

const Details = withStyles((theme) => ({
  root: {
    padding: '0',
    justifyContent: 'center',
  },
}))(ExpansionPanelDetails);

const ExpandPanel = (props) => {
  if (props.contents !== null) {
    return (
      <Panel expanded={props.open}>
        <Details>{props.contents}</Details>
      </Panel>
    );
  }
  return (
    <Panel expanded={props.open}>
      <Details>
        <div />
      </Details>
    </Panel>
  );
};

ExpandPanel.defaultProps = {
  contents: <div />,
};

ExpandPanel.propTypes = {
  open: PropTypes.bool,
  contents: PropTypes.node,
};

export default ExpandPanel;
