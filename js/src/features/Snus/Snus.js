/*global gapi:true*/

import React, { Component } from 'react';

import { handleClientLoad, spreadsheetId, listMajors } from './test';

class Snus extends Component {
  constructor() {
    super();
    this.state = {
      notes: '',
    };
  }

  async componentDidMount() {
    handleClientLoad();
  }

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
      function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
        listMajors();
      },
      function(reason) {
        console.error('error: ' + reason.result.error.message);
      },
    );
  };

  onPress = () => {
    this.addItem();
  };
  onChange = event => {
    this.setState({ notes: event.target.value });
  };

  render() {
    const { notes } = this.state;
    return (
      <div className="Snus">
        <button id="authorize_button" style={{ display: 'none' }}>
          Authorize
        </button>
        <button id="signout_button" style={{ display: 'none' }}>
          Sign Out
        </button>
        <input value={notes} onChange={this.onChange} />
        <button id="add_item" onClick={this.onPress} style={{}}>
          add item
        </button>
        <pre id="content" style={{ color: 'red', whiteSpace: 'pre-wrap' }} />
      </div>
    );
  }
}

export default Snus;
