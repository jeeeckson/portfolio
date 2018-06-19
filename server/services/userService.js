import {userRepository} from "../repositories/userRepository";

export class userService {
    static saveUser(userObj) {
        return userRepository.saveUser(userObj).then((res) => {
            return res;
        });
    }

    static findUser() {
        return userRepository.findUser("").then((res) => {
            return res;
        }).catch((err)=> {throw err});
    }
}