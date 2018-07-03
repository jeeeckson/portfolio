import React, {Component} from 'react';
import Page from '../Page';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core/';
import axios from "axios/index";
import Register from "./Register";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            register: false,
            login_data: {
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
        return 'Login | Portfolio';
    };

    pageMeta = () => {
        return [
            {name: 'description', content: 'Portfolio Login'}
        ];
    };

    pageLink = () => {
        return [];
    };

    login = () => {
        console.log("login");
        axios.post('/login', {data: this.state.login_data}).then(res => {
            if (res.data === "success") {
                console.log("Inside success login");
                this.props.logged(this.state.login_data);
            }
            console.log(res);
        }).catch(err => console.log(err));
    };

    handleChangeLogin = (e, field) => {
        let login_data = this.state.login_data;
        login_data[field] = e.target.value;
        this.setState({login_data: login_data});
    };


    render() {
        return (
            <Page {...this.getMetaData()}>
                {!this.state.register ?
                    <form onSubmit={this.login}>
                        <TextField
                            label="Handle"
                            type="text"
                            value={this.state.login_data.handle}
                            onChange={(e) => this.handleChangeLogin(e, "handle")}
                        />
                        <TextField
                            label="Password"
                            type="text"
                            value={this.state.login_data.password}
                            onChange={(e) => this.handleChangeLogin(e, "password")}
                        />
                        <Button onClick={this.login} color="secondary">Login</Button>
                        <Button color="secondary" onClick={() => this.setState({register: true})}>Register</Button>
                    </form>
                    :
                    <Register registed={() => this.setState({register: false})}/>
                }

            </Page>
        );
    }
}

export default Login;
