import { ExampleApi } from "../../../src/client/api";
import { Product} from "../../../src/common/types";
import {AxiosResponse} from "axios";

export class MockProduct extends ExampleApi {
    products: Product[] = [
        {
            id: 0,
            name: "Название товара 0",
            price: 4000,
            description: "Подробное описание товара 0",
            material: "ткань",
            color: "голубой",
        },
        {
            id: 1,
            name: "Название товара 1",
            price: 1000,
            description: "Подробное описание товара 1",
            material: "дерево",
            color: "красный",
        },
        {
            id: 2,
            name: "Название товара 2",
            price: 2000,
            description: "Подробное описание товара 2",
            material: "металл",
            color: "серый",
        }
    ]

    async getAllProducts() {
        return { data: this.products } as AxiosResponse<Product[]>;
    }

    async getProductById(id: number) {
        let [product] = this.products.filter(p => p.id === id);
        return { data: product } as AxiosResponse<Product>;
    }
}