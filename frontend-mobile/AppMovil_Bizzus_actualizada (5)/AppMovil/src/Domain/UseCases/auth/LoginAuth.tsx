import { AuthRepositoryImpl } from "../../../Data/respositories/AuthRepositry"


const {login} = new AuthRepositoryImpl();

export const  LoginAuthUseCase = async (email:string, password: string) => {
    return await login(email, password);
}