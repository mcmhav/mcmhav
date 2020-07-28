import React, { Component } from 'react';
import ReactLoading from 'react-loading';

import TextField from '@material-ui/core/TextField';
import Eject from '@material-ui/icons/Eject';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Button from '@material-ui/core/Button';

import { Fab } from '../../../../components/buttons/Fab';

import styles from '../../styles';

class Adder extends Component {
  constructor() {
    super();
    this.state = {
      notes: '',
    };
  }

  onCountedPress = notes => () => {
    this.setState({ notes }, this.onPress);
  };

  notesAddFormater = notes => {
    return notes.trim();
  };
  onPress = () => {
    this.props.addItem(this.notesAddFormater(this.state.notes));
  };
  notesFormater = notes => {
    const arrow = '►';
    return notes.replace(/->/g, arrow);
  };
  onChange = event => {
    this.setState({ notes: this.notesFormater(event.target.value) });
  };

  gapiSignOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };
  gapiSignIn = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((result, error) => {
        if (!error) {
          this.props.gapiSignedIn(true);
        }
      });
  };
  render() {
    const { notes } = this.state;
    const { notesCounts, isSignedIn, isFetching } = this.props;

    return (
      <div style={styles.actionsWrapper}>
        <div style={styles.intputWrapper}>
          <div>
            {isSignedIn ? (
              <Fab id="signout_button" onClick={this.gapiSignOut}>
                <Eject />
              </Fab>
            ) : (
              <Fab id="authorize_button" onClick={this.gapiSignIn}>
                <PermIdentity />
              </Fab>
            )}
          </div>

          <TextField
            id="outlined-multiline-flexible"
            label="Notes"
            multiline
            rowsMax="4"
            error
            value={notes}
            onChange={this.onChange}
            // className={classes.textField}
            margin="none"
            // helperText="hello"
            variant="outlined"
            style={{ color: 'red' }}
          />
          <Button
            id="add_item"
            variant="outlined"
            color="secondary"
            onClick={this.onPress}
          >
            Add item
          </Button>
          {isFetching && (
            <ReactLoading type="cubes" height="56px" width="56px" color="red" />
          )}
        </div>

        <div className="quickAddButtons" style={styles.quickAddButtons}>
          {notesCounts.map(count => {
            return (
              <Button
                style={styles.quickAddButton}
                id={`${count.replace(/ /g, '-')}-key`}
                variant="outlined"
                color="secondary"
                onClick={this.onCountedPress(count)}
                key={`${count.replace(/ /g, '-')}-key`}
              >
                {count}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Adder;
