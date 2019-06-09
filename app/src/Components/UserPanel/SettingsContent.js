import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from '@material-ui/core/Checkbox';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    paper: {
        marginTop: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
    },
});

function SettingsContent(props) {
    const {classes} = props;

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
            <div className={classes.root} style={{marginLeft: "2%", marginTop: "10%"}}>
                <Grid container direction="column" alignItems="flex-start" justify="center" >
                    <Grid item>
                        <Typography variant="h4" align="center">
                            Manage notifications
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            value="start"
                            control={<Checkbox color="primary" />}
                            label="Enable critical notifications"
                            labelPlacement="start"
                        />
                    </Grid>
                    <FormControlLabel
                        value="start"
                        control={<Checkbox color="primary" />}
                        label="Notify e-mail"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="start"
                        control={<Checkbox color="primary" />}
                        label="Notify SMS"
                        labelPlacement="start"
                    />
                </Grid>

            </div>
            </Paper>
            <Paper className={classes.paper}>
                <div className={classes.root} style={{marginLeft: "2%", marginTop: "5%"}}>
                    <Grid container direction="column" alignItems="flex-start" justify="center" >
                        <Grid item>
                            <Typography variant="h4" align="center">
                                Manage data
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                value="start"
                                control={<Checkbox color="primary" />}
                                label="Enable critical notifications"
                                labelPlacement="start"
                            />
                        </Grid>
                        <FormControlLabel
                            value="start"
                            control={<Checkbox color="primary" />}
                            label="Notify e-mail"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox color="primary" />}
                            label="Notify SMS"
                            labelPlacement="start"
                        />
                    </Grid>

                </div>
            </Paper>
        </React.Fragment>


    );
}

SettingsContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsContent);