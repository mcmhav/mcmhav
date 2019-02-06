import React,{ Component } from 'react';
import dateFns from 'date-fns';

import TextField from '@material-ui/core/TextField';
import { Fab } from '../../components/buttons/Fab';
import Eject from '@material-ui/icons/Eject';
import PermIdentity from '@material-ui/icons/PermIdentity';
import { handleClientLoad,spreadsheetId } from './gapiTestur';
import Button from '@material-ui/core/Button';

import { Tables } from './components/tables';
import { Adder } from './components/adder';

import styles from './styles';
import './styles.css';

class Snus extends Component {
  constructor() {
    super();
  }

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

export default Snus;
