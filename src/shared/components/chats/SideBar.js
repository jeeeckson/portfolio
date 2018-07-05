import React, {Component} from 'react';
import {Chip, Button} from '@material-ui/core/';

export default class SideBar extends Component {

    render() {
        const {users, activeChat, user, setActiveChat, logout, addPrivateChat, addPublicChat} = this.props;
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
                                const classNames = (activeChat && activeChat.id === userOnline.id) ? 'active' : '';

                                return (
                                    <Chip
                                        key={userOnline.id}
                                        label={userOnline.name}
                                        className={`user ${classNames}`}
                                        onClick={() => {
                                            if (userOnline.name === "Community"){
                                                addPublicChat()
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
