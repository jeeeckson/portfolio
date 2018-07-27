import {goBack, push} from 'react-router-redux';
import {orderService} from '../services';

import * as types from '../types';

function orderRequestFailure(message) {
    return {
        type: types.ORDER_REQUEST_FAILURE,
        message
    };
}

function orderRequestSuccess(message) {
    return {
        type: types.ORDER_REQUEST_SUCCESS,
        message
    };
}

function beginOrderRequest() {
    return {type: types.ORDER_REQUEST};
}

export function requestOrders() {
    return (dispatch) => {
        dispatch(beginOrderRequest());

        return orderService().getOrders()
            .then((response) => {
                dispatch(orderRequestSuccess(response.data));
                // dispatch(goBack);
                // dispatch(push('/'));
            })
            .catch((err) => {
                dispatch(orderRequestFailure(err.message));
            });
    };
}

export function requestOrderById(id) {
    return (dispatch) => {
        dispatch(beginOrderRequest());

        return orderService().getOrderById(id)
            .then((response) => {
                dispatch(orderRequestSuccess(response.data));
                // dispatch(goBack);
                // dispatch(push('/'));
            })
            .catch((err) => {
                dispatch(orderRequestFailure(err.message));
            });
    };
}
