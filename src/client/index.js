import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';

import {Router} from 'react-router-dom';

import App from '../shared/App';
import configureStore from './../shared/store/configureStore';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {deepPurple, indigo, red} from "@material-ui/core/colors/index";
import createPalette from "@material-ui/core/styles/createPalette";
// Create a store and get back itself and its history object
const {store, history} = configureStore();

const removeJssStyles = () => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
    }
};


const theme = createMuiTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif;',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    },
    themeName: 'Dark Theme',
    palette: createPalette({
        type: 'dark',
        primary: deepPurple,
        secondary: indigo,
        error: red
    })
});

/**
 * Renders a react component into the #react-root div container.
 * Since react 16, the `hydrate` method is used instead of `render` when dealing
 * with server side rendering.
 *
 * @param Component React component that should be rendered
 */
const render = Component => {
    hydrate(
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Router history={history}>
                    <Component/>
                </Router>
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('react-root'),
        removeJssStyles
    );
};

render(App);

/**
 * This script provides hot module reloading in development mode.
 */
//if (module.hot && process.env.NODE_ENV === 'development') {
if (process.env.NODE_ENV) {
    module.hot.accept('../shared/App', () => {
        const App = require('../shared/App').default;
        render(App);
    });
}
