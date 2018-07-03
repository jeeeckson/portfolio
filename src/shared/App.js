import React, {Component} from 'react';

import {Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import Lobbys from './pages/app/Lobbys';
import Products from './pages/app/Products';
import NotFound from './components/NotFound';
import CssBaseline from "@material-ui/core/CssBaseline";
import PageLayout from "./pages/PageLayout";
import Chat from "./pages/app/Chat";
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';


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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <PageLayout/>
                    <CssBaseline/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/about' component={Lobbys}/>
                        <Route path='/chat' component={Chat}/>
                        <Route path='/users' component={Products}/>
                        <Route component={NotFound}/>
                    </Switch>
                </MuiPickersUtilsProvider>
            </div>
        );
    }

}
