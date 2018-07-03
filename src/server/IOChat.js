import logger from "../winston-configurer";
import {userRepository} from "./repositories/userRepository";
import {messageRepository} from "./repositories/messageRepository";

module.exports = (app, io) => {

    app.post('/register', (req, res) => {
        let user = {
            "username": req.body.user.name,
            "handle": req.body.user.handle,
            "password": req.body.user.password
        };
        logger.info(user);
        return userRepository.saveUser(user).then(() => {
            res.send("success");
        }).catch(err => {
            res.json(err);
        });
    });

    let handle = null;
    let users = {};
    let keys = {};

    app.post('/login', (req, res) => {
        logger.info(req.body.data.handle);
        handle = req.body.data.handle;
        return userRepository.findUserByHandle(handle).then(entity => {
            if (entity === null) {
                res.send("User has not registered");
            } else {
                res.send("success");
            }
        }).catch(err => {
            res.send(err);
        });
    });

    io.on('connection', (socket) => {

        if (handle) {

            logger.info("Connection : User is connected  " + handle);
            logger.info("Connection : " + socket.id);
            io.to(socket.id).emit('handle', keys[socket.id]);
            if (users[handle] && users[handle].length) {
                delete keys[socket.id];
            }
            users[handle] = socket.id;
            keys[socket.id] = handle;
            io.emit('users', users);
            logger.info("Users list : " + JSON.stringify(users));
            logger.info("keys list : " + JSON.stringify(keys));
            userRepository.findUserByHandle(handle).then(userResult => {
                let friends = [];
                let pending = [];
                //logger.info("friends list: " + doc);
                let list = userResult.friends.slice();
                list.forEach(friend => {
                    if (friend.status === "Friend") {
                        friends.push(friend.username);
                    }
                    else if (friend.status === "Pending") {
                        pending.push(friend.username);
                    }
                });
                logger.info("pending list: " + JSON.stringify(pending));
                logger.info("friends list: " + JSON.stringify(friends));
                io.to(socket.id).emit('friend_list', friends);
                io.to(socket.id).emit('pending_list', pending);

            }).catch(err => {
                logger.info("Error on find User " + err.message);
            });

            // just like on the client side, we have a socket.on method that takes a callback function
            socket.on('change color', (color) => {
                // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
                // we make use of the socket.emit method again with the argument given to use from the callback function above
                logger.info('Color Changed to: ' + color);
                io.sockets.emit('change color', color)
            });

            socket.on('group message', (msg) => {
                logger.info(msg);
                io.emit('group', msg);
            });

            socket.on('room', (room) => {
                if (socket.room)
                    socket.leave(socket.room);

                socket.room = room;
                socket.join(room);
            });

            socket.on('private message', (msg) => {
                logger.info('message  :' + msg.split("#*@")[0]);
                messageRepository.saveMessage({
                    "message": msg.split("#*@")[1],
                    "sender": msg.split("#*@")[2],
                    "receiver": msg.split("#*@")[0]
                }).then(() => {
                    io.to(users[msg.split("#*@")[0]]).emit('private message', msg);
                });
            });

            socket.on('disconnect', () => {
                delete users[keys[socket.id]];
                delete keys[socket.id];
                io.emit('users', users);
                logger.info('User disconnected');
                logger.info(users);
            });
        }
    });

    app.post('/friend_request', (req, res) => {
        userRepository.findUserByHandle(req.body.my_handle).then((result) => {
            result.friends.forEach(friend => {
                if (friend.username === req.body.friend_handle) {
                    logger.info("Friend request : " + doc.length);
                    logger.info("Friend request : friend request already sent " + doc);
                    res.send("Friend request already sent ");
                }
            });

            logger.info("Friend request : " + result.length);
            userRepository.updateUserByHandleAddFriend(req.body.my_handle, {
                username: req.body.friend_handle,
                status: "Pending"
            }).catch(err => {
                res.json(err);
            });
            io.to(users[req.body.friend_handle]).emit('message', req.body);
        }).catch(err => {
            res.json(err);
        });
    });

    app.post('/friend_request/confirmed', (req, res) => {
        logger.info("friend request confirmed : " + req.body);
        if (req.body.confirm === "Yes") {
            userRepository.findUserByHandle(req.body.friend_handle).then((result) => {
                result.friends.forEach(friend => {
                    if (friend.username === req.body.my_handle) {
                        logger.info("Friend request confirmed : " + doc.length);
                        logger.info("Friend request confirmed : friend request already sent " + doc);
                        res.send("Friend request already accepted");
                    }
                });
                userRepository.updateUserByHandle(req.body.my_handle, req.body.friend_handle, "Friend")
                    .then(() => {
                        logger.info("friend request confirmed : Inside yes confirmed");
                        io.to(users[req.body.friend_handle]).emit('friend', req.body.my_handle);
                        io.to(users[req.body.my_handle]).emit('friend', req.body.friend_handle);
                    })
                    .catch(err => {
                        res.json(err);
                    });

                userRepository.updateUserByHandleAddFriend(req.body.friend_handle, {
                    username: req.body.my_handle,
                    status: "Friend"
                }).then(() => {
                    logger.info("friend updated");
                }).catch(err => {
                    res.json(err);
                });
            });
        } else {

            logger.info("friend request confirmed : Inside No confirmed");
            userRepository.updateUserByHandleQuitFriend(req.body.my_handle, req.body.friend_handle).then(() => {
                logger.info("No");
            }).catch(err => {
                res.json(err);
            });
        }
    });

};
