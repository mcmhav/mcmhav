import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from '../Landing/Landing';
import { TFTest } from '../TFTest';
import { Snus } from '../Snus';

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

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Index} />
      <Route path="/tf" exact component={TFTest} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Route path="/snus/" component={Snus} />

      <nav
        style={{
          position: 'absolute',
          top: 0,
        }}
      >
        <ul>
          <li style={button}>
            <Link to="/">Home</Link>
          </li>
          <li style={button}>
            <Link to="/tf">tf</Link>
          </li>
          <li style={button}>
            <Link to="/users/">Users</Link>
          </li>
          <li style={button}>
            <Link to="/snus/">Snus</Link>
          </li>
        </ul>
      </nav>
    </div>
  </Router>
);

export default AppRouter;
