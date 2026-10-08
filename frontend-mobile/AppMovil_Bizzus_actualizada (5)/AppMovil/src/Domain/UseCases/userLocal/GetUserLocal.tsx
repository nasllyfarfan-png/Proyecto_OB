import { UserLocalRepositoryImp } from "../../../Data/respositories/UserLocalRepository";

const { getUser } = new UserLocalRepositoryImp();

export const GetUserLocalUserCase = async () => {
    return await getUser();
}