import React, { Component, Fragment } from "react";
import "./assets/App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar/nav.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { persistCache } from "apollo-cache-persist";
import { read_cookie } from "./components/Token";

export const cache = new InMemoryCache();

persistCache({
    cache,
    storage: window.localStorage
});

const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: "http://127.0.0.1:8000/graphql",
        headers: {
            authorization: `Bearer ${read_cookie("jwt-token")}`
        }
    })
});

cache.writeData({
    data: {
        isLoggedIn: !!read_cookie("jwt-token")
    }
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <Fragment>
                        <NavBar />
                        <Switch>
                            <div className="container">
                                {/* <Route exact path="/login" component={LoginComponent} /> */}
                                {/* <Route exact path="/posts/:id" component={Post} /> */}
                            </div>
                        </Switch>
                    </Fragment>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
