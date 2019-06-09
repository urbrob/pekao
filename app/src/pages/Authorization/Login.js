import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
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
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://negativespace.co/wp-content/uploads/2017/04/negative-space-thumb-business-man-laptop-wireframes-1.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

const butTheme = createMuiTheme({
    palette: {
        primary: red,
        secondary: red,
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
        console.log(this.state);
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={butTheme}>

                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={this.handleChange}
                                    values={this.state.username}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={this.handleChange}
                                    values={this.state.password}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.handleSubmit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

Login = graphql(tokenAuth)(Login);
export default withStyles(styles)(Login);
