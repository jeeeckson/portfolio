import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router-dom';

class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            open: false,
            redirect: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClose (){
        this.setState({
            open: false,
        });
    }

    handleClick () {
        this.setState({
            redirect: true
        });
    }

    render() {
        const {open, redirect} = this.state;
        if (redirect){
            return <Redirect to="/form"/>
        }
        return (
            <div>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle>Super Secret Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>1-2-3-4-5</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography variant="display1" gutterBottom>
                    Material-UI
                </Typography>
                <Typography variant="subheading" gutterBottom>
                    example project
                </Typography>
                <Button variant="flat" color="secondary" onClick={this.handleClick}>
                    Super Secret Password
                </Button>
            </div>
        );
    }
}

export default Home;
