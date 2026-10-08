import { Product } from "../../Domain/entities/Product";
import { ProductRepository } from "../../Domain/repositories/ProductRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { AxiosError } from "axios";

/**
 * ProductRepositoryImpl.ts
 * -----------------------------------------------
 * Implementación concreta de ProductRepository (patrón Repository,
 * típico de Clean Architecture). Se encarga de comunicarse con
 * el backend para las operaciones CRUD de productos.
 *
 * ApiDelivery ya trae configurada la URL base (ej. http://.../api),
 * por eso aquí solo se usan rutas relativas como '/products'.
 */
export class ProductRepositoryImpl implements ProductRepository {

    /**
     * GET ALL
     * -----------------------------------------------
     * Obtiene el listado completo de productos.
     */
    async getAll(): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.get<ResponseApiDelivery>(
                '/products'
            );

            return response.data;

        } catch (error) {
            const e = error as AxiosError;

            console.log(
                'error ' + JSON.stringify(e.response?.data)
            );

            const apiError: ResponseApiDelivery = JSON.parse(
                JSON.stringify(e.response?.data)
            );

            return apiError;
        }
    }

    /**
     * GET BY ID
     * -----------------------------------------------
     * Obtiene el detalle de un producto por su id.
     */
    async getById(id: string): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.get<ResponseApiDelivery>(
                `/products/${id}`
            );

            return response.data;

        } catch (error) {
            const e = error as AxiosError;

            console.log(
                'error ' + JSON.stringify(e.response?.data)
            );

            const apiError: ResponseApiDelivery = JSON.parse(
                JSON.stringify(e.response?.data)
            );

            return apiError;
        }
    }

    /**
     * CREATE
     * -----------------------------------------------
     * Crea un nuevo producto en el backend.
     */
    async create(product: Product): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>(
                '/products',
                product
            );

            return response.data;

        } catch (error) {
            const e = error as AxiosError;

            console.log(
                'error ' + JSON.stringify(e.response?.data)
            );

            const apiError: ResponseApiDelivery = JSON.parse(
                JSON.stringify(e.response?.data)
            );

            return apiError;
        }
    }

    /**
     * UPDATE
     * -----------------------------------------------
     * Actualiza un producto existente por su id.
     */
    async update(id: string, product: Product): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>(
                `/products/${id}`,
                product
            );

            return response.data;

        } catch (error) {
            const e = error as AxiosError;

            console.log(
                'error ' + JSON.stringify(e.response?.data)
            );

            const apiError: ResponseApiDelivery = JSON.parse(
                JSON.stringify(e.response?.data)
            );

            return apiError;
        }
    }

    /**
     * DELETE
     * -----------------------------------------------
     * Elimina un producto por su id.
     */
    async remove(id: string): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.delete<ResponseApiDelivery>(
                `/products/${id}`
            );

            return response.data;

        } catch (error) {
            const e = error as AxiosError;

            console.log(
                'error ' + JSON.stringify(e.response?.data)
            );

            const apiError: ResponseApiDelivery = JSON.parse(
                JSON.stringify(e.response?.data)
            );

            return apiError;
        }
    }
}
