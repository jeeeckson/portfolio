import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CircularProgress} from '@material-ui/core';

class AuthenticationForm extends Component {

    determineRender() {
        const {isWaiting, authenticated, message} = this.props;
        const inputs = (
            this.props.inputs.map((input, i) =>
                <Grid item key={'signup-text-' + i}>
                    <TextField
                        id={'username' + i}
                        label={input.label}
                        placeholder={input.label}
                        inputRef={input.ref}
                        required
                        type={input.password ? 'password' : ''}
                        autoComplete="off"
                    />
                </Grid>
            )
        );
        if (isWaiting) {
            return (
                <div>
                    <CircularProgress size={50}/>
                </div>
            );
        }
        else if (authenticated) {
            return (
                <p>
                    You are now authenticated!
                </p>
            );
        }
        return (
            <form onSubmit={this.props.formSubmit}>
                <Grid container direction="column" justify="center" alignItems="center">
                    {inputs}
                    <Button raised color="accent" type="submit">
                        {this.props.formSubmitText}
                        {this.props.formSubmitIcon}
                    </Button>
                </Grid>
            </form>
        );
    }

    render() {
        return (
            <div>
                <AppBar position="static" color="accent">
                    <div>
                        {this.props.title}
                    </div>
                </AppBar>
                <Paper>
                    <Grid>
                        {this.determineRender()}
                    </Grid>
                </Paper>
            </div>
        );
    }
}

AuthenticationForm.propTypes = {
    title: PropTypes.string.isRequired,
    inputs: PropTypes.array.isRequired,
    formSubmit: PropTypes.func.isRequired,
    formSubmitText: PropTypes.string.isRequired,
    formSubmitIcon: PropTypes.node,
    isWaiting: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
};
export default AuthenticationForm;
