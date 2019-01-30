import {UPDATE_SHOP, UPDATE_SHOPS_LIST, FIND_SHOP} from './actionTypes';


export function addShop(obj) {
    return {
        type: UPDATE_SHOPS_LIST,
        payload:obj
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

