import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { AxiosError } from "axios";

/**
 * AuthRepositoryImpl.ts
 * -----------------------------------------------
 * Implementación concreta de AuthRepository (patrón Repository,
 * típico de Clean Architecture). Se encarga de comunicarse con
 * el backend para las operaciones de autenticación: registro y login.
 *
 * ApiDelivery ya trae configurada la URL base (ej. http://.../api),
 * por eso aquí solo se usan rutas relativas como '/users/login'.
 */
export class AuthRepositoryImpl implements AuthRepository {

    /**
     * REGISTER
     * -----------------------------------------------
     * Envía los datos de un nuevo usuario al backend para crear
     * su cuenta.
     *
     * @param user - Objeto con los datos del usuario a registrar
     * @returns La respuesta del API, o un objeto de error si falla
     */
    async register(user: User): Promise<ResponseApiDelivery> {
        try {
            // POST a /user/create con el objeto usuario como body
            const response = await ApiDelivery.post<ResponseApiDelivery>(
                '/user/create',
                user
            );

            return response.data;

        } catch (error) {
            // Axios tipa los errores de red/HTTP como AxiosError
            const e = error as AxiosError;

            // Log de depuración con el cuerpo de la respuesta de error
            console.log(
                'error ' + JSON.stringify(e.response?.data)
            );

            // Convierte la respuesta de error del backend al tipo
            // esperado ResponseApiDelivery
            const apiError: ResponseApiDelivery = JSON.parse(
                JSON.stringify(e.response?.data)
            );

            return apiError;
        }
    }

    /**
     * LOGIN
     * -----------------------------------------------
     * Envía email y password al backend para autenticar al usuario.
     *
     * @param email - Correo del usuario
     * @param password - Contraseña en texto plano (se compara con
     *                    el hash en el backend)
     * @returns La respuesta del API (incluye token si es exitoso),
     *          o un objeto de error si falla
     */
    async login(email: string, password: string): Promise<ResponseApiDelivery> {
        try {
            // POST a /users/login con las credenciales
            const response = await ApiDelivery.post<ResponseApiDelivery>(
                '/users/login',
                {
                    email: email,
                    password: password
                }
            );

            return Promise.resolve(response.data);

        } catch (error) {
            const e = error as AxiosError;

            console.log(
                'error ' + JSON.stringify(e.response?.data)
            );

            const apiError: ResponseApiDelivery = JSON.parse(
                JSON.stringify(e.response?.data)
            );

            return Promise.resolve(apiError);
        }
    }
}