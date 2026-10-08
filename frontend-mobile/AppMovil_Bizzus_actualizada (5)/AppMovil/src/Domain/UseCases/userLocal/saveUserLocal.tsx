import { UserLocalRepositoryImp } from "../../../Data/respositories/UserLocalRepository";
import { User } from "../../entities/User";

const { save } = new UserLocalRepositoryImp();

export const SaveUserLocalUseCase = async(user: User) =>{
    return await save(user);
}