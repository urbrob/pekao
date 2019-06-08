import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const createUserMutation = gql`
  mutation($username: String!, $password: String!, $email: String!){
      createUser(username: $username, password: $password, email: $email){
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
        backgroundColor: theme.palette.secondary.main,
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
    },
});



export class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.mutate({
            variables: {username: this.state.username, password: this.state.password, email: this.state.email}
        }).then(function(result) {
            localStorage.setItem('token', result.data.createUserMutation.token);
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
                            Register
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" autoComplete="username" onChange={this.handleChange} values={this.state.username} autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" onChange={this.handleChange} values={this.state.email} autoComplete="email"  />
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
                                Register
                            </Button>


                        </form>
                    </Paper>
                </main>
            </MuiThemeProvider>
        );
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
};
Register = graphql(createUserMutation)(Register)
export default withStyles(styles)(Register);
