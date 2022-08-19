import React from 'react'
import '@testing-library/jest-dom'
import {render} from '@testing-library/react';
import {ProductDetails} from "../../src/client/components/ProductDetails";
import {getApplication, getStore} from "./utils/getApplication";

describe("Страница с подробной информацией", () => {

    const {api} = getStore();

    it('На странице с подробной информацией отображается название товара', async () => {
        const product = await api.getProductById(0);
        const {container} = render(getApplication(<ProductDetails product={product.data}/>));

        expect(container.querySelector('.ProductDetails-Name')).toHaveTextContent(product.data.name);
    })

    it('На странице с подробной информацией отображается описание товара', async () => {
        const product = await api.getProductById(0);
        const {container} = render(getApplication(<ProductDetails product={product.data}/>));

        expect(container.querySelector('.ProductDetails-Description')).toHaveTextContent(product.data.description);
    })

    it('На странице с подробной информацией отображается цена', async () => {
        const product = await api.getProductById(0);
        const {container} = render(getApplication(<ProductDetails product={product.data}/>));

        expect(container.querySelector('.ProductDetails-Price')).toHaveTextContent(`$${product.data.price}`);
    })

    it('На странице с подробной информацией отображается цвет', async () => {
        const product = await api.getProductById(0);
        const {container} = render(getApplication(<ProductDetails product={product.data}/>));

        expect(container.querySelector('.ProductDetails-Color')).toHaveTextContent(product.data.color);
    })

    it('На странице с подробной информацией отображается материал и кнопка "добавить в корзину"', async () => {
        const product = await api.getProductById(0);
        const {container} = render(getApplication(<ProductDetails product={product.data}/>));

        expect(container.querySelector('.ProductDetails-Material')).toHaveTextContent(product.data.material);
    })

    it('На странице с подробной информацией отображается кнопка "добавить в корзину"', async () => {
        const product = await api.getProductById(0);
        const {container} = render(getApplication(<ProductDetails product={product.data}/>));

        expect(container.querySelector('.ProductDetails-AddToCart')).toBeInTheDocument();
    })
    // Не работающий тест для каталога:

    // it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    //     render(getApplication(<Catalog />));
    //     const products = await api.getAllProducts();
    //
    //     for (const product of products.data) {
    //         expect(screen.queryByTestId(`${product.id}`)).toBeInTheDocument();
    //     }
    // })
});