import {Message} from "../entities/Message";
import {User} from "../entities/User";
import logger from './../../winston-configurer';

const {getManager} = require('typeorm');

export class messageRepository {

    /**
     * Save a new message into the database.
     * @param newMessage {object} : Object with the new message information, cannot be null.
     */
    static async saveMessage(newMessage) {
        const userRepository = getManager().getRepository(User);
        const userReceiver = await userRepository.findOne({username: newMessage.receiver});
        const userSender = await userRepository.findOne({username: newMessage.sender});

        const message = new Message(userSender, userReceiver, newMessage.message);
        const messageRepository = getManager().getRepository(Message);
        const messageEntity = messageRepository.create(message);

        return messageRepository.persist(messageEntity);
    }

    /**
     *
     * @param messageName {String} the message name, cannot be null.
     * @returns {Promise} The result.
     */
    static findMessage(messageName) {
        const messageRepository = getManager().getRepository(Message);
        return messageRepository.createQueryBuilder("message")
            .getMany()
            .then((result) => {
                return result;
            })
            .catch((e) => {
                logger.error('error on persist: ' + e.message);
                return {error: e.message};
            });
    }
}
