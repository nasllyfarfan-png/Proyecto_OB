import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Product } from "../entities/Product";

export interface ProductRepository {
    getAll(): Promise<ResponseApiDelivery>;
    getById(id: string): Promise<ResponseApiDelivery>;
    create(product: Product): Promise<ResponseApiDelivery>;
    update(id: string, product: Product): Promise<ResponseApiDelivery>;
    remove(id: string): Promise<ResponseApiDelivery>;
}
