import React, {Component} from 'react';
import {Chip, Button, Avatar} from '@material-ui/core/';
import {Mail} from '@material-ui/icons/';

export default class SideBar extends Component {

    render() {
        const {users, activeChat, user, setActiveChat, logout, addPrivateChat, addPublicChat, chatRequest} = this.props;
        let chatUserList = users;
        if(!chatUserList.filter(userChat => userChat.name==="Community").map(o=>o).length){
            chatUserList.push({id: '1', name: "Community"});
        }

        return (
            <div id="side-bar">
                <div className="heading">
                    <div className="app-name">Chat</div>
                </div>
                <div className="current-user">
                    <Chip
                        label={user.name}
                    />

                    <Button onClick={() => {
                        logout()
                    }} className="logout">Log out</Button>
                </div>
                <div className="heading">
                    <div className="app-name">Chats</div>
                </div>
                <div
                    className="users"
                    ref='users'
                    onClick={(e) => {
                        (e.target === this.refs.user) && setActiveChat(null)
                    }}>

                    {
                        chatUserList.map((userOnline) => {
                            if (userOnline.name) {
                                let avatar = null;
                                const classNames = (activeChat && activeChat.id === userOnline.id) ? 'active' : '';
                                const messageRequest = chatRequest.filter(req => req.name=== (user.name + '-' + userOnline.name) || req.name === (userOnline.name + '-' + user.name)).map(e => e);
                                if (messageRequest.length){
                                    avatar = <Avatar>
                                        <Mail/>
                                    </Avatar>
                                }
                                return (
                                    <Chip
                                        key={userOnline.id}
                                        label={userOnline.name}
                                        avatar={avatar}
                                        className={`user ${classNames}`}
                                        onClick={() => {
                                            if (userOnline.name === "Community"){
                                                addPublicChat();
                                            } else {
                                                addPrivateChat({sender: user, receiver: userOnline});
                                            }
                                        }}
                                    />
                                )
                            }

                            return null
                        })
                    }

                </div>

            </div>
        );

    }
}
