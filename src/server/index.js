import React from 'react';
import ReactDOM from 'react-dom/server';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router';
import Loadable from 'react-loadable';
import {SheetsRegistry} from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName,} from '@material-ui/core/styles';
import {indigo, red} from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';
import {deepPurple} from '@material-ui/core/colors/index';// Express requirements
import App from '../shared/App';
import configureStore from '../shared/store/configureStore';
import manifest from '../../public/manifest.json';
import serialize from 'serialize-javascript';

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


/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({clientStats}) => async (req, res) => {
    // Create a store (with a memory history) from our current url
    const {store} = configureStore(req.url);

    // This method waits for all render component
    // promises to resolve before returning to browser
    const context = {};
    const modules = [];
    //const jss = create(preset());
    let app = (<JssProvider registry={sheetsRegistry} generateClassName={createGenerateClassName()}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            <Loadable.Capture report={m => modules.push(m)}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App/>
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        </MuiThemeProvider>
    </JssProvider>);


    const appString = ReactDOM.renderToString(app);
    const chunkNames = flushChunkNames();
    const {js, styles, cssHash} = flushChunks(clientStats, {chunkNames});

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
    const insertState = (state) => (`<script>window.__INITIAL_STATE__ = ${serialize(state)}</script>`);

    let initialState = store.getState();
    initialState = serialize(initialState);
    initialState = insertState(initialState);
    const title = headAssets.title.toString();
    const meta = headAssets.meta.toString();
    const link = headAssets.link.toString();
    //assets

    const htmlAttributes = headAssets.htmlAttributes.toString();
    /*
     * See https://reacttraining.com/react-router/web/guides/server-rendering for details
     * on this configuration.
     */
    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {
        res.render('index', {
            appString,
            js,
            styles,
            cssHash,
            css,
            title,
            meta,
            link,
            htmlAttributes,
            initialState,
            extraChunks
        });
    }
}
