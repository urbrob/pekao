import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Paper from '@material-ui/core/Paper'

export default class Chart extends PureComponent {


    render() {
        return (
            <Paper style={{marginRight: "5%", marginLeft: "5%", marginTop: '5%'}}>
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="count"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                    <Bar dataKey="count" fill="#82ca9d" />
                    <h1 style={{marginRight: "10%"}}>Opis do wykresu bedzie tutaj bardzo kompleksowy suepr ekstra</h1>
                </BarChart>

            </Paper>

        );
    }
}
