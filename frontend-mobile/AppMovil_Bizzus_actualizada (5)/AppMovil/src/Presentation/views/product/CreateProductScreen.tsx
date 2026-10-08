import React, { useEffect } from 'react';

import {
    View,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';

import useViewModel from './CreateProductViewModel';

import styles from './Styles';

export const CreateProductScreen = () => {

    const {
        name,
        price,
        errorMessage,
        loading,
        onChange,
        saveProduct,
    } = useViewModel();

    useEffect(() => {

        if (errorMessage !== '') {
            ToastAndroid.show(
                errorMessage,
                ToastAndroid.LONG
            );
        }

    }, [errorMessage]);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Añadir Producto
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                value={name}
                onChangeText={(value) =>
                    onChange('name', value)
                }
            />

            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={price}
                keyboardType="numeric"
                onChangeText={(value) =>
                    onChange('price', value)
                }
            />

            <TouchableOpacity
                style={styles.formAAD}
                onPress={saveProduct}
                disabled={loading}
            >
                <Text style={styles.formAADText}>
                    {loading
                        ? 'Guardando...'
                        : 'Añadir Producto'}
                </Text>
            </TouchableOpacity>

        </View>
    );
};
