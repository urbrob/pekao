import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import DatePicker from "./DatePicker"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const styles = theme => ({
    paper: {
        width: 500,
        height: 400,
        marginTop: "15%",
        marginLeft: "70%",
        marginBottom: "5%",
    },
    genButton:{
        color: "white",
        width:200,
        height:100,
        marginTop: "10%",
        marginLeft: "30%",
        fontSize: 24,
        backgroundColor: "red",
    },
});

function ReportsContent(props) {
    const { classes } = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row">
                    <Grid item>
                        <Paper className={classes.paper}>

                            <Typography style={{paddingTop:"7%", marginBottom:"5%"}} align="center" variant="h4">
                                Pick date of which you want to generate report of.</Typography>
                            <DatePicker/>
                            <Button className={classes.genButton}>
                                Generate
                            </Button>
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