import {createMemoryHistory} from "history";
import {BrowserRouter, Router} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import {MockProduct} from "./mockProduct";
import {CartApi} from "../../../src/client/api";
import {initStore} from "../../../src/client/store";
import {Store} from "redux";

const basename = '/hw/store';


let api: MockProduct = new MockProduct(basename);
let cart: CartApi = new CartApi();
let store: Store = initStore(api, cart);

export const getStore = () => {
    return {api, store}
}


export const getApplication = (component: JSX.Element) => {
    const {store} = getStore();

    return (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                {component}
            </Provider>
        </BrowserRouter>
    )
}

export const getApplicationWithHistory = (component: JSX.Element, route: string) => {
    const {store} = getStore();

    const history = createMemoryHistory({
        initialEntries: [`${route}`],
        initialIndex: 0
    });

    return (
        <Router history={history}>
            <Provider store={store}>
                {component}
            </Provider>
        </Router>
    )
}