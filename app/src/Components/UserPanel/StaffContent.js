import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StaffTable from "./StaffTable";


const styles = theme => ({
    paper: {
        marginTop: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
    },
});

function StaffContent(props) {
    const {classes} = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={10} className={classes.paper}>
                        <StaffTable/>
                    </Grid>
                </Grid>

            </div>

        </React.Fragment>


    );
}

StaffContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaffContent);