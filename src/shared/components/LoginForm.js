import React, {Component} from 'react';
import {VERIFY_USER} from '../../server/Events'
import {TextField, Button} from '@material-ui/core/';
import Register from "../pages/app/Register";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: "",
            modeRegister: false
        };
    }

    setUser = ({user, isUser}) => {
        if (user) {
            this.setError("");
            this.props.setUser(user);
        } else {
            if (isUser) {
                this.setError("User already connected.");
            } else {
                this.setError("Invalid user or password.");
            }
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {socket} = this.props;
        const {username, password} = this.state;
        socket.emit(VERIFY_USER, username, password, this.setUser)
    };

    handleChange = (e, field) => {
        this.setState({[field]: e.target.value})
    };

    setError = (error) => {
        this.setState({error})
    };

    render() {
        const {username, password, error, modeRegister} = this.state;
        const {socket} = this.props;
        return (
            <div className="login">
                {!modeRegister ?
                    <form onSubmit={this.handleSubmit} className="login-form">

                        <TextField
                            label="Got a username?"
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => this.handleChange(e, "username")}
                            placeholder={'Username'}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => this.handleChange(e, "password")}
                            placeholder={'Password'}
                        />
                        <div className="error">{error ? error : null}</div>
                        <Button onClick={this.handleSubmit}>Sign in</Button>
                        <Button onClick={() => this.setState({modeRegister: true})}>Sign me</Button>

                    </form>
                    :
                    <Register
                        socket={socket}
                        onClose={() => this.setState({modeRegister: false, error: "User registered successful."})}
                    />
                }
            </div>
        );
    }
}
