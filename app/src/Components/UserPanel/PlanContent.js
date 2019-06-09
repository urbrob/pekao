import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar"
import Done from "@material-ui/icons/Done"
import green from "@material-ui/core/colors/green"

const styles = theme => ({
    paper: {
        marginTop: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
        fontSize: "large",
    },
    genButton: {
        color: "white",
        marginTop: "10%",
        fontSize: 24,
        backgroundColor: "red",
        padding: 15,
    },
});

function PlanContent(props) {
    const {classes} = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item>
                                    <Typography style={{paddingTop: "7%", marginBottom: "5%"}} align="center"
                                                variant="h4">
                                        Your are currently subscribing to "plan here" plan for "price"
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Avatar className={classes.greenAvatar}>
                                        <Done/>
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item>
                                <Typography style={{paddingTop: "7%", marginBottom: "2%"}} align="center"
                                            variant="h5">
                                    You can check the other plans here
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button className={classes.genButton} href={'/'}>
                                    Check offer
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button style={{fontSize: 14, marginTop:"40%"}} className={classes.genButton} href={'/'}>
                                    Cancel Subscription
                                </Button>
                            </Grid>
                        </Grid>
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