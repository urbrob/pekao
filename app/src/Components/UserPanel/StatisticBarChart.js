import React, {PureComponent} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


export default class StatisticBarChart extends PureComponent {


    render() {
        return (
            <Paper style={{marginTop: "8%"}}>
                <Typography align='center' variant='h4'>{this.props.title}</Typography>
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="count" fill="#8884d8"/>
                    <Bar dataKey="amount" fill="#82ca9d"/>
                    <h1 style={{marginRight: "10%"}}>Opis do wykresu bedzie tutaj bardzo kompleksowy suepr ekstra</h1>
                </BarChart>

            </Paper>

        );
    }
}
