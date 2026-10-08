import { ProductRepositoryImpl } from "../../../Data/respositories/ProductRepositoryImpl";
import { Product } from "../../entities/Product";

const { update } = new ProductRepositoryImpl();

export const UpdateProductUseCase = async (id: string, product: Product) => {
    return await update(id, product);
};
