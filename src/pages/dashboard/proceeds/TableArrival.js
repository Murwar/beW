import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, num, result) {
  return { date, num, result };
}

const rows = [
  createData('12.12.20', 1, '↑'),
  createData('13.12.20', 5, '↑'),
  createData('14.12.20', 4, '↓'),
  createData('15.12.20', 3, '↓'),
  createData('16.12.20', 10, '↑'),
];

export default function TableArrival() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell align="right">Количество заселений</TableCell>
            <TableCell align="right">Результат</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.num}</TableCell>
              <TableCell align="right">{row.result}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
