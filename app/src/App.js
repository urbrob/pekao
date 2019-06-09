import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Home from "./pages/Home"
import NotFound from "./pages/404"
import Login from "./pages/Authorization/Login"
import Register from "./pages/Authorization/Register"
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import MainUserPanel from "./pages/UserPanel/MainUserPanel";
import Logout from "./pages/Authorization/Logout";
import StatisticsUserPanel from "./pages/UserPanel/StatisticsUserPanel";
import ConsumersUserPanel from "./pages/UserPanel/ConsumersUserPanel";
import ImpactUserPanel from "./pages/UserPanel/ImpactUserPanel"
import SummaryUserPanel from "./pages/UserPanel/SummaryUserPanel"
import StaffUserPanel from "./pages/UserPanel/StaffUserPanel"
import ReportsUserPanel from "./pages/UserPanel/ReportsUserPanel"
import SettingsUserPanel from "./pages/UserPanel/SettingsUserPanel"
import PlanUserPanel from "./pages/UserPanel/PlanUserPanel"


export const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    headers: {
        authorization: localStorage.getItem('token') ? `jwt ${localStorage.getItem('token')}` : ""
    }
});

function App() {
    return (
        <ApolloProvider client={client}>
            {localStorage.getItem('token') ? (
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/UserPanel" component={MainUserPanel}/>
                        <Route exact path="/UserPanel/Statistics" component={StatisticsUserPanel}/>
                        <Route exact path="/UserPanel/Consumers" component={ConsumersUserPanel}/>
                        <Route exact path="/UserPanel/Impact" component={ImpactUserPanel}/>
                        <Route exact path="/UserPanel/Summary" component={SummaryUserPanel}/>
                        <Route exact path="/UserPanel/Staff" component={StaffUserPanel}/>
                        <Route exact path="/UserPanel/Reports" component={ReportsUserPanel}/>
                        <Route exact path="/UserPanel/Settings" component={SettingsUserPanel}/>
                        <Route exact path="/UserPanel/Plan" component={PlanUserPanel}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/404" component={NotFound}/>
                        <Route exact path="/logout" component={Logout}/>
                        <Redirect to="/404"/>
                    </Switch>
                </Router>
            ) : (
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/UserPanel" component={MainUserPanel}/>
                        <Route exact path="/UserPanel/Statistics" component={StatisticsUserPanel}/>
                        <Route exact path="/UserPanel/Consumers" component={ConsumersUserPanel}/>
                        <Route exact path="/UserPanel/Impact" component={ImpactUserPanel}/>
                        <Route exact path="/UserPanel/Summary" component={SummaryUserPanel}/>
                        <Route exact path="/UserPanel/Staff" component={StaffUserPanel}/>
                        <Route exact path="/UserPanel/Reports" component={ReportsUserPanel}/>
                        <Route exact path="/UserPanel/Settings" component={SettingsUserPanel}/>
                        <Route exact path="/UserPanel/Plan" component={PlanUserPanel}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/404" component={NotFound}/>
                        <Route exact path="/logout" component={Logout}/>
                        <Redirect to="/404"/>
                    </Switch>
                </Router>
            )
            }
        </ApolloProvider>
    );
}

export default App;
