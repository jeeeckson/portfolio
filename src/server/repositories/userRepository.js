import {User} from "../entities/User";

const {getEntityManager} = require('typeorm');
const logger = require('winston');

export class userRepository {

    /**
     * Save a new user into the database.
     * @param newUser {object} : Object with the new user information, cannot be null.
     */
    static saveUser(newUser) {
        const user = new User(newUser.username, newUser.password, newUser.admin);
        const userRepository = getEntityManager().getRepository(User);
        const userEntity = userRepository.create(user);

        return userRepository.createQueryBuilder("user")
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
                return userRepository.persist(userEntity);
            })
            .catch((e) => {
                logger.error('error on persist: ' + e.message);
                return {error: e.message};
            });
    }

    /**
     *
     * @param userName {String} the user name, cannot be null.
     * @returns {Promise} The result.
     */
    static findUser(userName) {
        const userRepository = getEntityManager().getRepository(User);

        return userRepository.createQueryBuilder("user")
            .where("user.username = :1", {1: userName})
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