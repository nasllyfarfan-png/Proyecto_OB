import { UserLocalRepositoryImp } from '../../../Data/respositories/UserLocalRepository';
import { User } from '../../entities/User';

const { remove } = new UserLocalRepositoryImp();

export const RemoveUserLocalUseCase = async () => {
  return await remove();
}
