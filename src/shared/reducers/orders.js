import {combineReducers} from 'redux';
import * as types from '../types';

const orders = (state = {}, action) => {
    switch (action.type) {
        case types.ORDER_REQUEST:
            return state;
        case types.ORDER_REQUEST_SUCCESS:
            return Object.assign(state, action.data);
        case types.ORDER_REQUEST_FAILURE:
            return action.error;
        default:
            return state;
    }
};

const orderReducer = combineReducers({
    orders
});

export default orderReducer;
