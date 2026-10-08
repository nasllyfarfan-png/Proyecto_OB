import { useState } from 'react';
import { createProduct } from "../../../Domain/entities/ProductService";
import { Product } from '../../../Domain/entities/Product';

const useViewModel = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onChange = (property: string, value: string) => {
        if (property === 'name') {
            setName(value);
        }

        if (property === 'price') {
            setPrice(value);
        }

        // Limpiamos el error cuando el usuario empieza a corregir
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    const saveProduct = async () => {
    setErrorMessage('');

    if (!name.trim()) {
        setErrorMessage('Ingrese el nombre del producto');
        return;
    }

    if (!price.trim() || isNaN(Number(price))) {
        setErrorMessage('Ingrese un precio válido');
        return;
    }

    const product: Product = {
    name: name.trim(),
    description: "",
    price: Number(price),
    category: "",
    image: '',
    stock: 0,
    sku: '',
    isActive: true,
    discount: 0,
};

    try {
        setLoading(true);

        const response = await createProduct(product);

        console.log('Producto creado:', response);

        setName('');
        setPrice('');

        return response;

    } catch (error: unknown) {
        console.log('Error creando producto:', error);

        if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('Error al crear el producto');
        }

    } finally {
        setLoading(false);
    }
};

    return {
        name,
        price,
        errorMessage,
        loading,
        onChange,
        saveProduct,
    };
};

export default useViewModel;