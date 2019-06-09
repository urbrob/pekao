import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ConsumerLineChart from "./ConsumerLineChart"
import { Query } from "react-apollo";
import StatisticBarChart from "./StatisticBarChart"
import gql from 'graphql-tag'


const consumerQuery = gql`
  query{
    customers{
      name
      customers
      newCustomers
      lostCustomers
    }
  }
`

const styles = theme => ({
    paper: {
        marginTop: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
    },
});

function StatiscticsContent(props) {
    const {classes} = props;

    return (
        <React.Fragment>

            <div className={classes.root}>
                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid item>
                        <Query query={consumerQuery}>
                          {({ loading, error, data }) => {
                          if (!loading){
                          return (
                            <div>
                              <ConsumerLineChart data={data.customers}/>
                            </div>
                          );
                        }else return (<div></div>)
                        }
                        }
                        </Query>

                    </Grid>
                </Grid>

            </div>

        </React.Fragment>


    );
}

StatiscticsContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatiscticsContent);
