import React, {Component} from 'react';
import red from 'material-ui/colors/red';
import indigo from 'material-ui/colors/indigo';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import Navigation from '../app/Navigation';
import Message from '../../components/Message';
import styles from '../../css/main.css';
import Reboot from 'material-ui/Reboot';
import createPalette from "material-ui/styles/createPalette";
import {deepPurple} from "material-ui/colors/index";


const cx = classNames.bind(styles);

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
                <div className={cx('app')}>
                    <Reboot/>
                    <Navigation/>
                    <div className={cx('content-wrapper')}>
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
