import { ProductRepositoryImpl } from "../../../Data/respositories/ProductRepositoryImpl";

const { remove } = new ProductRepositoryImpl();

export const DeleteProductUseCase = async (id: string) => {
    return await remove(id);
};
