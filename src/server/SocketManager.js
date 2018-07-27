import logger from "../winston-configurer";
import {userRepository} from "./repositories/userRepository";

const {
    VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT,
    TYPING, PRIVATE_MESSAGE, NOTIFY_REQUEST_MESSAGE, NOTIFY_REQUEST_PRIVATE_MESSAGE, REGISTER_USER, FRIEND_REQUEST
} = require('./Events');

const {connectUser, createMessage, createChat} = require('./Factories');

let connectedUsers = {};

let chats = [];

module.exports = (io) => {

    io.on('connection', socket => {
        console.log("Socket Id:" + socket.id);

        let sendMessageToChatFromUser;

        let sendTypingFromUser;

        //Register Username
        socket.on(REGISTER_USER, (name, lastName, username, password, callback) => {
            //if need more security use post req.body.user.nickname
            return isUser({username}).then(result => {
                if (result) {
                    callback({alreadyUser: true, signed: false});
                } else {
                    userRepository.saveUser({name, lastName, username, password}).then(() => {
                        callback({alreadyUser: false, signed: true});
                    }).catch(e => {
                        logger.error("Error on persist user: " + e.message);
                        callback({alreadyUser: false, signed: false});
                    })
                }
            });
        });

        //Verify Username
        socket.on(VERIFY_USER, (username, password, callback) => {
            return isValidUser({username, password}).then(result => {
                if (result) {
                    if (isConnected({username})) {
                        callback({isUser: true, user: null});
                    } else {
                        callback({isUser: true, user: connectUser({name: username, idComm: socket.id})});
                    }
                } else {
                    callback({isUser: false, user: null});
                }
            });
        });

        //User Connects with username
        socket.on(USER_CONNECTED, (user) => {
            user.idComm.push(socket.id);
            connectedUsers = addUser(user);
            socket.user = user;

            sendMessageToChatFromUser = sendMessageToChat(user.name);
            sendTypingFromUser = sendTypingToChat(user.name);

            io.emit(USER_CONNECTED, connectedUsers);

        });

        //User disconnects
        socket.on('disconnect', () => {
            if ("user" in socket) {
                connectedUsers = removeUser(socket.user.name, socket.id);

                io.emit(USER_DISCONNECTED, connectedUsers);
                console.log("(DISCONNECT) User list connected: ", connectedUsers);
            }
        });

        //User logsout
        socket.on(LOGOUT, () => {
            connectedUsers = removeUser(socket.id, socket.id);
            io.emit(USER_DISCONNECTED, connectedUsers);
            console.log("(LOGOUT) User list connected: ", connectedUsers);
        });

        //Get Community Chat
        socket.on(COMMUNITY_CHAT, (callback) => {
            let exist = chats.filter(chat => chat.name === "Community").map(e => e);
            let chat = {};
            if (!exist.length) {
                chat = createChat();
                chats.push(chat);
            } else {
                chat = exist[0];
            }
            callback(chat);
        });

        socket.on(MESSAGE_SENT, ({chatId, message}) => {
            sendMessageToChatFromUser(chatId, message);
        });

        socket.on(TYPING, ({chatId, isTyping}) => {
            sendTypingFromUser(chatId, isTyping);
        });
        /*
                socket.on(PRIVATE_MESSAGE, ({message, sender, receiver}) => {
                    messageRepository.saveMessage({message, sender, receiver}).then(() => {
                        io.to(receiver).emit(PRIVATE_MESSAGE, {message, sender, receiver});
                    });
                });
        */
        socket.on(PRIVATE_MESSAGE, (sender, receiver, callback) => {
            let exist = chats.filter(chat => chat.name === (sender.name + '-' + receiver.name) || chat.name === (receiver.name + '-' + sender.name)).map(e => e);
            let chat = {};
            if (!exist.length) {
                chat = createChat({name: '' + sender.name + '-' + receiver.name + '', users: [sender, receiver]});
                chats.push(chat);
            } else {
                chat = exist[0];
            }

            callback(chat);
            io.to(receiver.idComm).emit(NOTIFY_REQUEST_MESSAGE, chat);
        });

        socket.on(FRIEND_REQUEST, (sender, receiver, callback) => {
            userRepository.findUserByUsername(receiver.name).then((result) => {
                let friendRequest = result.friends.filter(friend => friend.username === sender.name).map(e => e);
                if (!friendRequest.length) {
                    logger.info("Friend request : " + result.length);
                    userRepository.updateUserByHandleAddFriend(sender.name, {
                        username: receiver.name,
                        status: "Pending"
                    });
                    io.to(receiver.idComm).emit(FRIEND_REQUEST, sender);
                    callback("Send friend request successful");
                } else {
                    callback("Already send friend request.");
                }

            }).catch(err => {
                logger.info("Error on friend request : " + err.message);
            });
        })
    });

    /**
     * Returns a function that will take a chat id and a boolean isTyping
     * and then emit a broadcast to the chat id that the sender is typing
     * @param user
     * @returns {function(*, *)}
     */
    const sendTypingToChat = (user) => {
        return (chatId, isTyping) => {
            io.emit(`${TYPING}-${chatId}`, {user, isTyping});
        }
    };

    /**
     * Returns a function that will take a chat id and message
     * and then emit a broadcast to the chat id.
     * @param sender {string} username of sender
     * @returns {function(*, *)}
     */
    const sendMessageToChat = (sender) => {
        return (chatId, message) => {
            let msg = createMessage({message, sender});
            chats.forEach(chat => {
                if (chat.id === chatId) {
                    chat.messages.push(msg);

                    if (chat.users && chat.users.length) {
                        chat.users.forEach(us => {
                            if (us.name !== sender.name) {
                                io.to(us.idComm).emit(NOTIFY_REQUEST_PRIVATE_MESSAGE, chat);
                            }
                        })
                    }
                }
            });

            io.emit(`${MESSAGE_RECEIVED}-${chatId}`, msg);
        }
    };

    /**
     * Adds user to list passed in.
     * @param user {User} the user to added to the list.
     * @returns {{} & {}} Object with key value pairs of Users
     */
    const addUser = (user) => {
        let newList = Object.assign({}, connectedUsers);
        newList[user.name] = user;
        return newList;
    };

    /**
     * Removes user from the list passed in.
     * @param username {string} name of user to be removed
     * @param idComm {string} id from  to be removed
     * @returns {{} & {}} Object with key value pairs of Users
     */
    const removeUser = (username, idComm) => {
        let newList = Object.assign({}, connectedUsers);
        if (newList[username] && newList[username].idComm.length > 1) {
            delete newList[username];
        } else if (newList[username] && newList[username].idComm.length === 1) {
            newList[username].idComm.forEach(idSocket => {
                if (idSocket === idComm) {
                    delete newList[username].idComm[idSocket];
                }
            });
        }
        return newList;
    };

    /**
     * Checks if the user is in database.
     * @param username {String}
     * @returns {*}
     */
    const isUser = ({username}) => {
        return userRepository.isUser({username: username});
    };

    /**
     * Checks if the user is in database.
     * @param username {String}
     * @param password {String}
     * @returns {*}
     */
    const isValidUser = ({username, password}) => {
        return userRepository.signInUser({username, password});
    };

    /**
     * Checks if the user is in list of connected.
     * @param username {String}
     * @returns {boolean}
     */
    const isConnected = ({username}) => {
        return username in connectedUsers;
    };

    /**
     * Checks if the user idComm is in list of connected.
     * @param username {String}
     * @returns {boolean}
     */
    const isConnectedSocket = ({id}) => {
        return id in connectedUsers;
    };

};
