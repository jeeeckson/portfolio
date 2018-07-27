import React, {Component} from 'react';
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT} from '../../../server/Events'
import LoginForm from '../../components/LoginForm'
import ChatContainer from '../../components/chats/ChatContainer'

const socketUrl = "http://localhost:3000";

export default class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount() {
        this.initSocket();
    }

    /*
    *	Connect to and initializes the socket.
    */
    initSocket = () => {
        const socket = io(socketUrl);

        socket.on('connect', () => {
            if (localStorage) {
                let user = localStorage.getItem("log_user");
                if (user && user.length) {
                    this.setUser(JSON.parse(user));
                }
            }
            console.log("Connected");
        });

        this.setState({socket});
    };

    /**
     * Sets the user property in state
     * @param user {object} : {id:number, name:string, idComm:string}
     */
    setUser = (user) => {
        const {socket} = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
        localStorage.setItem("log_user", JSON.stringify(user));
    };

    /*
    *	Sets the user property in state to null.
    */
    logout = () => {
        const {socket} = this.state;
        this.setState({user: null});
        socket.emit(LOGOUT, {});
        localStorage.setItem("log_user", "");
    };


    render() {
        const {socket, user} = this.state;
        return (
            <div className="container">
                {
                    !user ?
                        <LoginForm socket={socket} setUser={this.setUser}/>
                        :
                        <ChatContainer socket={socket} user={user} logout={this.logout}/>
                }
            </div>
        );
    }
}
