import React from 'react';
import {Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core/';

class PopUpMessenger extends React.Component {

    constructor(props) {
        super();
        this.props = props;
        this.state = {
            message: "",
            open: true
        };
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {closeChat, friend, sendMessage, messages} = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <ul>
                            {messages.map((message, index) => {
                                return (
                                    <li key={index}>
                                        {message}
                                    </li>
                                )
                            })}
                        </ul>
                        <form onSubmit={() => {
                            sendMessage(friend, this.state.message);
                            this.setState({message: ""});
                        }}>
                            <TextField
                                label="Type and hit ENTER"
                                type="text"
                                value={this.state.message}
                                onChange={this.handleChange}
                            />
                        </form>
                        <DialogActions>
                            <Button onClick={() => {
                                sendMessage(friend, this.state.message);
                                this.setState({message: ""});
                            }}>Send</Button>
                            <Button onClick={closeChat}>Close</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default PopUpMessenger;
