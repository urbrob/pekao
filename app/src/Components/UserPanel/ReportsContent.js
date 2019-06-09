import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import DatePicker from "./DatePicker"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const styles = theme => ({
    paper: {

        marginTop: "10%",
        marginBottom: "5%",
        paddingBottom: "10%",
    },
    genButton: {
        color: "white",
        marginTop: "20%",
        fontSize: 24,
        backgroundColor: "red",
        padding: 40,
    },
});

function ReportsContent(props) {
    const {classes} = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row" justify="center">
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item>
                                    <Typography style={{paddingTop: "7%", marginBottom: "5%"}} align="center"
                                                variant="h4">
                                        Pick date of which you want to generate report of.</Typography>
                                </Grid>
                                <Grid item>
                                    <DatePicker/>
                                </Grid>
                                <Grid item xs={5}>
                                    <Button className={classes.genButton}>
                                        Generate
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </div>

        </React.Fragment>


    );
}

ReportsContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportsContent);