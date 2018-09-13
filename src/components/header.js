import * as React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Typography variant="title" color="inherit">
            Quiz Fun
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
