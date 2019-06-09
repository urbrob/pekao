import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import red from "@material-ui/core/colors/red";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
    bigAvatar: {
        margin: 10,
        width: 50,
        height: 50,
    },
});

const butTheme = createMuiTheme({
    palette: {
        primary: red,
        secondary: red,
    },
});

function Header(props) {
    const {classes, onDrawerToggle} = props;
    const {prompt} = props;
    return (
        <MuiThemeProvider theme={butTheme}>
            <React.Fragment>
                <AppBar color="primary" position="sticky" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={1} alignItems="center">
                            <Hidden smUp>
                                <Grid item>
                                    <IconButton
                                        color="inherit"
                                        aria-label="Open drawer"
                                        onClick={onDrawerToggle}
                                        className={classes.menuButton}
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                </Grid>
                            </Hidden>
                            <Grid item xs/>
                            <Grid item>
                                <Tooltip title="Alerts">
                                    <IconButton color="inherit">
                                        <NotificationsIcon fontSize="large"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Your profile">
                                    <IconButton size="large" color="inherit" className={classes.iconButtonAvatar}>
                                        <Avatar
                                            className={classes.bigAvatar}
                                            src="https://thefinanser.com/wp-content/uploads/2015/12/6a01053620481c970b01b7c7617a9f970b-600wi.jpg"
                                            alt="My Avatar"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <AppBar
                    component="div"
                    className={classes.secondaryBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <Toolbar>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs>
                                <Typography style={{paddingBottom: "1.4%"}} color="inherit" variant="h5" component="h1">
                                    {prompt}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        </MuiThemeProvider>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);