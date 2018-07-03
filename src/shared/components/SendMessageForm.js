import React from 'react';
import TextField from '@material-ui/core/TextField';

class SendMessageForm extends React.Component {

    constructor() {
        super();
        this.state = {
            message: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    label="Type and hit ENTER"
                    type="text"
                    value={this.state.message}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}

export default SendMessageForm;
