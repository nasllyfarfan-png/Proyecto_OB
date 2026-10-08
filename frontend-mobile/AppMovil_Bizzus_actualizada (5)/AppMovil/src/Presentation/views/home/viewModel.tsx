
import React, { useEffect, useState } from 'react';
import { LoginAuthUseCase } from '../../../Domain/UseCases/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/UseCases/userLocal/saveUserLocal';
import { GetUserLocalUserCase } from '../../../Domain/UseCases/userLocal/GetUserLocal';

const HomeviewModel = () => {

    const [errorMessage, setErrorMessage] = useState('');

    const [user, setUser] = useState<any>(null);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        getUserSession();
    }, []);

    const getUserSession = async () => {
        const user = await GetUserLocalUserCase();

        console.log(
            'Usuario Sesion: ' + JSON.stringify(user)
        );

        if (user) {
            setUser(user);
        }
    };

    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        });
    };

    const login = async () => {

        if (isValidForm()) {

            const response = await LoginAuthUseCase(
                values.email,
                values.password
            );

            console.log(
                'Respuesta: ' + JSON.stringify(response)
            );

            if (!response.success) {

                setErrorMessage(response.message);

            } else {

                await SaveUserLocalUseCase(response.data);

                setUser(response.data);
            }
        }
    };

    const isValidForm = () => {

        if (values.email === '') {
            setErrorMessage('El email es requerido');
            return false;
        }

        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }

        return true;
    };

    return {
        ...values,
        onChange,
        errorMessage,
        user,
        login
    };
};

export default HomeviewModel;

