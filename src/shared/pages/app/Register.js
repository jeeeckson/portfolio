import React, {Component} from 'react';
import Page from '../Page';
import {Button, TextField} from '@material-ui/core/';
import {REGISTER_USER} from "../../../server/Events";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                'username': '',
                'name': '',
                'lastName': '',
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
        const {socket} = this.props;
        const {user} = this.state;
        socket.emit(REGISTER_USER, user.name, user.lastName, user.username, user.password, this.callback);
    };

    handleChangeRegister = (e, field) => {
        let user = this.state.user;
        user[field] = e.target.value;
        this.setState({user: user});
        console.log(field)
    };

    callback = ({alreadyUser, signed}) => {
        const {onClose} = this.props;
        if (alreadyUser){
            this.setState({error: "The username already in use."});
        } else {
            if (signed) {
                onClose();
            } else {
                this.setState({error: "The user was signed successful."});
            }
        }
    };

    render() {
        const {socket} = this.props;
        socket.on(REGISTER_USER, (users) => this.setState({users: Object.values(users)}));
        return (
            <Page {...this.getMetaData()}>
                <form onSubmit={this.register}>

                    <TextField
                        label="Username"
                        type="text"
                        value={this.state.user.username}
                        onChange={(e) => this.handleChangeRegister(e, "username")}
                    />
                    <TextField
                        label="Name"
                        type="text"
                        value={this.state.user.name}
                        onChange={(e) => this.handleChangeRegister(e, "name")}
                    />
                    <TextField
                        label="Last name"
                        type="text"
                        value={this.state.user.lastName}
                        onChange={(e) => this.handleChangeRegister(e, "lastName")}
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
