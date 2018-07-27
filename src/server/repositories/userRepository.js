import {User} from "../entities/User";
import logger from './../../winston-configurer';

const {getManager} = require('typeorm');

export class userRepository {

    /**
     * Save a new user into the database.
     * @param newUser {object} : Object with the new user information, cannot be null.
     */
    static saveAndEditUser(newUser) {
        const user = new User(newUser.username, newUser.password, newUser.admin);
        const userRepo = getManager().getRepository(User);
        const userEntity = userRepo.create(user);

        return userRepo.createQueryBuilder("user")
            .where("user.username = :username")
            .setParameter("username", newUser.username)
            .getOne()
            .then((result) => {
                if (result) {
                    //We are updating, set the id and overwrite the whole product.
                    userEntity.id = result.id;
                }
                userEntity.password = newUser.password;
                userEntity.username = newUser.username;
                userEntity.admin = !!newUser.admin ? 1 : 0;
                return userRepo.save(userEntity);
            })
            .catch((e) => {
                logger.error('error on saveUser: ' + e.message);
                return {error: e.message};
            });
    }

    /**
     * Save a new user into the database.
     * @param infoUser {object} : Object with the new user information, cannot be null.
     */
    static isUser(infoUser) {
        const userRepo = getManager().getRepository(User);

        return userRepo.createQueryBuilder("user")
            .where("user.username = :username")
            .setParameter("username", infoUser.username)
            .getOne();
    }

    /**
     * Save a new user into the database.
     * @param infoUser {object} : Object with the new user information, cannot be null.
     */
    static signInUser(infoUser) {
        const userRepo = getManager().getRepository(User);

        return userRepo.createQueryBuilder("user")
            .where("user.username = :username AND user.password = :password")
            .setParameter("username", infoUser.username)
            .setParameter("password", infoUser.password)
            .getOne();
    }

    /**
     * Save a new user into the database.
     * @param username {object} : Object with the new user information, cannot be null.
     * @param userName {string} : Object with the new user information, cannot be null.
     * @param status {string} : Object with the new user information, cannot be null.
     */
    static updateUserByHandle(username, userName, status) {
        const userRepo = getManager().getRepository(User);

        return userRepo.createQueryBuilder("user")
            .where("user.username = :username")
            .setParameter("username", username)
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
     * @param username {object} : Object with the new user information, cannot be null.
     * @param friend {object} : Object with the new user information, cannot be null.
     */
    static updateUserByHandleAddFriend(username, friend) {
        const userRepo = getManager().getRepository(User);

        return userRepo.createQueryBuilder("user")
            .where("user.username = :username")
            .setParameter("username", username)
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
     * @param username {object} : Object with the new user information, cannot be null.
     * @param userNameFriend {object} : Object with the new user information, cannot be null.
     */
    static updateUserByHandleQuitFriend(username, userNameFriend) {
        const userRepo = getManager().getRepository(User);

        return userRepo.createQueryBuilder("user")
            .where("user.username = :username")
            .setParameter("username", username)
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
     * @param dataUser {object} the user object, cannot be null.
     * @returns {Promise} The result.
     */
    static saveUser(dataUser) {
        const user = new User(dataUser.username, dataUser.password, dataUser.name, dataUser.lastName, false);
        const userRepo = getManager().getRepository(User);
        const userEntity = userRepo.create(user);

        return userRepo.save(userEntity);
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
    static findUser(filter) {
        const userRepo = getManager().getRepository(User);
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
     * @param username {String} the user name, cannot be null.
     * @returns {Promise} The result.
     */
    static findUserByUsername(username) {
        const userRepo = getManager().getRepository(User);
        return userRepo.createQueryBuilder("user").where("user.username = :username")
            .setParameter("username", username)
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
