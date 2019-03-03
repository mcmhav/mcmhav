import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    // width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display: 'inline-table',
  },
  table: {
    // maxWidth: 700,
  },
  row: {
    height: '24px',
  },
  cell: {
    whiteSpace: 'nowrap',
    borderBottom: '1px solid rgb(144,99,99)',
    padding: '0 10px !important',
  },
});

class SimpleTable extends Component {
  render() {
    const { classes, tableName, headers, rows } = this.props;

    const padding = 'dense';

    return (
      <Paper className={classes.root} style={{ backgroundColor: '#fb9d9d' }}>
        <div style={{ paddingTop: '10px' }}>{tableName}</div>
        <Table className={classes.table} padding={padding}>
          <TableHead>
            <TableRow className={classes.row}>
              {headers.map(header => {
                const align = header.title === 'Notes' ? 'right' : 'left';
                return (
                  <TableCell
                    padding={padding}
                    key={header.id}
                    className={classes.cell}
                    align={align}
                  >
                    {header.title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow
                  key={row.id}
                  className={classes.row}
                  style={{ backgroundColor: row.color }}
                >
                  <TableCell
                    padding={padding}
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    {row.time}
                  </TableCell>
                  <TableCell
                    padding={padding}
                    className={classes.cell}
                    align="right"
                  >
                    {row.notes}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
