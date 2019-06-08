import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Container} from "@material-ui/core";
import Chart from "./Chart"


const styles = theme => ({
    paper: {
        marginTop: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
    },
});

function StatiscticsContent(props) {
    const { classes } = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row">
                    <Chart/>
                    <Chart/>
                    <Chart/>
                    <Chart/>
                </Grid>

            </div>

        </React.Fragment>


    );
}

StatiscticsContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatiscticsContent);