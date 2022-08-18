import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react';
import {CartApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Catalog} from "../../src/client/pages/Catalog";
import {MockProduct} from "./mockProduct/mockProduct";
import {Store} from "redux";
import {ProductDetails} from "../../src/client/components/ProductDetails";

const basename = '/hw/store';

describe('Каталог', () => {
    let api: MockProduct;
    let cart: CartApi;
    let store: Store;

    beforeAll(() => {
        api = new MockProduct(basename);
        cart = new CartApi();
        store = initStore(api, cart);
    })

    it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => {
        const product = await api.getProductById(0);
        const productDetails = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <ProductDetails product={product.data}/>
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(productDetails);

        expect(container.querySelector('.ProductDetails-Name')).toHaveTextContent(product.data.name);
        expect(container.querySelector('.ProductDetails-Description')).toHaveTextContent(product.data.description);
        expect(container.querySelector('.ProductDetails-Price')).toHaveTextContent(`$${product.data.price}`);
        expect(container.querySelector('.ProductDetails-Color')).toHaveTextContent(product.data.color);
        expect(container.querySelector('.ProductDetails-Material')).toHaveTextContent(product.data.material);
        expect(container.querySelector('.ProductDetails-AddToCart')).toBeInTheDocument();
    })

    // it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    //     catalog = (
    //         <BrowserRouter basename={basename}>
    //             <Provider store={store}>
    //                 <Catalog/>
    //             </Provider>
    //         </BrowserRouter>
    //     );
    //     render(catalog);
    //     const products = await api.getAllProducts();
    //
    //     await screen.findAllByTestId(0)
    //
    //     for (const product of products.data) {
    //         expect(screen.queryByTestId(`${product.id}`)).toBeInTheDocument();
    //     }
    // })
});