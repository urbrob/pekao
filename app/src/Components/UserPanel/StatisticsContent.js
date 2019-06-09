import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import gql from 'graphql-tag'
import { Query } from "react-apollo";
import StatisticBarChart from "./StatisticBarChart"


const statisticsQuery = gql`
  query{
    statistics{
      months{
        name
        count
        amount
        days{
          name
          count
          amount
        }
      }
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
                <Grid container direction="row" justify="space-evenly">
                    <Query query={statisticsQuery}>
                      {({ loading, error, data }) => {
                      if (!loading){
                      return (
                        <div>
                          <Grid item>
                            <StatisticBarChart data={data.statistics.months} title='Year 2019'/>
                          </Grid>
                          <Grid item>
                              <StatisticBarChart data={data.statistics.months[6].days} title='June'/>
                          </Grid>
                        </div>
                      );
                    }else return (<div></div>)
                  }
                  }
                    </Query>
                </Grid>
              </div>


        </React.Fragment>


    );
}

StatiscticsContent.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(StatiscticsContent);
