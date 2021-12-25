import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Tables } from './components/tables';
import { Adder } from './components/adder';

import styles from './styles';
import './styles.css';

class Snus extends Component {
  async componentDidMount() {
    this.props.dataFetch();
  }

  render() {
    return (
      <div className="Snus" style={styles.snus}>
        <Adder />
        <Tables />
      </div>
    );
  }
}

Snus.propTypes = {
  dataFetch: PropTypes.func,
};

export default Snus;
