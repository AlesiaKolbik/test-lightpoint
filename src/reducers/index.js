import {combineReducers} from 'redux';
import {shopReducer} from './shopReducer';
import {productReducer} from './productReducer';
import { persistReducer } from 'redux-persist';
import storageSession from "redux-persist/es/storage/session";


const rootPersistConfig = {
    key: 'root',
    storage: storageSession,
};

const shopsPersistConfig = {
    key: 'shops',
    storage: storageSession,
    blacklist: ['somethingTemporary']
};
const productsPersistConfig = {
    key: 'products',
    storage: storageSession,
    blacklist: ['somethingTemporary']
};


const rootReducer = combineReducers({
    shops: persistReducer(shopsPersistConfig, shopReducer),
    products: persistReducer(productsPersistConfig, productReducer)
});

export default persistReducer(rootPersistConfig, rootReducer)
