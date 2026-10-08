import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import RoundedButton from '../../components/RoundedButton';
import { CustomTextInput } from '../../components/CustomTextInput';
import useViewModel from './viewModel';
import styles from './Styles';


export const RegisterScreen = () => {

  const { name, lastname, phone, email, password, confirmPassword, onChange, register } = useViewModel();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/tienda.jpg')}
        style={styles.ImageBackground}
      />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/Usuario.png')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formText}>REGISTRARSE</Text>

        <CustomTextInput
          image={require('../../../../assets/user.png')}
          placeholder="Nombre"
          keyboardType="default"
          property="name"
          onChangeText={onChange}
          value={name}
        />

        <CustomTextInput
          image={require('../../../../assets/my_user.png')}
          placeholder="Apellidos"
          keyboardType="default"
          property="lastname"
          onChangeText={onChange}
          value={lastname}
        />

        <CustomTextInput
          image={require('../../../../assets/email.png')}
          placeholder="Correo Electronico"
          keyboardType="email-address"
          property="email"
          onChangeText={onChange}
          value={email}
        />

        <CustomTextInput
          image={require('../../../../assets/phone.png')}
          placeholder="Telefono"
          keyboardType="numeric"
          property="phone"
          onChangeText={onChange}
          value={phone}
        />

        <CustomTextInput
          image={require('../../../../assets/password.png')}
          placeholder="Contraseña"
          keyboardType="default"
          property="password"
          onChangeText={onChange}
          value={password}
          secureTextEntry={true}
        />

        <CustomTextInput
          image={require('../../../../assets/confirm_password.png')}
          placeholder="Confirmar Contraseña"
          keyboardType="default"
          property="confirmPassword"
          onChangeText={onChange}
          value={confirmPassword}
          secureTextEntry={true}
        />

        <View style={{ marginTop: 30 }}>
          <RoundedButton text="CONFIRMAR" onPress={() => register()} />
        </View>
      </View>
    </View>
  );
};
