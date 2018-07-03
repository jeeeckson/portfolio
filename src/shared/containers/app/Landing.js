import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Landing extends Component {

    determineHeaderRender = () => {
        const authenticated = this.props.user.authenticated;
        if (!authenticated) {
            return (
                <div>
                    <Link to="/lobbys">
                        <Button className={cx('header-button')} raised color="accent"> View Lobbies </Button>
                    </Link>
                    <Link to="/login">
                        <Button className={cx('header-button')} raised color="primary"> Get Started </Button>
                    </Link>
                </div>
            );
        }
        return (
            <div>
                <Link to="/lobbys">
                    <Button raised color="accent">View Lobbies</Button>
                </Link>
                <Button raised color="primary">Open Portfolio</Button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                    </div>
                    <div>
                        {this.determineHeaderRender()}
                        <h5>
                            Create a playlist or queue and get started!
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    user: PropTypes.object,
};

function mapStateToProps({user}) {
    return {
        user
    };
}


export default connect(mapStateToProps)(Landing);
