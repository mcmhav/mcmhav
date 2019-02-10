import React, { Component } from 'react';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

class Navigator extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleActionClick = path => event => {
    this.setState(
      state => ({
        open: !state.open,
      }),
      () => {
        this.props.push(path);
      },
    );
  };

  render() {
    const { actions } = this.props;
    const { open } = this.state;

    return (
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        // className={classes.speedDial}
        // hidden={hidden}
        icon={<SpeedDialIcon />}
        onBlur={this.handleClose}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onFocus={this.handleOpen}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        open={open}
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
        }}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={this.handleActionClick(action.path)}
          />
        ))}
      </SpeedDial>
    );
  }
}

export default Navigator;
