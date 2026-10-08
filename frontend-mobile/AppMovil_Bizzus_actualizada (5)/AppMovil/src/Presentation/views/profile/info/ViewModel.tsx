import AsyncStorage from '@react-native-async-storage/async-storage';

const useViewModel = () => {

    const removeSession = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('id');

            console.log('Sesión cerrada correctamente');

        } catch (error) {
            console.log(
                'Error al cerrar sesión:',
                error
            );
        }
    };

    return {
        removeSession,
    };
};

export default useViewModel;