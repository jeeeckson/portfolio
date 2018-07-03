import React from 'react';
import {Provider} from 'react-redux';
import * as types from './types';
import configureStore from './store/configureStore';
import fetchDataForRoute from './utils/fetchDataForRoute';
import {render, hydrate} from 'react-dom';
import Loadable from 'react-loadable';
import {Frontload} from 'react-frontload';
import {ConnectedRouter} from 'connected-react-router';
import App from './App';

// Grab the state from a global injected into
// server-generated HTML
let initialState = window.__INITIAL_STATE__;


// Create a store and get back itself and its history object
const {store, history} = configureStore();

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
    // Prevent duplicate fetches when first loaded.
    // Explanation: On server-side render, we already have __INITIAL_STATE__
    // So when the client side onUpdate kicks in, we do not need to fetch twice.
    // We set it to null so that every subsequent client-side navigation will
    // still trigger a fetch data.
    // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
    if (initialState !== null) {
        initialState = null;
        return;
    }

    store.dispatch({type: types.CREATE_REQUEST});
    fetchDataForRoute(this.state)
        .then((data) => {
            return store.dispatch({type: types.REQUEST_SUCCESS, data});
        });
}


// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here

//onUpdate={onUpdate}
const Application = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Frontload noServerRender>
                <App/>
            </Frontload>
        </ConnectedRouter>
    </Provider>
);

const root = document.getElementById('app');
const removeJssStyles = () => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
    }
};

if (process.env.NODE_ENV === 'production') {
    // If we're running in production, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
        hydrate(Application, root, removeJssStyles);
    });
} else {
    // If we're not running on the server, just render like normal
    render(Application, root, removeJssStyles);
}
