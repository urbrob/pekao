import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import StarIcon from '@material-ui/icons/StarBorder';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom"
import {MapContainer} from "../../Components/Home/FreeHeatMap";


const useStyles = makeStyles(theme => ({
    heroContent: {
        marginTop: theme.spacing(24),
        marginBottom: theme.spacing(32),
        padding: theme.spacing(12, 12),

    },
    cardHeader: {
        color: "white",
        backgroundColor: "#f44336",
    },

    button: {
        margin: theme.spacing(1),
        color: "white",
        backgroundColor: "#f44336",
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {

        flex: 1,
    },

    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(1),
        backgroundImage: 'url(https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.4)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(18),
            paddingRight: 0,
        },
    },
    mainGrid: {
        marginTop: theme.spacing(3),
    },


    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(50),
        padding: theme.spacing(6, 0),
    },
}));
const tiers = [
    {
        title: 'Darmowy',
        price: '0',
        description: ['Darmowe badanie rynkowe ', 'Podstawowe raporty o twojej firmie'],

    },
    {
        title: 'PekaoPro',
        subtitle: 'Dla Firm z kontem Pekao',
        price: '0',
        description: [
            'Badania rynkowe w czasie rzeczywistym',
            'Urządzenie do zwiększenia precyzji twoich raportów',
            'Raport i wykresy o pozycji twojej firmy względem innych w tej samej branży',
            'Alerty o twojej firmie na email lub telefon',
        ],

    },
    {
        title: 'Pro',
        price: '149',
        description: [
            'Badania rynkowe w czasie rzeczywistym',
            'Urządzenie do zwiększenia precyzji twoich raportów',
            'Raport i wykresy o pozycji twojej firmy względem innych w tej samej branży',
            'Alerty o twojej firmie na email lub telefon',
        ],

    },
];


export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar color="EFEFEF" position="relative">
                <Toolbar>
                    <Typography variant="h6">
                        PekaoForBusiness
                    </Typography>
                    <Grid item xs={12}>
                    </Grid>
                    <Link to={'/potential'}>
                        <Button variant="contained" size="medium" className={classes.button}>
                            Potential?!
                        </Button>
                    </Link>
                    <Link to={'/register'}>
                        <Button variant="contained" size="medium" className={classes.button}>
                            Register

                        </Button>
                    </Link>
                    <Link to={'/login'}>
                        <Button variant="contained" size="medium" className={classes.button}>
                            Login
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <main>
                <MapContainer/>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    PekaoForBusiness
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Technology Demo
                </Typography>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}
