import * as addressRepository from "../repositories/userRepository";

export class addressService {

    static saveAddress(addressObj) {
        return addressRepository.saveAddress(addressObj).then((res) => {
            return res;
        });
    }

    static findAddressByUser(userName) {
        return addressRepository.findAddressByUser(userName).then((res) => {
            return res;
        });
    }
}