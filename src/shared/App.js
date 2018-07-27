import React, {Component} from 'react';

import {Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import Orders from './pages/app/Orders';
import NotFound from './components/NotFound';
import CssBaseline from "@material-ui/core/CssBaseline";
import PageLayout from "./pages/PageLayout";

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * This is also the entry point for react router, declare any
 * of your top-level routes here.
 */
export default class App extends Component {

    render() {
        return (
            <div>
                <PageLayout/>
                <CssBaseline/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/orders' component={Orders}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }

}
