import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from '@material-ui/core/';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };
    handleDrawerClose = () => {
        this.setState({open: false});
    };

    determineListRender() {
        const inputs = (
            this.props.sideBarElements.map((item, i) =>
                <Link to={item.url} key={'profile-nav-' + i}>
                    <ListItem button>
                        <ListItemIcon>
                            <item.icon/>
                        </ListItemIcon>
                        <ListItemText inset="inset" primary={item.name}/>
                    </ListItem>
                </Link>
            )
        );
        return inputs;
    }

    determineExternalsRender() {
        let externals = '';
        if (this.props.externalElements) {
            externals = (
                this.props.externalElements.map((item, i) =>
                    <Link to={item.url} key={'profile-nav-sub' + i}>
                        <ListItem button>
                            <ListItemIcon>
                                <item.icon/>
                            </ListItemIcon>
                            <ListItemText inset="inset" primary={item.name}/>
                        </ListItem>
                    </Link>
                )
            );
        }
        return externals;
    }

    render() {
        return (
            <Drawer
                type="permanent"
            >
                <List>
                    {this.determineListRender()}
                    <Divider/>
                    {this.determineExternalsRender()}
                </List>
            </Drawer>
        );
    }
}

Sidebar.defaultProps = {
    externalElements: [],
    includeLogout: false,
};

Sidebar.propTypes = {
    sideBarElements: PropTypes.array.isRequired,
    externalElements: PropTypes.array,
    includeLogout: PropTypes.bool
};

export default Sidebar;
