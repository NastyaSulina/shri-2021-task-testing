import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react';
import {CartApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {MockProduct} from "./mockProduct/mockProduct";
import {Store} from "redux";
import {Application} from "../../src/client/Application";
import {createMemoryHistory} from 'history'

const basename = '/hw/store';

describe('Страницы', () => {
    let api: MockProduct;
    let cart: CartApi;
    let store: Store;

    beforeAll(() => {
        api = new MockProduct(basename);
        cart = new CartApi();
        store = initStore(api, cart);
    })

    const createApplication = (route: string) => {
        const history = createMemoryHistory({
            initialEntries: [`${route}`],
            initialIndex: 0
        });

        return (
            <Router history={history}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </Router>
        )
    }

    it('В меню есть ссылки на страницы: главная, каталог, условия доставки, контакты', () => {
        render(createApplication("/"))

        expect(screen.getByRole('link', {name: /example store/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /catalog/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /contacts/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /delivery/i})).toBeInTheDocument();
    })

    it('В магазине должна быть страница "главная"', () => {
        const {container} = render(createApplication("/"));
        // screen.logTestingPlaygroundURL();
        expect(container.querySelector('.Home')).toBeInTheDocument();
    })
    it('В магазине должна быть страница "каталог"', () => {
        const {container} = render(createApplication("/catalog"));

        expect(container.querySelector('.Catalog')).toBeInTheDocument();
    })
    it('В магазине должна быть страница "условия доставки"', () => {
        const {container} = render(createApplication("/delivery"));

        expect(container.querySelector('.Delivery')).toBeInTheDocument();
    })
    it('В магазине должна быть страница "контакты"', () => {
        const {container} = render(createApplication("/contacts"));

        expect(container.querySelector('.Contacts')).toBeInTheDocument();
    })
});