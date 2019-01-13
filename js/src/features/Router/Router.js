import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

import Landing from '../Landing/Landing';
import { TFTest } from '../TFTest';
import { Snus } from '../Snus';

import './styles.css';

const Index = Landing;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const button = {
  backgroundColor: '#337ab7',
  borderColor: '#2e6da4',
  color: '#fff',
  borderRadius: '3px',
  fontSize: '12px',
  lineHeight: 1.5,
  padding: '1px 5px',
};

const actions = [
  {
    icon: (
      <Link to="/">
        <FileCopyIcon />
      </Link>
    ),
    name: 'Home',
  },
  {
    icon: (
      <Link to="/users/">
        <PrintIcon />
      </Link>
    ),
    name: 'Users',
  },
  {
    icon: (
      <Link to="/tf">
        <ShareIcon />
      </Link>
    ),
    name: 'tf',
  },
  {
    icon: (
      <Link to="/snus/">
        <SaveIcon />
      </Link>
    ),
    name: 'Snus',
  },
];

class AppRouter extends Component {
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

  render() {
    const { open } = this.state;

    return (
      <Router>
        <div id="router">
          <Route path="/" exact component={Index} />
          <Route path="/tf" exact component={TFTest} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/snus/" component={Snus} />

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
                onClick={this.handleClick}
              />
            ))}
          </SpeedDial>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
