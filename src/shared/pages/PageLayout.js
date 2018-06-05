import React, {Component} from 'react';
import Menu from './Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {common} from '@material-ui/core/colors';
/**
 * This component represents the structure of the page holding its
 * main components: header, menu and content.
 * The component supports two modes, one for users that are logged and
 * one for users that are not yet logged so when a page is created
 * it is mandatory to indicate if that page is meant for logged users
 * or not.
 * The content is filled with the component's children, which means
 * it is not meant to be extended but composed.
 */
class PageLayout extends Component {

    /**
     * Constructor with mandatory parameters.
     *
     * @param {Object} props The properties to be set to the component, cannot be null.
     */
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    /**
     * Toggles the menu visibility.
     */
    toggleMenu() {
        this.setState({open: !this.state.open});
    }

    /**
     * Hides the menu.
     */
    closeMenu() {
        this.setState({open: false});
    }

    /**
     * Logs out the user from the application.
     */
    logout() {
        this.props.history.push('/');
    }

    /**
     * Renders the component.
     *
     * @return {*} The jsx component to be rendered, never null.
     */
    render() {
        const {children} = this.props;
        return (
            <div>
                <div>
                    <AppBar position="static"
                        color="primary"
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Menu"
                                onClick={this.toggleMenu.bind(this)}
                            >
                                <MenuIcon color="inherit" />
                            </IconButton>
                            <Typography type="title" color="inherit">
                                Portfolio
                            </Typography>
                            <Menu {...this.props}
                                  open={this.state.open}
                                  onItemTouchTap={this.closeMenu.bind(this)}/>

                        </Toolbar>
                    </AppBar>

                    {children}
                </div>
            </div>
        );
    }
}

export default PageLayout;
