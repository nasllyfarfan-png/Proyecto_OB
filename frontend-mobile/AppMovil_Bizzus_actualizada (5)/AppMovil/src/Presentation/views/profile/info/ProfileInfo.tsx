import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Button } from 'react-native';
import { RootStackParamList } from '../../../../../App';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileInfoScreen'> {}

export const ProfileInfoScreen = ({ navigation }: Props) => {

    const { removeSession } = useViewModel();

    const cerrarSesion = async () => {
        await removeSession();
        navigation.replace('HomeScreen');
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >

            <Button
                onPress={cerrarSesion}
                title="Cerrar sesión"
            />

        </View>
    );
};

