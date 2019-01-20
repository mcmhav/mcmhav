/*global gapi:true*/

import React, { Component } from 'react';
import dateFns from 'date-fns';

import TextField from '@material-ui/core/TextField';
import { Fab } from '../../components/buttons/Fab';
import { SimpleTable } from '../../components/tables/SimpleTable';
import Eject from '@material-ui/icons/Eject';
import PermIdentity from '@material-ui/icons/PermIdentity';
import { handleClientLoad, spreadsheetId } from './test';
import Button from '@material-ui/core/Button';

import styles from './styles';
import './styles.css';

class Snus extends Component {
  constructor() {
    super();
    this.state = {
      notes: '',
      headers: [{ id: 1, title: 'Date' }, { id: 2, title: 'Notes' }],
    };
  }

  async componentDidMount() {
    await handleClientLoad();
    this.getValues();
  }

  counter = rows => {
    const counts = {};
    const sorted = [];
    rows.forEach(row => {
      var num = row[1];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    });

    for (var count in counts) {
      sorted.push([count, counts[count]]);
    }
    sorted.sort(function(a, b) {
      return b[1] - a[1];
    });

    const countsInfo = {
      counts,
      sorted,
    };
    countsInfo.sortedKeys = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a],
    );

    // const rai = Object.entries(counts)
    //   .sort()
    //   .reduce(
    //     (_sortedObj, [k, v]) => ({
    //       [k]: v,
    //       ..._sortedObj,
    //     }),
    //     {},
    //   );
    //   console.log(rai);
    console.log(countsInfo);
    return countsInfo;
  };

  addItem = () => {
    const { notes = '' } = this.state;
    const date = new Date();

    const resource = {
      values: [
        [
          `=TIME(${date.getHours()}, ${date.getMinutes()}, ${date.getSeconds()})`,
          notes,
          date.getTime(),
        ],
      ],
    };
    var params = {
      // The ID of the spreadsheet to update.
      spreadsheetId: spreadsheetId, // TODO: Update placeholder value.

      // The A1 notation of the values to update.
      range: 'Sheet1!A2:B', // TODO: Update placeholder value.

      // How the input data should be interpreted.
      valueInputOption: 'USER_ENTERED', // TODO: Update placeholder value.
      resource,
    };

    var request = gapi.client.sheets.spreadsheets.values.append(params);

    request.then(
      response => {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
        this.getValues();
      },
      reason => {
        console.error('error: ' + reason.result.error.message);

        // TODO: maybe:
        // gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse(this.addItem)
        // with some check of the error message
      },
    );
  };
  onCountedPress = notes => () => {
    console.log('press');
    this.setState({ notes }, this.addItem);
  };

  onPress = () => {
    this.addItem();
  };
  onChange = event => {
    this.setState({ notes: event.target.value });
  };
  getValues = async () => {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A2:C',
      });

      console.log(response);
      var counts = {};

      for (var i = 0; i < response.result.values.length; i++) {
        var num = response.result.values[i][1];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

      const cols = {};
      response.result.values.forEach(row => {
        var date = dateFns.format(parseInt(row[2], 10), 'DD-MM-YYYY');

        if (!cols[date]) {
          cols[date] = [];
        }
        cols[date].push({ id: row[2], time: row[0], notes: row[1] });
        // cols[date].push(row);
      });

      const cols_arr = [];
      Object.keys(cols)
        .sort()
        .reverse()
        .forEach(key => {
          cols_arr.push({
            colName: key,
            rows: cols[key],
          });
        });

      this.setState({
        rows: response.result.values.map(value => {
          return { id: value[2], time: value[0], notes: value[1] };
        }),
        cols,
        cols_arr,
        counts: this.counter(response.result.values),
      });
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }

    // .then(
    //   function(response) {
    //     var range = response.result;
    //     console.log(range);
    //     this.setState({ data: range });
    //     // if (range.values.length > 0) {
    //     //   appendPre('Name, Major:');
    //     //   for (var i = 0; i < range.values.length; i++) {
    //     //     var row = range.values[i];
    //     //     // Print columns A and E, which correspond to indices 0 and 4.
    //     //     appendPre(row[0] + ', ' + row[1]);
    //     //   }
    //     // } else {
    //     //   appendPre('No data found.');
    //     // }
    //   },
    //   function(response) {
    //     // appendPre('Error: ' + response.result.error.message);
    //   },
    // );
  };

  render() {
    const {
      notes,
      headers,
      rows = [],
      cols = {},
      counts = { sortedKeys: [] },
      cols_arr = [],
    } = this.state;

    console.log(counts);
    console.log(cols);
    console.log(cols_arr);
    return (
      <div className="Snus" style={styles.snus}>
        <div style={styles.actionsWrapper}>
          {/* <button id="authorize_button" style={{ display: 'none' }}>
          Authorize
          </button>
          <button id="signout_button" style={{ display: 'none' }}>
          Sign Out
        </button> */}
          <div style={styles.intputWrapper}>
            <div>
              <Fab id="authorize_button" style={{ display: 'none' }}>
                <PermIdentity />
              </Fab>
              <Fab id="signout_button" style={{ display: 'none' }}>
                <Eject />
              </Fab>
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
            {/* <button id="add_item" onClick={this.onPress} style={{}}>
          add item
        </button> */}
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
            {counts.sortedKeys.map(count => {
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
        {/* <div>
          {data.values.map(element => {
            return (
              <div key={element[2]}>
                {element[0]}
                {element[1]}
              </div>
            );
          })}
        </div> */}
        <div style={styles.tableWrapper}>
          {cols_arr.map(table => {
            return (
              <SimpleTable
                key={table.colName}
                tableName={`${table.colName} - ${table.rows.length}`}
                headers={headers}
                rows={table.rows}
              />
            );
          })}
          {/* <SimpleTable headers={headers} rows={rows} /> */}
        </div>
      </div>
    );
  }
}

export default Snus;
