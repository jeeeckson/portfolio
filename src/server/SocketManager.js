import {messageRepository} from "./repositories/messageRepository";
import logger from "../winston-configurer";

const {
    VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT,
    TYPING, PRIVATE_MESSAGE, NOTIFY_REQUEST_MESSAGE
} = require('./Events');

const {createUser, createMessage, createChat} = require('./Factories');

let connectedUsers = {};

let communityChat = createChat();

module.exports = (io) => {

    io.on('connection', socket => {
        console.log("Socket Id:" + socket.id);

        let sendMessageToChatFromUser;

        let sendTypingFromUser;

        //Verify Username
        socket.on(VERIFY_USER, (nickname, callback) => {
            if (isUser(connectedUsers, nickname)) {
                callback({isUser: true, user: null});
            } else {
                callback({isUser: false, user: createUser({name: nickname, idComm: socket.id})});
            }
        });

        //User Connects with username
        socket.on(USER_CONNECTED, (user) => {
            connectedUsers = addUser(connectedUsers, user);
            socket.user = user;

            sendMessageToChatFromUser = sendMessageToChat(user.name);
            sendTypingFromUser = sendTypingToChat(user.name);

            io.emit(USER_CONNECTED, connectedUsers);
            console.log(connectedUsers);

        });

        //User disconnects
        socket.on('disconnect', () => {
            if ("user" in socket) {
                connectedUsers = removeUser(connectedUsers, socket.user.name);

                io.emit(USER_DISCONNECTED, connectedUsers);
                console.log("(DISCONNECT) User list connected: ", connectedUsers);
            }
        });

        //User logsout
        socket.on(LOGOUT, () => {
            connectedUsers = removeUser(connectedUsers, socket.user.name);
            io.emit(USER_DISCONNECTED, connectedUsers);
            console.log("(LOGOUT) User list connected: ", connectedUsers);

        });

        //Get Community Chat
        socket.on(COMMUNITY_CHAT, (callback) => {
            callback(communityChat);
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
            let chat = createChat({name: '' + sender.name + '-' + receiver.name + '', users: [sender, receiver]});
            callback(chat);
            io.to(receiver.idComm).emit(NOTIFY_REQUEST_MESSAGE, chat);
        })
    });


    /*
    * Returns a function that will take a chat id and a boolean isTyping
    * and then emit a broadcast to the chat id that the sender is typing
    * @param sender {string} username of sender
    * @return function(chatId, message)
    */
    const sendTypingToChat = (user) => {
        return (chatId, isTyping) => {
            io.emit(`${TYPING}-${chatId}`, {user, isTyping});
        }
    };

    /*
    * Returns a function that will take a chat id and message
    * and then emit a broadcast to the chat id.
    * @param sender {string} username of sender
    * @return function(chatId, message)
    */
    const sendMessageToChat = (sender) => {
        return (chatId, message) => {
            io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender}));
        }
    };

    /*
    * Adds user to list passed in.
    * @param userList {Object} Object with key value pairs of users
    * @param user {User} the user to added to the list.
    * @return userList {Object} Object with key value pairs of Users
    */
    const addUser = (userList, user) => {
        let newList = Object.assign({}, userList);
        newList[user.name] = user;
        return newList;
    };

    /*
    * Removes user from the list passed in.
    * @param userList {Object} Object with key value pairs of Users
    * @param username {string} name of user to be removed
    * @return userList {Object} Object with key value pairs of Users
    */
    const removeUser = (userList, username) => {
        let newList = Object.assign({}, userList);
        delete newList[username];
        return newList;
    };

    /*
    * Checks if the user is in list passed in.
    * @param userList {Object} Object with key value pairs of Users
    * @param username {String}
    * @return userList {Object} Object with key value pairs of Users
    */
    const isUser = (userList, username) => {
        return username in userList;
    };

};
