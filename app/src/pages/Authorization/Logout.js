import React, {Component} from "react";
import {Redirect} from "react-router-dom";

export default class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('token');
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    You have been logged out
                </div>
                <Redirect to={'/'}/>
            </React.Fragment>


        )
    }
}
