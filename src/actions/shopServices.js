import {ADD_SHOP, FIND_SHOP, UPDATE_SHOP, UPDATE_SHOPS_LIST} from './actionTypes';


export function addShop(obj) {
    return {
        type: ADD_SHOP,
        payload: obj
    }
}

export function updateShop(obj) {
    return {
        type: UPDATE_SHOP,
        payload: obj
    }
}

export function findShop(id) {
    return {
        type: FIND_SHOP,
        payload: id
    }
}

export function updateShopsList(list) {
    return {
        type: UPDATE_SHOPS_LIST,
        payload: list
    }
}


