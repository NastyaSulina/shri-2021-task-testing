import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react';
import {CartApi} from "../../src/client/api";
import {addToCart, clearCart, initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {MockProduct} from "./mockProduct/mockProduct";
import {Store} from "redux";
import {Cart} from "../../src/client/pages/Cart";
import userEvent from "@testing-library/user-event";
import {Application} from "../../src/client/Application";

const basename = '/hw/store';

describe('Корзина',  () => {
    let api: MockProduct;
    let cart: CartApi;
    let store: Store;
    let cartApplication: JSX.Element;

    const addProductToCard = async (id: number) => {
        let product = await api.getProductById(id);
        store.dispatch(addToCart(product.data))
    }

    beforeAll(() => {
        api = new MockProduct(basename);
        cart = new CartApi();
        store = initStore(api, cart);
        cartApplication = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        );
    })

    afterEach(() => {
        store.dispatch(clearCart());
    })

    it('В корзине должна отображаться таблица с добавленными в нее товарами', async () => {
        const {container} = render(cartApplication);
        await addProductToCard(0);

        expect(container.querySelector('.Cart-Table')).toBeInTheDocument();
        expect(screen.getAllByTestId(0)[0]).toBeInTheDocument();
    })

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров', async () => {
        render(cartApplication);
        expect(screen.getByRole('link', {name: /catalog/i})).toHaveAttribute('href', '/hw/store/catalog')
    })

    it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async () => {
        const {container} = render(cartApplication);
        await addProductToCard(0);
        await addProductToCard(1);

        let cartState = store.getState().cart;
        let orderPrice: number = 0;

        for (let item of Object.keys(cartState)) {
            const [currentItem] = screen.getAllByTestId(item)
            expect(currentItem.querySelector('.Cart-Name')).toHaveTextContent(cartState[item].name);
            expect(currentItem.querySelector('.Cart-Price')).toHaveTextContent(`$${cartState[item].price}`);
            expect(currentItem.querySelector('.Cart-Count')).toHaveTextContent(`${cartState[item].count}`);
            expect(currentItem.querySelector('.Cart-Total')).toHaveTextContent(`$${cartState[item].price * cartState[item].count}`);
            orderPrice += cartState[item].price * cartState[item].count;
        }
        expect(container.querySelector('.Cart-OrderPrice')).toHaveTextContent(`${orderPrice}`);
    })

    it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
        render(cartApplication);
        await addProductToCard(0);
        await addProductToCard(1);

        expect(screen.getByRole('button', {name: /clear shopping cart/i})).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', {name: /clear shopping cart/i}));
        expect(Object.entries(store.getState().cart).length === 0).toBeTruthy();
    })

    it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
        let application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </BrowserRouter>
        );
        render(application);

        Promise.all([ addProductToCard(0),  addProductToCard(0), addProductToCard(0), addProductToCard(1)]).then(() => {
            let count: number = Object.keys(store.getState().cart).length;
            expect(count).toBe(2)
            expect(screen.getByRole('link', {name: /cart/i})).toHaveTextContent(`${count}`);
        })
        store.dispatch(clearCart());
    })
});