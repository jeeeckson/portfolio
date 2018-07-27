const uuidv4 = require('uuid/v4');

/**
 * connectUser
 * Connect a user.
 * @param name {string}
 * @param idComm {string}
 * @returns {{id: *, name: string, idComm}}
 */
const connectUser = ({name = "", idComm} = {}) => {
        let obj = {
            id: uuidv4(),
            name,
            idComm: []
        };
        obj.idComm.push(idComm);
        return obj;
    }
;

/**
 * Creates a messages object.
 * @param message {string} actual string message
 * @param sender {string} sender of the message
 * @returns {{id: *, time: string, message: string, sender: string}}
 */
const createMessage = ({message = "", sender = ""} = {}) => (
    {
        id: uuidv4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }

);

/**
 * Creates a Chat object
 * @param messages {Array}
 * @param name {string}
 * @param users {Array}
 * @returns {{id: *, name: string, messages: Array, users: Array, typingUsers: Array}}
 */
const createChat = ({messages = [], name = "Community", users = []} = {}) => {
        return {
            id: uuidv4(),
            name,
            messages,
            users,
            typingUsers: []
        }
    }
;


/**
 * @param date {Date}
 * @returns {string}  a string represented in 24hr time i.e. '11:30', '19:30'
 */
const getTime = (date) => {
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
};

module.exports = {
    createMessage,
    createChat,
    connectUser
};

