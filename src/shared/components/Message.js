import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button'
import {dismissMessage} from '../actions/message';

class Message extends Component {

    handleClose = () => {
        this.props.dismissMessage();
    };

    determineRender() {
        const {message} = this.props.message;
        if (message !== undefined && message.length > 0) {
            return (
                <div>
                    {this.renderSnackbar()}
                </div>
            );
        }
    }

    renderSnackbar() {
        return (
            <div>
                <Snackbar
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.props.message.open}
                    message={this.props.message.message}
                    action={[
                        <Button key="undo" color="primary" dense onClick={this.handleClose}>
                            Close
                        </Button>,
                    ]}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.determineRender()}
            </div>
        );
    }
}


Message.propTypes = {
    message: PropTypes.object,
    dismissMessage: PropTypes.func.isRequired,
};

function mapStateToProps({message}) {
    return {
        message
    };
}

export default connect(mapStateToProps, {dismissMessage})(Message);
