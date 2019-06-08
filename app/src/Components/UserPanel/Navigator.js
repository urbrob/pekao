import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import BarChart from '@material-ui/icons/BarChart';
import Assignment from '@material-ui/icons/Assignment';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import FlashOn from '@material-ui/icons/FlashOn';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import {Link} from 'react-router-dom';

const categories = [
    {
        id: 'Your business',
        children: [
            {id: 'Statistics', icon: <BarChart/>, link: '/UserPanel/Statistics'},
            {id: 'Consumers', icon: <PeopleIcon/>, link: '/UserPanel/Consumers'},
            {id: 'Impact', icon: <FlashOn/>, link: '/UserPanel/Impact'},
            {id: 'Summary', icon: <PlaylistAddCheck/>, link: '/UserPanel/Summary'},
            {id: 'Your staff', icon: <SupervisedUserCircle/>, link: '/UserPanel/Staff'},
            {id: 'Raports', icon: <Assignment/>, link: '/UserPanel/Raports'},

        ],
    },
    {
        id: 'Settings',
        children: [
            {id: 'Your plan', icon: <CheckBoxIcon/>, link: '/UserPanel/Plan'},
            {id: 'User Settings', icon: <SettingsIcon/>, link: '/UserPanel/Settings'},
        ],
    },
];

const styles = theme => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        fontSize: "17px",
        paddingTop: 1,
        paddingBottom: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 22,
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemLogout: {
        marginTop: "1%",
        fontSize: "20px",

        paddingBottom: "4%",
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },

    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    itemIconLogout: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(7),


    },
});

function Navigator(props) {
    const {classes, ...other} = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    User panel
                </ListItem>
                <Link to={'/user'}>
                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                    <ListItemIcon className={classes.itemIcon}>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}
                    >
                        Home view
                    </ListItemText>
                </ListItem>
                </Link>
                {categories.map(({id, children}) => (
                    <React.Fragment key={id}>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {id}
                            </ListItemText>
                        </ListItem>
                        {children.map(({id: childId, icon, active, link}) => (
                            <Link to={link}>
                                <ListItem
                                    key={childId}
                                    button
                                    className={clsx(classes.item, active && classes.itemActiveItem)}
                                >
                                    <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                        }}
                                    >
                                        {childId}
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                        <Divider className={classes.divider}/>
                    </React.Fragment>
                ))}
                <Link to={'/logout'}>
                <ListItem className={classes.itemLogout}>
                    <ListItemIcon className={classes.itemIcon}>
                        <PowerSettingsNewIcon fontSize="large"/>
                    </ListItemIcon>
                    <ListItem>
                        Logout
                    </ListItem>
                </ListItem>
                </Link>

            </List>
        </Drawer>
    );
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);