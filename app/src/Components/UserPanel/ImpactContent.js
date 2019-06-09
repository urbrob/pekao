import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    paper: {
        marginTop: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
    },
});

function ImpactContent(props) {
    const {classes} = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Paper style={{marginTop: "2%", marginRight: "5%"}}>
                    <Grid item style={{marginTop: "2%", width: "300px"}}>
                      <Typography align='center' variant='h4' style={{marginBottom: "15px"}}>Card Business Impact</Typography>
                      <Typography align='center' variant='h4' style={{marginBottom: "15px"}} color='primary'>14.34%</Typography>
                    </Grid>
                  </Paper>
                  <Paper style={{marginTop: "2%", marginRight: "5%"}}>
                    <Grid item style={{marginTop: "2%", width: "300px"}}>
                      <Typography align='center' variant='h4' style={{marginBottom: "15px"}}>Local Business Rank</Typography>
                      <Typography align='center' variant='h4' style={{marginBottom: "15px"}} color='primary'>4</Typography>
                    </Grid>
                  </Paper>
                  <Paper style={{marginTop: "2%", marginRight: "5%"}}>
                    <Grid item style={{marginTop: "2%", width: "300px"}}>
                      <Typography align='center' variant='h4' style={{marginBottom: "15px"}}>Population Business Impact</Typography>
                      <Typography align='center' variant='h4' style={{marginBottom: "15px"}} color='primary'>9.23%</Typography>
                    </Grid>
                  </Paper>
                </Grid>

            </div>

        </React.Fragment>


    );
}

ImpactContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImpactContent);
