import { useEffect, useState } from 'react';
import { GetUserLocalUserCase } from '../../Domain/UseCases/userLocal/GetUserLocal';
import { User } from '../../Domain/entities/User';

export const useUserLocal = () => {
    const [user, setUser] = useState<User | null>(null);

    const getUserSession = async () => {
        const user = await GetUserLocalUserCase();
        setUser(user);
    };

    useEffect(() => {
        getUserSession();
    }, []);

    return {
        user,
        getUserSession,
    };
};
