import React from 'react';
import { Route, Routes } from 'react-router';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import ShowChart from '@material-ui/icons/ShowChart';
import PrintIcon from '@material-ui/icons/Print';

import { Navigator } from './Navigator';

import './styles.css';

const AsyncMap = React.lazy(() => import('../Map'));
const AsyncLanding = React.lazy(() => import('../Landing'));
const AsyncSnus = React.lazy(() => import('../Snus'));
const AsyncGraph = React.lazy(() => import('../Graph'));
const AsyncDev = React.lazy(() => import('../Dev'));
const AsyncRandomBible = React.lazy(() => import('../RandomBible'));
const AsyncAmGraph = React.lazy(() => import('../AmGraph'));
const AsyncStravaAuth = React.lazy(() => import('../StravaAuth'));
const AsyncDeltaFosB = React.lazy(() => import('../DeltaFosB'));

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
    route: { render: AsyncAmGraph },
    path: '/amgraph',
    action: {
      icon: <ShowChart />,
      name: 'AmGraph',
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
  {
    route: { render: AsyncRandomBible },
    path: '/randomBible',
    action: {
      icon: <ShowChart />,
      name: 'RandomBible',
    },
  },
  {
    route: { render: AsyncMap },
    path: '/map',
    action: {
      icon: <ShowChart />,
      name: 'Map',
    },
  },
  {
    route: { render: AsyncDeltaFosB },
    path: '/deltafosb',
    action: {
      icon: <ShowChart />,
      name: 'ΔFosB',
    },
  },
  {
    route: { render: AsyncStravaAuth },
    path: '/strava-auth',
    action: {
      icon: <ShowChart />,
      name: 'StravaAuth',
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
        element={
          <React.Suspense fallback={<>...</>}>
            <RenderTmp />
          </React.Suspense>
        }
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

function AppRouter() {
  return [
    <Routes key="the-switch">{routes.map(route => route)}</Routes>,
    <Navigator actions={actions} key="the-navigator" />,
  ];
}

export default AppRouter;
