import {ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, FIND_PRODUCT, CLEAN_PRODUCT_FILTER} from './actionTypes'

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

export function findProduct(name) {
    return {
        type: FIND_PRODUCT,
        payload: name
    }
}

export function cleanProductFilter() {
    return {
        type: CLEAN_PRODUCT_FILTER
    }
}
