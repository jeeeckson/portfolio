import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {deepPurple} from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';
//import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for material onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

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
        primary: deepPurple
    })
});

export default function withRoot(Component) {
    function WithRoot(props) {
        // MuiThemeProvider makes the theme available down the React tree
        // thanks to React context.
        return (
            <MuiThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <Component {...props} />
            </MuiThemeProvider>
        );
    }
    return WithRoot;
};
