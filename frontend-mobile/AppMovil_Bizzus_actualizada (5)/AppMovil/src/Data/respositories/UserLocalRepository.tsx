import { User } from "../../Domain/entities/User";
import { UserLocalRepository } from "../../Domain/repositories/UserLocalRepository";
import { LocalStorage } from "../sources/Local/LocalStorage";

/**
 * UserLocalRepositoryImp.ts
 * -----------------------------------------------
 * Implementación concreta de UserLocalRepository (patrón Repository).
 * Se encarga de persistir el usuario autenticado en el almacenamiento
 * local del dispositivo (ej. AsyncStorage), para mantener la sesión
 * activa entre reinicios de la app sin volver a llamar al backend.
 *
 * LocalStorage() es un hook/factory que expone los métodos
 * save, getItem y remove sobre el almacenamiento local.
 */
export class UserLocalRepositoryImp implements UserLocalRepository {

    /**
     * SAVE
     * -----------------------------------------------
     * Guarda el usuario en el almacenamiento local, serializado
     * como JSON string bajo la clave 'user'.
     *
     * @param user - Objeto usuario a persistir (típicamente el
     *               resultado de un login/register exitoso)
     */
    async save(user: User): Promise<void> {
        const { save } = LocalStorage();
        await save('user', JSON.stringify(user));
    }

    /**
     * GET USER
     * -----------------------------------------------
     * Recupera el usuario guardado localmente y lo deserializa
     * de vuelta a un objeto User.
     *
     * @returns El usuario almacenado, o lanza/produce un valor
     *          inválido si no hay ninguno guardado (ver nota abajo)
     */
    async getUser(): Promise<User> {
        const { getItem } = LocalStorage();
        const data = await getItem('user');
        const user: User = JSON.parse(data as any);
        return user;
    }

    /**
     * REMOVE
     * -----------------------------------------------
     * Elimina el usuario del almacenamiento local
     * (típicamente usado al hacer logout).
     */
    async remove(): Promise<void> {
        const { remove } = LocalStorage();
        await remove('user');
    }
}