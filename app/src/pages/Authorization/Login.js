import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const tokenAuth = gql`
  mutation($username: String!, $password: String!){
      tokenAuth(username: $username, password: $password){
          token
      }
  }
`


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: butTheme.palette.primary,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const butTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue,
    },
});



export class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.mutate({
            variables: {username: this.state.username, password: this.state.password}
        }).then(function(result) {
            localStorage.setItem('token', result.data.tokenAuth.token);
            window.location.href = "/user"
        }).catch(function(err) {
            alert(err);
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={butTheme}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" name="username" onChange={this.handleChange} values={this.state.username} autoComplete="username" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" onChange={this.handleChange} values={this.state.password} id="password" autoComplete="current-password" />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSubmit}
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </MuiThemeProvider>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

Login = graphql(tokenAuth)(Login);
export default withStyles(styles)(Login);
