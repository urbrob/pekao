import React from "react";
import MUIDataTable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {Line, LineChart} from "recharts";
import ShiftTable from "./ShiftTable";


const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


class StaffTable extends React.Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        console.log('open');
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const columns = ["Name", "Title", "Location", "Age", "Salary"];

        const data = [
            ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
            ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
            ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
            ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
            ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
            [
                "Blake Duncan",
                "Business Management Analyst",
                "San Diego",
                65,
                "$94,000"
            ],
            ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
            ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
            ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
            ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
            ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
            ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
            ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
            ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
            ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
            [
                "Addison Navarro",
                "Business Management Analyst",
                "New York",
                50,
                "$295,000"
            ],
            ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
            ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
            ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
            ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
            ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
            ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
            ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
            ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
            ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
            ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
            ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
            ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
            [
                "Gabby Strickland",
                "Business Process Consultant",
                "Scottsdale",
                26,
                "$45,000"
            ],
            ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
        ];

        const options = {
            filterType: "dropdown",
            responsive: "scroll"
        };
        const chartData = [
            {
                name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
            },
            {
                name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
            },
            {
                name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
            },
            {
                name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
            },
            {
                name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
            },
            {
                name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
            },
            {
                name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
            },
        ];
        return (
            <React.Fragment>
                <MUIDataTable
                    title={"Employee list"}
                    data={data}
                    columns={columns}
                    options={options}

                />
                <Button onClick={this.handleClickOpen} >
                    Show details
                </Button>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Employee details
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom variant="h4">
                            Gabby George
                        </Typography>
                        <Typography gutterBottom>
                            Currently on shift: <h5 style={{color: 'red'}}>No</h5>
                        </Typography>
                        <Typography gutterBottom variant="h6">
                            Check on employee statistics
                        </Typography>
                        <LineChart width={300} height={100} data={chartData}>
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                        <Typography gutterBottom variant="h6">
                            Shifts
                        </Typography>
                        <ShiftTable/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

        );
    }
}

export default StaffTable;