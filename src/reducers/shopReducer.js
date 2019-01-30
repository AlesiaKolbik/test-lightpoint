import {FIND_SHOP, UPDATE_SHOP, UPDATE_SHOPS_LIST} from '../actions/actionTypes';


const initialState = {
    list: [],
    shopIsExists: false
};

export function shopReducer(state, action) {
    let updateList, shop, shopIsExists;

    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case UPDATE_SHOPS_LIST:
            return {
                ...state,
                list: [...state.list,
                    action.payload]
            };
        case UPDATE_SHOP:
            updateList = state.list.map(s => {
                if (s.id === action.payload.id) {
                    return action.payload
                }
                return s;
            });
            return {
                ...state,
                list: updateList
            };
        case FIND_SHOP:
            shop = state.list.find(s => {
                return (s.id === action.payload)
            });
            shopIsExists = !!shop;
            return {
                ...state,
                shopIsExists: shopIsExists
            };
        default:
            return state;
    }
}

