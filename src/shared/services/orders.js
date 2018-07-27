import {apiEndpoint} from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({baseURL: apiEndpoint});
    return {
        getOrders: () => client.request({
            method: 'GET',
            url: '/orders'
        }),
        getOrderById: (id) => client.request({
            method: 'GET',
            url: `/orders/${id}`,
        })
        /*updateUser: (data, id) => client.request({
            method: 'PATCH',
            url: `/users/${id}`,
            data,
        })*/
    };
};
