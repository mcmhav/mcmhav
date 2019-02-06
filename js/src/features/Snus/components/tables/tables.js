import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SimpleTable } from '../../../../components/tables/SimpleTable';

import styles from '../../styles';

class Tables extends Component {
  constructor() {
    super();
    this.state = {
      headers: [{ id: 1, title: 'Date' }, { id: 2, title: 'Notes' }],
    };
  }

  renderTables = () => {
    const { headers } = this.state;
    const { supaStruct } = this.props;

    const tableData = supaStruct.toJS();

    const tables = Object.keys(tableData).map(table => {
      const rows = Object.keys(tableData[table].rows).map(key => {
        return tableData[table].rows[key];
      });
      return (
        <SimpleTable
          key={table}
          tableName={`${table} - ${rows.length}`}
          headers={headers}
          rows={rows}
        />
      );
    });
    return tables;
  };

  renderTablesOld = () => {
    const { headers } = this.state;
    const { tables } = this.props;

    const tabs = tables.map(table => {
      return (
        <SimpleTable
          key={table.colName}
          tableName={`${table.colName} - ${table.rows.length}`}
          headers={headers}
          rows={table.rows}
        />
      );
    });
    return tabs;
  };

  render() {
    return (
      <div className="tableWrapper" style={styles.tableWrapper}>
        {this.renderTablesOld()}
        {/* {this.renderTables()} */}
      </div>
    );
  }
}

Tables.propTypes = {
  tables: PropTypes.object,
  supaStruct: PropTypes.object,
};
Tables.defaultProps = {
  supaStruct: {
    toJS: () => {
      return {};
    },
  },
};

export default Tables;
