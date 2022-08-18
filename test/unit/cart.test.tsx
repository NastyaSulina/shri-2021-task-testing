// import React from 'react'
// import '@testing-library/jest-dom'
// import {render, screen, within} from '@testing-library/react';
// import {CartApi } from "../../src/client/api";
// import {addToCart, clearCart, initStore} from "../../src/client/store";
// import {BrowserRouter} from "react-router-dom";
// import {Provider} from "react-redux";
// import {MockProduct} from "./mockProduct/mockProduct";
// import {Store} from "redux";
// import {Cart} from "../../src/client/pages/Cart";
// import events from "@testing-library/user-event";
//
// const basename = '/hw/store';
//
// describe('Корзина', () => {
//     let api: MockProduct;
//     let cart: CartApi;
//     let store: Store;
//     let application: JSX.Element;
//
//     const addProductToCard = async (id: number) => {
//         let product = await api.getProductById(id);
//         store.dispatch(addToCart(product.data))
//     }
//
//     beforeAll(() => {
//         api = new MockProduct(basename);
//         cart = new CartApi();
//         store = initStore(api, cart);
//         application = (
//             <BrowserRouter basename={basename}>
//                 <Provider store={store}>
//                     <Cart/>
//                 </Provider>
//             </BrowserRouter>
//         );
//     })
//
//     afterEach(() => {
//         store.dispatch(clearCart());
//     })
//
//     it('В корзине должна отображаться таблица с добавленными в нее товарами', async () => {
//         const { container } = render(application);
//         await addProductToCard(0);
//
//         expect(container.querySelector('.Cart-Table')).toBeInTheDocument();
//     })
//
//     it('Если корзина пустая, должна отображаться ссылка на каталог товаров', async () => {
//         const { container } = render(application);
//         const cartInner = container.querySelector('.Cart')
//         expect(cartInner.getElementsByTagName('a')[0]).toHaveAttribute('href', '/hw/store/catalog')
//     })
//
//     it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async () => {
//         const { container } = render(application);
//         await addProductToCard(0);
//         await addProductToCard(1);
//
//         let cartState = store.getState().cart;
//         let orderPrice: number = 0;
//
//         for (let item of Object.keys(cartState)) {
//             const [ currentItem ] = screen.getAllByTestId(item)
//             expect(currentItem.querySelector('.Cart-Name')).toHaveTextContent(cartState[item].name);
//             expect(currentItem.querySelector('.Cart-Price')).toHaveTextContent(`$${cartState[item].price}`);
//             expect(currentItem.querySelector('.Cart-Count')).toHaveTextContent(`${cartState[item].count}`);
//             expect(currentItem.querySelector('.Cart-Total')).toHaveTextContent(`$${cartState[item].price * cartState[item].count}`);
//             orderPrice += cartState[item].price * cartState[item].count;
//         }
//         expect(container.querySelector('.Cart-OrderPrice')).toHaveTextContent(`${orderPrice}`);
//     })
//     // Это работает?
//     it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
//         const { container } = render(application);
//         await addProductToCard(0);
//
//         expect(container.querySelector('.Cart-Clear')).toBeInTheDocument();
//         events.click(container.querySelector('.Cart')).then(() => {
//             expect(store.getState().cart).toBeFalsy()
//         })
//     })
// });