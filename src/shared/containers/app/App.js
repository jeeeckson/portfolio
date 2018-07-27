import React, {Component} from 'react';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import PropTypes from 'prop-types';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Navigation from '../app/Navigation';
import Message from '../../components/Message';
import createPalette from '@material-ui/core/styles/createPalette';
import {deepPurple} from '@material-ui/core/colors/index';
import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline';


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

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <CssBaseline/>
                    <Navigation/>
                    <div>
                        {this.props.children}
                    </div>
                    <Message/>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

export default App;
