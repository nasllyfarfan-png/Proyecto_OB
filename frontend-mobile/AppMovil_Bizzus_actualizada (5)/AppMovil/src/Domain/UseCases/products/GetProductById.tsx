import { ProductRepositoryImpl } from "../../../Data/respositories/ProductRepositoryImpl";

const { getById } = new ProductRepositoryImpl();

export const GetProductByIdUseCase = async (id: string) => {
    return await getById(id);
};
