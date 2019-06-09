import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    paper: {
        maxWidth: 980,
        margin: 'auto',
        overflow: 'hidden',
        marginTop: "5%",
        flex: 1,
        padding: '20px 36px 0',
        background: '#eaeff1',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

function MainContent(props) {
    const {classes} = props;

    return (
        <Paper className={classes.paper}>
            <h1>Content</h1>
        </Paper>
    );
}

MainContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContent);