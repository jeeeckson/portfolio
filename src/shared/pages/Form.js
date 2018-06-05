import React from 'react';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";

class Form extends React.Component {

    constructor(){
        super();
        this.state = {
            open: false,
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
            open: true,
            redirect: true,
        });
    }

    render() {
        if (this.state.redirect){
            return (<Redirect to="/home"/>);
        }
        return (
            <div>
                <Button variant="flat" color="secondary" onClick={this.handleClick}>
                    FORM
                </Button>
            </div>
        );
    }
}


export default Form;