import { useEffect, useState } from 'react';
import { Product } from '../../../../Domain/entities/Product';
import { GetProductsUseCase } from '../../../../Domain/UseCases/products/GetProducts';
import { DeleteProductUseCase } from '../../../../Domain/UseCases/products/DeleteProduct';

const ProductListViewModel = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);

        const response = await GetProductsUseCase();

        if (!response.success) {
            setErrorMessage(response.message);
            setProducts([]);
        } else {
            setProducts(response.data ?? []);
        }

        setLoading(false);
    };

    const deleteProduct = async (id: string) => {
        const response = await DeleteProductUseCase(id);

        if (!response.success) {
            setErrorMessage(response.message);
        } else {
            setProducts(current => current.filter(product => product.id !== id));
        }
    };

    return {
        products,
        loading,
        errorMessage,
        getProducts,
        deleteProduct,
    };
};

export default ProductListViewModel;
