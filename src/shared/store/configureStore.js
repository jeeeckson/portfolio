import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import {isClient, isDebug} from '../../config/app';

import {createStore, applyMiddleware, compose} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {createBrowserHistory, createMemoryHistory} from 'history';

function deserialize(serializedJavascript){
    return eval('(' + serializedJavascript + ')');
}

// A nice helper to tell us if we're on the server
export const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export default (url = '/') => {
    // Create a history depending on the environment
    const history = isServer
        ? createMemoryHistory({
            initialEntries: [url]
        })
        : createBrowserHistory();

    const enhancers = [];

    // Dev tools are helpful
    if (isDebug && !isServer) {
        const devToolsExtension = window.devToolsExtension;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    const middleware = [thunk, routerMiddleware(history)];

    if (isClient && isDebug) {
        middleware.push(createLogger());
    }

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    // Do we have preloaded state available? Great, save it.
    let initialState = !isServer ? window.__INITIAL_STATE__ : {};

    // Delete it once we have it stored in a variable
    if (!isServer) {
        delete window.__INITIAL_STATE__;
    }
    if (initialState.length){
        initialState = deserialize(initialState)
    }
    // Create the store
    const store = createStore(
        connectRouter(history)(rootReducer),
        initialState,
        composedEnhancers
    );
    return {
        store,
        history
    };
};
