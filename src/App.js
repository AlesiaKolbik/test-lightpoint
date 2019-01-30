import React, {Component} from 'react';
import {Route, Router, Switch} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import persistReducer from './reducers';
import {persistStore} from 'redux-persist';

import { PersistGate } from 'redux-persist/integration/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShopsList from "./components/ShopsList";
import ProductsList from "./components/ProductsList";
import {Home} from "./components/Home";


let store = createStore(persistReducer);
let persistor = persistStore(store);

const history = createBrowserHistory();

//let store = createStore(combinedReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/shops" component={Shops}/>
                            <Route path="*" component={NoMatch}/>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        );
    }
}

const Shops = () => (
    <Switch>
        <Route exact path="/shops" component={ShopsList}/>
        <Route path="/shops/:id" component={ProductsList}/>
    </Switch>
);

const NoMatch = () => {
    return (
        <div className='container text-center'>
            <div className='m-5'>
                <h3>404 page not found</h3>
                <p>We are sorry but the page you are looking for does not exist.</p>
            </div>
        </div>
    )
};

export default App;
