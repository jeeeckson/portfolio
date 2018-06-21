// React requirements
import React from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import {Provider} from 'react-redux';
import {StaticRouter} from "react-router";
import {Frontload, frontloadServerRender} from 'react-frontload';
import Loadable from 'react-loadable';
import serialize from 'serialize-javascript';
import {create} from 'jss';
import preset from 'jss-preset-default';
import {SheetsRegistry} from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import {indigo, red} from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';
import {deepPurple} from '@material-ui/core/colors/index';// Express requirements
import manifest from '../../public/assets/manifest.json';
import App from "../../app/pages/app/App";
import staticAssets from './static-assets';

const sheetsRegistry = new SheetsRegistry();

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


// Grab our css from our sheetsRegistry


const buildPage = ({componentHTML, initialState, headAssets, css, extraChunks}) => {
    return `
<!doctype html>
<html ${headAssets.htmlAttributes.toString()}>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${staticAssets.createStylesheets()}
    ${staticAssets.createTrackingScript()}
    <style id="jss-server-side" type="text/css">${css}</style>
  </head>
  <body>
    <div id="app" style="height:100%">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
    ${staticAssets.createAppScript()}
    ${extraChunks}
  </body>
</html>`;
};

export default (store, props, location) => {

    const context = {};
    const modules = [];
    const jss = create(preset());
    jss.options.createGenerateClassName = createGenerateClassName;
    let jsx = (<JssProvider registry={sheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            <Loadable.Capture report={m => modules.push(m)}>
                <Provider store={store}>
                    <StaticRouter location={location} context={context}>
                        <Frontload isServer>
                            <App/>
                        </Frontload>
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        </MuiThemeProvider>
    </JssProvider>);
    /*
      Here's the core funtionality of this file. We do the following in specific order (inside-out):
        1. Load the <App /> component
        2. Inside of the Frontload HOC
        3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
        4. Inside of the store provider
        5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
        6. Render all of this sexiness
        7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests

      In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
      data for that page. We take all that information and compute the appropriate state to send to the user. This is
      then loaded into the correct components and sent as a Promise to be handled below.
    */
    return frontloadServerRender(renderToString(jsx)).then(routeMarkup => {

        // Otherwise, we carry on...

        // Let's give ourself a function to load all our page-specific JS assets for code splitting
        const extractAssets = (assets, chunks) =>
            Object.keys(assets)
                .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
                .map(k => assets[k]);

        // Let's format those assets into pretty <script> tags
        const extraChunks = extractAssets(manifest, modules).map(
            c => `<script type="text/javascript" src="/${c}"></script>`
        );

        // We need to tell Helmet to compute the right meta tags, title, and such
        const headAssets = Helmet.renderStatic();
        const css = sheetsRegistry.toString();

        // NOTE: Disable if you desire
        // Let's output the title, just to see SSR is working as intended
        console.log('THE TITLE', headAssets.title.toString());
        debugger;
        const initialState = store.getState();
        return buildPage({routeMarkup, initialState, headAssets, css, extraChunks});
    }).catch(err => {
        debugger;
        console.log(err);
    });
}




