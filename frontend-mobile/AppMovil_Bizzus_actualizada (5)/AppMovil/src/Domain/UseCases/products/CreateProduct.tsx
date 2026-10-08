import { ProductRepositoryImpl } from "../../../Data/respositories/ProductRepositoryImpl";
import { Product } from "../../entities/Product";

const { create } = new ProductRepositoryImpl();

export const CreateProductUseCase = async (product: Product) => {
    return await create(product);
};
