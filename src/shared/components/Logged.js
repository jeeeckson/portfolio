import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';


/**
 * Component holding a set of options that will be displayed as a header action
 * when the user is logged into the application.
 * The options displayed will be tightly coupled to the actions that a logged
 * user can perform like logging out or setting preferences.
 */
class Logged extends Component {

    state = {
        anchorEl: null
    };

    /**
     *
     * @param event
     */
    handleClick(event) {
        this.setState({anchorEl: event.currentTarget});
    }

    /**
     *
     */
    handleRequestClose() {
        this.setState({anchorEl: null});
    }

    /**
     * Logs out the current user from the application.
     *
     * @param {Object} event The event that raised the action, can be null.
     */
    logout(event) {
        this.props.doOnLogout();
        this.setState({anchorEl: null});
    }

    /**
     * Performs actions before the component gets mounted.
     */
    componentWillMount() {
        axios.get(config.server + '/ebay/authorizationUrl')
            .then(response => {
                this.setState({urlEbayLogin: response.data});
            })
            .catch(error => {
                console.log(error);
                this.setState({urlEbayLogin: null});
            });
    }

    /**
     * Renders the component.
     *
     * @returns {XML} The component to be rendered or false/null if there is
     * nothing to be rendered.
     */
    render() {
        let token = localStorage.getItem("token_user") ? localStorage.getItem("token_user") : '';
        const open = Boolean(this.state.anchorEl);
        return (
            <div>
                {token ?
                    <Button
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : null}
                        aria-haspopup="true"
                        onClick={this.logout.bind(this)}
                        color="default">Log out</Button>
                    :
                    <Button
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick.bind(this)}
                        color="default">Log in</Button>
                }
            </div>
        );
    }
}

export default Logged;
