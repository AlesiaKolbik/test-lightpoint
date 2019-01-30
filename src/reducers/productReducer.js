import {ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from '../actions/actionTypes';

const initialState = {};

export function productReducer(state, action) {
    let updateList;
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case ADD_PRODUCT:
            if (!state[action.shopId]) {
                state[action.shopId] = [];
            }
            return {
                ...state,
                [action.shopId]: [...state[action.shopId],
                    action.payload]
            };
        case DELETE_PRODUCT:
            updateList = state[action.shopId].filter(p => {
                return p.id !== action.productId
            });
            return {
                ...state,
                [action.shopId]: updateList
            };
        case UPDATE_PRODUCT:
            updateList = state[action.shopId].map(p => {
                if(p.id === action.payload.id){
                    return action.payload
                }
                return p;
            });
            return {
                ...state,
                [action.shopId]: updateList
            };
        default:
            return state;
    }
}