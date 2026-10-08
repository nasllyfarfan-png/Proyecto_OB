import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import RoundedButton from '../../../Presentation/components/RoundedButton';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import useViewModel from './viewModel';
import { CustomTextInput } from '../../components/CustomTextInput';
import styles from './Styles';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'>{};

export const HomeScreen = ({navigation, route}: Props) => {

  const {email, password, errorMessage, user, onChange, login } = useViewModel();

  // const navigation =
  // useNavigation <StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if(errorMessage !== '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined) {
      navigation.replace('MainTabs');
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/tienda.jpg')}
        style={styles.ImageBackground} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/Oficial Bizzus.jpg')}
          style={styles.logoImage} />
        <Text style={styles.logoText}>Oficial Bizzus</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formText}>INGRESAR</Text>

        <CustomTextInput
          image= {require('../../../../assets/email.png')}
          placeholder='Correo Electrónico'
          keyboardType='email-address'
          property='email'
          onChangeText={onChange}
          value={email}
        />

        <CustomTextInput
          image= {require('../../../../assets/password.png')}
          placeholder='Contraseña'
          keyboardType='default'
          property='password'
          onChangeText={onChange}
          value={password}
          secureTextEntry= {true}
        />

        <View style={{marginTop: 30 }}>
          <RoundedButton text='ENTRAR' onPress={() => login()}/>
        </View>

        <View style={styles.formRegister}>
          <Text>No tienes cuenta?</Text>
          <TouchableOpacity onPress={() =>
          navigation.navigate('RegisterScreen')}>
            <Text style={styles.formRegisterText}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}