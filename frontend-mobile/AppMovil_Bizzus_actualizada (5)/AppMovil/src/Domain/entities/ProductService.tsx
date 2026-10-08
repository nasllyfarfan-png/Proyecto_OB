import { Product } from './Product';

const API_URL = 'http://10.1.195.162:3000';

export const createProduct = async (
    product: Product
): Promise<Product> => {

    const response = await fetch(
        `${API_URL}/api/products/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: product.name,
                price: product.price,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || 'Error al crear el producto'
        );
    }

    return data.data;
};