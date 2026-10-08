import React, { useState } from 'react';
import { RegisterAuthUseCase } from '../../../Domain/UseCases/auth/RegisterAuth';

const RegisterViewModel = () => {

    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        });
    };

    const register = async () => {
        try {
            const result = await RegisterAuthUseCase(values);

            console.log('result: ' + JSON.stringify(result));

            return result;

        } catch (error) {
            console.log('error: ' + error);

            throw error;
        }
    };

    return {
        ...values,
        onChange,
        register
    };
};

export default RegisterViewModel;
