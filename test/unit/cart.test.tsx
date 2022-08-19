import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react';
import {addToCart, clearCart} from "../../src/client/store";
import {Cart} from "../../src/client/pages/Cart";
import userEvent from "@testing-library/user-event";
import {Application} from "../../src/client/Application";
import {getApplication, getStore} from "./utils/getApplication";

describe('Корзина', () => {
    const {api, store} = getStore();

    const addProductToCard = async (id: number) => {
        let product = await api.getProductById(id);
        store.dispatch(addToCart(product.data))
    }

    afterEach(() => {
        store.dispatch(clearCart());
    })

    it('В корзине должна отображаться таблица с добавленными в нее товарами', async () => {
        const {container} = render(getApplication(<Cart/>));
        await addProductToCard(0);

        expect(container.querySelector('.Cart-Table')).toBeInTheDocument();
    })

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров', async () => {
        render(getApplication(<Cart/>));
        expect(screen.getByRole('link', {name: /catalog/i})).toHaveAttribute('href', '/hw/store/catalog')
    })

    it('Для каждого товара должно отображаться название', async () => {
        render(getApplication(<Cart/>));
        await addProductToCard(0);
        await addProductToCard(1);

        let cartState = store.getState().cart;

        for (let item of Object.keys(cartState)) {
            const [currentItem] = screen.getAllByTestId(item)
            expect(currentItem.querySelector('.Cart-Name')).toHaveTextContent(cartState[item].name);
        }
    })

    it('Для каждого товара должна отображаться цена', async () => {
        render(getApplication(<Cart/>));
        await addProductToCard(0);
        await addProductToCard(1);

        let cartState = store.getState().cart;

        for (let item of Object.keys(cartState)) {
            const [currentItem] = screen.getAllByTestId(item)
            expect(currentItem.querySelector('.Cart-Price')).toHaveTextContent(`$${cartState[item].price}`);
        }
    })

    it('Для каждого товара должны отображаться количество и стоимость', async () => {
        render(getApplication(<Cart/>));
        await addProductToCard(0);
        await addProductToCard(1);

        let cartState = store.getState().cart;

        for (let item of Object.keys(cartState)) {
            const [currentItem] = screen.getAllByTestId(item)
            expect(currentItem.querySelector('.Cart-Count')).toHaveTextContent(`${cartState[item].count}`);
            expect(currentItem.querySelector('.Cart-Total')).toHaveTextContent(`$${cartState[item].price * cartState[item].count}`);
        }
    })

    it('Должна отображаться общая сумма заказа', async () => {
        const {container} = render(getApplication(<Cart/>));
        await addProductToCard(0);
        await addProductToCard(1);

        let cartState = store.getState().cart;
        let orderPrice: number = 0;

        for (let item of Object.keys(cartState))
            orderPrice += cartState[item].price * cartState[item].count;

        expect(container.querySelector('.Cart-OrderPrice')).toHaveTextContent(`${orderPrice}`);
    })

    it('В корзине должна быть кнопка "очистить корзину"', async () => {
        render(getApplication(<Cart/>));
        await addProductToCard(0);

        expect(screen.getByRole('button', {name: /clear shopping cart/i})).toBeInTheDocument();
    })

    it('По нажатию на кнопку "очистить корзину" все товары должны удаляться', async () => {
        render(getApplication(<Cart/>));
        await addProductToCard(0);

        await userEvent.click(screen.getByRole('button', {name: /clear shopping cart/i}));
        expect(Object.entries(store.getState().cart).length === 0).toBeTruthy();
    })

    it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
        render(getApplication(<Application/>));

        Promise.all([addProductToCard(0), addProductToCard(0), addProductToCard(0), addProductToCard(1)]).then(() => {
            let count: number = Object.keys(store.getState().cart).length;
            expect(count).toBe(2)
            expect(screen.getByRole('link', {name: /cart/i})).toHaveTextContent(`${count}`);
        })
    })
});