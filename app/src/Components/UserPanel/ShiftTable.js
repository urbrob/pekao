import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 450,
    },
}));

function createData(name, calories, fat) {
    return { name, calories, fat};
}

const rows = [
    createData('Monday', '8:00', '16:00'),
    createData('Tuesday', '8:00', '16:00'),
    createData('Wednesday', '8:00', '16:00'),
    createData('Thursday', '8:00', '16:00'),
    createData('Friday', '8:00', '16:00'),
    createData('Saturday', '8:00', '14:00'),
    createData('Sunday', 'none', 'none'),
];

function ShiftTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Day of the week</TableCell>
                        <TableCell align="right">Shift starts</TableCell>
                        <TableCell align="right">Shift ends</TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default ShiftTable;