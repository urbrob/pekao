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
import { ApolloProvider } from "react-apollo";
import MainUserPanel from "./pages/UserPanel/MainUserPanel";
import Logout from "./pages/Authorization/Logout";


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
                        <Route exact path="/" component={Home} />
                        <Route exact path="/user" component={MainUserPanel} />
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/404" component={NotFound} />
                        <Route exact path="/logout" component={Logout} />
                        <Redirect to="/404" />
                    </Switch>
                </Router>
            ) : (
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/user" component={MainUserPanel} />
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/404" component={NotFound} />
                        <Route exact path="/logout" component={Logout} />
                        <Redirect to="/404" />
                    </Switch>
                </Router>
            )
            }
        </ApolloProvider>
    );
}

export default App;
