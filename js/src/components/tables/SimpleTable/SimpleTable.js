import React from 'react';
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
});

function SimpleTable(props) {
  const { classes, headers, rows } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} padding="dense">
        <TableHead>
          <TableRow>
            {headers.map(header => {
              return <TableCell key={header.id}>{header.title}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.time}
                </TableCell>
                <TableCell align="right">{row.notes}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
