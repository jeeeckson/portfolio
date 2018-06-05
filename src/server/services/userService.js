import * as userRepository from "../repositories/userRepository";

export class userService {
    static saveUser(userObj) {
        return userRepository.saveUser(userObj).then((res) => {
            return res;
        });
    }

    static findUser(userName) {
        return userRepository.findUser(userName).then((res) => {
            return res;
        });
    }
}