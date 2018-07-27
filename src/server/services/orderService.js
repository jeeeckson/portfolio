

export class orderService {

    static findOrders() {
        return axios.get().findUser("").then((res) => {
            return res;
        }).catch((err) => {
            throw err
        });
    }

    static findOrderById() {
        return userRepository.findUser("").then(res => res).catch((err) => {
            throw err
        });
    }
}
