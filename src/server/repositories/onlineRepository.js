import {Online} from "../entities/Online";
import logger from './../../winston-configurer';

const {getManager} = require('typeorm');

export class onlineRepository {

    /**
     * Save a new user into the database.
     * @param newUserOnline {object} : Object with the new user information, cannot be null.
     */
    static saveUser(newUserOnline) {
        const online = new Online(newUserOnline.handle, newUserOnline.connection_id);
        const onlineRepo = getManager().getRepository(Online);
        const onlineEntity = onlineRepo.create(online);

        return onlineRepo.createQueryBuilder("online")
            .where("online.handle = :handle")
            .setParameter("handle", newUserOnline.handle)
            .getOne()
            .then((result) => {
                if (result) {
                    throw {message: "There are an active connection"};
                }
                onlineEntity.handle = newUserOnline.handle;
                onlineEntity.connection_id = newUserOnline.connection_id;
                return onlineRepo.save(onlineEntity);
            })
            .catch((e) => {
                logger.error('error on saveUser: ' + e.message);
                return {error: e.message};
            });
    }

    /**
     * Save a new user into the database.
     * @param handle {object} : Object with the new user information, cannot be null.
     * @param userName {string} : Object with the new user information, cannot be null.
     * @param status {string} : Object with the new user information, cannot be null.
     */
    static updateUserByHandle(handle, userName, status) {
        const userRepo = getManager().getRepository(User);

        return userRepo.createQueryBuilder("user")
            .where("user.handle = :handle")
            .setParameter("handle", handle)
            .getOne()
            .then((result) => {
                result.friends.forEach(friend => {
                    if (friend.username === userName) {
                        friend.status = status;
                    }
                });
                return userRepo.save(result);
            })
            .catch((e) => {
                logger.error('error on updateUserByHandle: ' + e.message);
                return {error: e.message};
            });
    }

    /**
     * Save a new user into the database.
     * @param handle {object} : Object with the new user information, cannot be null.
     * @param friend {object} : Object with the new user information, cannot be null.
     */
    static updateUserByHandleAddFriend(handle, friend) {
        const userRepo = getManager().getRepository(User);

        return userRepo.createQueryBuilder("user")
            .where("user.handle = :handle")
            .setParameter("handle", handle)
            .getOne()
            .then((result) => {
                result.friends.push(friend);
                return userRepo.save(result);
            })
            .catch((e) => {
                logger.error('error on updateUserByHandleAddFriend: ' + e.message);
                return {error: e.message};
            });
    }

    /**
     * Save a new user into the database.
     * @param handle {object} : Object with the new user information, cannot be null.
     * @param userNameFriend {object} : Object with the new user information, cannot be null.
     */
    static updateUserByHandleQuitFriend(handle, userNameFriend) {
        const userRepo = getManager().getRepository(User);

        return userRepo.createQueryBuilder("user")
            .where("user.handle = :handle")
            .setParameter("handle", handle)
            .getOne()
            .then((result) => {
                let newList = [];
                result.friends.forEach(friend => {
                    if (friend.username !== userNameFriend) {
                        newList.push(friend);
                    }
                });
                result.friends = newList;
                return userRepo.save(result);
            })
            .catch((e) => {
                logger.error('error on updateUserByHandleQuitFriend: ' + e.message);
                return {error: e.message};
            });
    }


    /**
     *
     * @param user {User} the user object, cannot be null.
     * @param friendsArray {array} the array friend, cannot be null.
     * @returns {Promise} The result.
     */
    static addFriends(user, friendsArray) {
        const userRepo = getManager().getRepository(User);
        friendsArray.forEach(friend => {
            user.friends.push(friend);
        });
        const userEntity = userRepo.create(user);
        return userRepo.save(userEntity);
    }

    /**
     *
     * @param filter {String} the user name, cannot be null.
     * @returns {Promise} The result.
     */
    static findOnline(filter) {
        const userRepo = getManager().getRepository(Online);
        return userRepo.createQueryBuilder("user")
            .getMany()
            .then((result) => {
                return result;
            })
            .catch((e) => {
                logger.error('error on persist: ' + e.message);
                return {error: e.message};
            });
    }

    /**
     *
     * @param handle {String} the user name, cannot be null.
     * @returns {Promise} The result.
     */
    static findUserByHandle(handle) {
        const userRepo = getManager().getRepository(User);
        return userRepo.createQueryBuilder("user").where("user.handle = :handle")
            .setParameter("handle", handle)
            .getOne()
            .then((result) => {
                return result;
            })
            .catch((e) => {
                logger.error('error on persist: ' + e.message);
                return {error: e.message};
            });
    }
}
