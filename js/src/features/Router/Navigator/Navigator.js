import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

function Navigator(props) {
  const { actions } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {};
  const handleOpen = () => {};

  const handleActionClick = path => () => {
    setOpen(!open);
    props.push(path);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      icon={<SpeedDialIcon />}
      onBlur={handleClose}
      onClick={handleClick}
      onClose={handleClose}
      onFocus={handleOpen}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
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
          tooltipPlacement="right"
          onClick={handleActionClick(action.path)}
        />
      ))}
    </SpeedDial>
  );
}

Navigator.propTypes = {
  push: PropTypes.func,
  actions: PropTypes.array,
};

export default Navigator;
