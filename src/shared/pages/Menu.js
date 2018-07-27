import React, {Component} from 'react';
import {ListSubheader} from '@material-ui/core/';
import Drawer from '@material-ui/core/Drawer';
import {MenuItem} from '@material-ui/core/';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';

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
        super(props);
        this.state = {open: false};
    }

    /**
     * Renders the component.
     *
     * @return {XML} The jsx component to be rendered, never null.
     */
    render() {
        return (
            <Drawer
                open={this.props.open}
                onClose={(open) => this.props.onItemTouchTap()}>

                <List
                    className="avenue-drawer-width"
                    subheader={
                        <ListSubheader
                            inset={true}
                            color="default">
                            Menu
                        </ListSubheader>
                    }>
                    <Divider/>
                    <Link to="/orders">
                        <MenuItem onClick={this.props.onItemTouchTap}>
                            Orders
                        </MenuItem>
                    </Link>
                </List>
            </Drawer>
        );
    }
}

export default Menu;
