import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StatisticBarChart from "./StatisticBarChart"


const styles = theme => ({
    paper: {
        marginTop: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
    },
});

function StatiscticsContent(props) {
    const {classes} = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row">
                    <StatisticBarChart/>
                    <StatisticBarChart/>
                    <StatisticBarChart/>
                    <StatisticBarChart/>
                </Grid>

            </div>

        </React.Fragment>


    );
}

StatiscticsContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatiscticsContent);