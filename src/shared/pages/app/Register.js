import React, {Component} from 'react';
import Page from '../Page';
import {Button, TextField} from '@material-ui/core/';
import axios from "axios/index";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                'handle': '',
                'password': ''
            }
        };
    }

    getMetaData() {
        return {
            title: this.pageTitle(),
            meta: this.pageMeta(),
            link: this.pageLink()
        };
    }

    pageTitle = () => {
        return 'Register | Portfolio';
    };

    pageMeta = () => {
        return [
            {name: 'description', content: 'Portfolio Register'}
        ];
    };

    pageLink = () => {
        return [];
    };

    register = () => {
        let params = {
            user: this.state.user
        };
        axios.post('/register', params).then(res => {
            debugger;
            console.log(res);
            this.props.registed();
        }).catch(err => console.log(err))
    };

    handleChangeRegister = (e, field) => {
        let user = this.state.user;
        user[field] = e.target.value;
        this.setState({user: user});
    };

    render() {
        return (
            <Page {...this.getMetaData()}>
                <form onSubmit={this.register}>

                    <TextField
                        label="Name"
                        type="text"
                        value={this.state.user.name}
                        onChange={(e) => this.handleChangeRegister(e, "name")}
                    />
                    <TextField
                        label="Handle"
                        type="text"
                        value={this.state.user.handle}
                        onChange={(e) => this.handleChangeRegister(e, "handle")}
                    />
                    <TextField
                        label="Password"
                        type="text"
                        value={this.state.user.password}
                        onChange={(e) => this.handleChangeRegister(e, "password")}
                    />
                    <Button onClick={this.register}>Register</Button>
                </form>
            </Page>
        );
    }
}

export default Register;
