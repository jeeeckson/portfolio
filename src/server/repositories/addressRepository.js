import {Address} from "../entities/Address";
const logger = require('winston');
const {getEntityManager} = require('typeorm');

export class addressRepository {

    /**
     * Save a new address into the database.
     * @param newAddress {object} : Object with the new address information, cannot be null.
     */
    static saveAddress(newAddress) {
        const address = new Address(newAddress.user, newAddress.route, newAddress.number, newAddress.state, newAddress.city);
        const addressRepository = getEntityManager().getRepository(Address);
        const addressEntity = addressRepository.create(address);

        return addressRepository.createQueryBuilder("address")
            .innerJoinAndSelect("activity.user", "user")
            .where("user.id = :1", {1: newAddress.user.id})
            .setParameter("user", newAddress.user)
            .getOne()
            .then((result) => {
                if (result) {
                    //We are updating, set the id and overwrite the whole product.
                    addressEntity.user = result.user;
                }
                addressEntity.route = newAddress.route;
                addressEntity.number = newAddress.number;
                addressEntity.state = newAddress.state;
                addressEntity.city = newAddress.city;
                return addressRepository.persist(addressEntity);
            })
            .catch((e) => {
                logger.error('error on persist: ' + e.message);
                return {error: e.message};
            });
    }

    /**
     *
     * @param user {String} the user name, cannot be null.
     * @returns {Promise} The result.
     */
    static findAddressByUser(user) {
        const addressRepository = getEntityManager().getRepository(Address);

        return addressRepository.createQueryBuilder("address")
            .innerJoinAndSelect("activity.user", "user")
            .where("user.id = :1", {1: user.id})
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