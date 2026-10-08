import { useEffect, useState } from 'react';
import { GetProductByIdUseCase } from '../../../../Domain/UseCases/products/GetProductById';
import { CreateProductUseCase } from '../../../../Domain/UseCases/products/CreateProduct';
import { UpdateProductUseCase } from '../../../../Domain/UseCases/products/UpdateProduct';

const ProductFormViewModel = (productId?: string) => {

    const isEditing = !!productId;

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        sku: '',
        discount: '',
        image: '',
    });

    useEffect(() => {
        if (isEditing) {
            loadProduct();
        }
    }, []);

    const loadProduct = async () => {
        setLoading(true);

        const response = await GetProductByIdUseCase(productId as string);

        if (!response.success) {
            setErrorMessage(response.message);
        } else {
            const product = response.data;
            setValues({
                name: product.name ?? '',
                description: product.description ?? '',
                price: product.price !== undefined ? String(product.price) : '',
                category: product.category ?? '',
                stock: product.stock !== undefined ? String(product.stock) : '',
                sku: product.sku ?? '',
                discount: product.discount !== undefined ? String(product.discount) : '',
                image: product.image ?? '',
            });
        }

        setLoading(false);
    };

    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value,
        });
    };

    const isValidForm = () => {

        if (values.name === '') {
            setErrorMessage('El nombre es requerido');
            return false;
        }

        if (values.description === '') {
            setErrorMessage('La descripción es requerida');
            return false;
        }

        if (values.price === '' || isNaN(Number(values.price))) {
            setErrorMessage('El precio debe ser un número válido');
            return false;
        }

        if (values.category === '') {
            setErrorMessage('La categoría es requerida');
            return false;
        }

        if (values.stock !== '' && isNaN(Number(values.stock))) {
            setErrorMessage('El stock debe ser un número válido');
            return false;
        }

        if (values.discount !== '' && isNaN(Number(values.discount))) {
            setErrorMessage('El descuento debe ser un número válido');
            return false;
        }

        if (values.image === '') {
            setErrorMessage('La URL de la imagen es requerida');
            return false;
        }

        return true;
    };

    const save = async () => {

        if (!isValidForm()) {
            return;
        }

        setLoading(true);

        const product = {
            name: values.name,
            description: values.description,
            price: Number(values.price),
            category: values.category,
            stock: values.stock !== '' ? Number(values.stock) : 0,
            sku: values.sku,
            discount: values.discount !== '' ? Number(values.discount) : 0,
            image: values.image,
            isActive: true,
        };

        const response = isEditing
            ? await UpdateProductUseCase(productId as string, product)
            : await CreateProductUseCase(product);

        setLoading(false);

        if (!response.success) {
            setErrorMessage(response.message);
        } else {
            setSaved(true);
        }
    };

    return {
        ...values,
        isEditing,
        loading,
        errorMessage,
        saved,
        onChange,
        save,
    };
};

export default ProductFormViewModel;
