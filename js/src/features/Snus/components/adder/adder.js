import React,{ Component } from 'react';

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
    console.log('press');
    this.setState({ notes },this.onPress);
  };

  onPress = () => {
    this.props.addItem(this.state.notes);
  };
  onChange = event => {
    this.setState({ notes: event.target.value });
  };

  render() {
    const { notes } = this.state;
    const { notesCounts,isSignedIn } = this.props;

    return (
      <div style={styles.actionsWrapper}>
        <div style={styles.intputWrapper}>
          <div>
            {isSignedIn ? (
              <Fab id="signout_button">
                <Eject />
              </Fab>
            ) : (
              <Fab id="authorize_button">
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
        </div>

        <div className="quickAddButtons" style={styles.quickAddButtons}>
          {notesCounts.map(count => {
            return (
              <Button
                style={styles.quickAddButton}
                id={`${count.replace(/ /g,'-')}-key`}
                variant="outlined"
                color="secondary"
                onClick={this.onCountedPress(count)}
                key={`${count.replace(/ /g,'-')}-key`}
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