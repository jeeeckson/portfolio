import React, {Component} from 'react';
import {ListItemText, ListItem, ListSubheader, Drawer, List, Divider} from '@material-ui/core';
import {Link} from 'react-router-dom'

/**
 * Component that displays the application menu.
 */
class Menu extends Component {

    /**
     * Constructor with mandatory parameters.
     *
     * @param {Object} props The properties to be set to the component, cannot be null.
     */
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            openHome: false,
            openForm: false,
            openProducts: false
        };
    }

    /**
     * Opens the dashboard section.
     */
    openHomeSection() {
        this.props.onItemTouchTap();
        this.setState({
            openHome: true
        });
    }

    /**
     * Opens the orders section.
     */
    openFormSection() {
        this.props.onItemTouchTap();
        this.setState({
            openForm: true
        });
    }

    /**
     * Opens the orders section.
     */
    openProductsSection() {
        this.props.onItemTouchTap();
        this.setState({
            openProducts: true
        });
    }

    /**
     *
     * Renders the component.
     *
     * @returns {*} The jsx component to be rendered, never null.
     */
    render() {
        let {open, onItemTouchTap} = this.props;
        let {openHome, openForm, openProducts} = this.state;
        return (
            <Drawer
                open={open}
                onClose={onItemTouchTap}>

                <List
                    subheader={
                        <ListSubheader
                            inset={true}
                            color="default">
                            Menu
                        </ListSubheader>
                    }>
                    <Divider/>
                    <ListItem open={openHome} onClick={this.openHomeSection.bind(this)}>

                        <Link
                            style={{color: 'white'}}
                            onlyActiveOnIndex={true}
                            activeStyle={{color: 'red'}}
                            to="/home">Home</Link>
                    </ListItem>
                    <Divider/>
                    <ListItem open={openProducts} onClick={this.openProductsSection.bind(this)}>


                        <Link
                            style={{color: 'white'}}
                            onlyActiveOnIndex={true}
                            activeStyle={{color: 'red'}}to="/products">
                            Products
                        </Link>
                    </ListItem>
                    <Divider/>
                    <ListItem open={openForm} onClick={this.openFormSection.bind(this)}>

                        <Link
                            style={{color: 'white'}}
                            onlyActiveOnIndex={true}
                            activeStyle={{color: 'red'}}to="/form">
                            Form
                        </Link>
                    </ListItem>
                    <Divider/>
                </List>
            </Drawer>
        );
    }
}

export default Menu;
