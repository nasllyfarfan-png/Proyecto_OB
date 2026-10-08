import { ProductRepositoryImpl } from "../../../Data/respositories/ProductRepositoryImpl";

const { getAll } = new ProductRepositoryImpl();

export const GetProductsUseCase = async () => {
    return await getAll();
};
