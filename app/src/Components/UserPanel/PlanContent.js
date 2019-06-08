import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
    paper: {
        marginTop: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
    },
});

function PlanContent(props) {
    const { classes } = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row">
                    <Grid item>

                    </Grid>
                </Grid>

            </div>

        </React.Fragment>


    );
}

PlanContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlanContent);