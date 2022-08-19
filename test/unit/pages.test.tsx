import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react';
import {Application} from "../../src/client/Application";
import {getApplicationWithHistory} from "./utils/getApplication"

describe('Страницы', () => {

    it('В меню есть ссылка на страницу "Главная"', () => {
        render(getApplicationWithHistory(<Application/>, "/"))
        expect(screen.getByRole('link', {name: /example store/i})).toBeInTheDocument();
    })

    it('В меню есть ссылки на страницу "Каталог"', () => {
        render(getApplicationWithHistory(<Application/>, "/"))
        expect(screen.getByRole('link', {name: /catalog/i})).toBeInTheDocument();
    })

    it('В меню есть ссылки на страницу "Условия доставки"', () => {
        render(getApplicationWithHistory(<Application/>, "/"))
        expect(screen.getByRole('link', {name: /delivery/i})).toBeInTheDocument();
    })

    it('В меню есть ссылки на страницу "Контакты"', () => {
        render(getApplicationWithHistory(<Application/>, "/"))
        expect(screen.getByRole('link', {name: /contacts/i})).toBeInTheDocument();
    })

    it('В магазине должна быть страница "главная"', () => {
        const {container} = render(getApplicationWithHistory(<Application/>, "/"))
        expect(container.querySelector('.Home')).toBeInTheDocument();
    })

    it('В магазине должна быть страница "каталог"', () => {
        const {container} = render(getApplicationWithHistory(<Application/>, "/catalog"))
        expect(container.querySelector('.Catalog')).toBeInTheDocument();
    })

    it('В магазине должна быть страница "условия доставки"', () => {
        const {container} = render(getApplicationWithHistory(<Application/>, "/delivery"))
        expect(container.querySelector('.Delivery')).toBeInTheDocument();
    })

    it('В магазине должна быть страница "контакты"', () => {
        const {container} = render(getApplicationWithHistory(<Application/>, "/contacts"))
        expect(container.querySelector('.Contacts')).toBeInTheDocument();
    })
});