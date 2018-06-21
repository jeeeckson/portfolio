import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import NotFound from './pages/app/NotFound';

const About = Loadable({
    loader: () => import(/* webpackChunkName: "about" */ './pages/app/Products'),
    loading: () => null,
    modules: ['about']
});

const Landing = Loadable({
    loader: () => import(/* webpackChunkName: "dashboard" */ './pages/app/Landing'),
    loading: () => null,
    modules: ['landing']
});

const Signup = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ './pages/app/Signup'),
    loading: () => null,
    modules: ['singup']
});
const ToS = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ './pages/app/ToS'),
    loading: () => null,
    modules: ['tos']
});

const Lobbys = Loadable({
    loader: () => import(/* webpackChunkName: "logout" */ './pages/app/Lobbys'),
    loading: () => null,
    modules: ['lobbys']
});

const Dashboard = Loadable({
    loader: () => import(/* webpackChunkName: "logout" */ './pages/app/Dashboard'),
    loading: () => null,
    modules: ['dashboard']
});


/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */

// Should pass in store for redirect and login
export default function createStore() {
    return (
        <Switch>
            <Route path="/" exact component={Landing}/>
        </Switch>
    );
};


