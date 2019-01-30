import {ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from './actionTypes'

export function addProduct(shopId, obj) {
    return {
        type: ADD_PRODUCT,
        payload:obj,
        shopId:shopId
    }
}

export function deleteProduct(shopId, productId) {
    return {
        type: DELETE_PRODUCT,
        shopId:shopId,
        productId:productId
    }
}

export function updateProduct(shopId, obj) {
    return {
        type: UPDATE_PRODUCT,
        shopId:shopId,
        payload: obj
    }
}
