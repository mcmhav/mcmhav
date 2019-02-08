import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import ShowChart from '@material-ui/icons/ShowChart';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';

import asyncComponent from '../../components/asyncComponent';

import './styles.css';

// import Graph from '../Graph';
// import Landing from '../Landing/Landing';
// import { Graph } from '../Graph';
// import { TFTest } from '../TFTest';
// import Snus from '../Snus';
const AsyncLanding = asyncComponent(() => import('../Landing'));
const AsyncSnus = asyncComponent(() => import('../Snus'));
const AsyncTFTest = asyncComponent(() => import('../TFTest'));
const AsyncGraph = asyncComponent(() => import('../Graph'));

const Index = AsyncLanding;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const actions = [
  {
    icon: <FileCopyIcon />,
    path: '/',
    name: 'Home',
  },
  {
    icon: <PrintIcon />,
    path: '/users/',
    name: 'Users',
  },
  {
    icon: <ShareIcon />,
    path: '/tf',
    name: 'tf',
  },
  {
    icon: <SaveIcon />,
    path: '/snus/',
    name: 'Snus',
  },
  {
    icon: <ShowChart />,
    path: '/graph/',
    name: 'Graph',
  },
];

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

  handleActionClick = path => () => {
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

class AppRouter extends Component {
  render() {
    const { push } = this.props;
    return [
      <Switch key="the-switchh">
        {/* <Router>
        <div id="router">
          <RouteOld path="/" exact component={Index} />
          <RouteOld path="/tf" exact component={AsyncTFTest} />
          <RouteOld path="/about/" component={About} />
          <RouteOld path="/users/" component={Users} />
          <RouteOld path="/snus/" component={AsyncSnus} />
          <RouteOld path="/graph/" component={AsyncGraph} />
          <Navigator push={push} />
      </Router> */}
        <Route exact path="/" render={() => <Index />} />
        <Route path="/graph/" render={() => <AsyncGraph />} />
        <Route path="/snus/" render={() => <AsyncSnus />} />
        <Route path="/users/" render={() => <Users />} />
        <Route path="/about/" render={() => <About />} />
        <Route path="/tf/" render={() => <AsyncTFTest />} />
      </Switch>,
      <Navigator key="the-navigator" push={push} />,
    ];
  }
}

export default AppRouter;
