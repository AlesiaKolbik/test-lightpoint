import {FIND_PRODUCT, CLEAN_PRODUCT_FILTER} from "../actions/actionTypes";

const initialState = '';

export function filterProduct(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case FIND_PRODUCT:
            return action.payload;
        case CLEAN_PRODUCT_FILTER:
            return '';
        default:
            return state;
    }
}