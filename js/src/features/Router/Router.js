import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import ShowChart from '@material-ui/icons/ShowChart';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';

import { Navigator } from './Navigator';
import asyncComponent from '../../components/asyncComponent';

import './styles.css';

const AsyncLanding = asyncComponent(() => import('../Landing'));
const AsyncSnus = asyncComponent(() => import('../Snus'));
const AsyncTFTest = asyncComponent(() => import('../TFTest'));
const AsyncGraph = asyncComponent(() => import('../Graph'));
const AsyncDev = asyncComponent(() => import('../Dev'));

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const navs = [
  {
    route: {
      render: AsyncLanding,
      exact: true,
    },
    path: '/',
    action: {
      icon: <FileCopyIcon />,
      name: 'Home',
    },
  },
  {
    route: {
      render: About,
    },
    path: '/users',
    action: {
      icon: <PrintIcon />,
      name: 'Users',
    },
  },
  {
    route: { render: Users },
    path: '/about',
    action: {
      icon: <PrintIcon />,
      name: 'About',
    },
  },
  {
    route: { render: AsyncTFTest },
    path: '/tf',
    action: {
      icon: <ShareIcon />,
      name: 'tf',
    },
  },
  {
    route: { render: AsyncSnus },
    path: '/snus',
    action: {
      icon: <SaveIcon />,
      name: 'Snus',
    },
  },
  {
    route: { render: AsyncGraph },
    path: '/graph',
    action: {
      icon: <ShowChart />,
      name: 'Graph',
    },
  },
  {
    route: { render: AsyncDev },
    path: '/dev',
    action: {
      icon: <ShowChart />,
      name: 'Dev',
    },
  },
];

const renderRouterAndNavigator = () => {
  const routes = [];
  const actions = [];
  navs.forEach(nav => {
    const { render, ...rest } = nav.route;
    let RenderTmp = render;

    routes.push(
      <Route
        key={`route-key-${nav.action.name}`}
        render={() => <RenderTmp />}
        path={nav.path}
        {...rest}
      />,
    );
    actions.push({
      ...nav.action,
      path: nav.path,
    });
  });

  return { routes, actions };
};
const { routes, actions } = renderRouterAndNavigator();

class AppRouter extends Component {
  render() {
    return [
      <Switch key="the-switchh">{routes.map(route => route)}</Switch>,
      <Navigator actions={actions} key="the-navigator" />,
    ];
  }
}

export default AppRouter;
