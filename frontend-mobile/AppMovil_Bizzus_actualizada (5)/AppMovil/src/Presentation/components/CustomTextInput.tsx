import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardType } from 'react-native';

interface Props {
    image: any;
    placeholder: string;
    value: string;
    keyboardType: KeyboardType,
    secureTextEntry?: boolean,
    property: string,
    onChangeText: (property: string, value: any) => void,
}

export const CustomTextInput = ({
    image,
    placeholder,
    value,
    keyboardType,
    secureTextEntry = false,
    property,
    onChangeText
}: Props) => {
    return (
        <View style={styles.formIput}>
            <Image style={styles.formIcon}
            source={image}
            />
            <TextInput
            style={styles.formTextImput}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            onChangeText={text => onChangeText(property, text)}
            secureTextEntry={secureTextEntry}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5,

    },
    formIput: { 
        flexDirection: 'row',
        marginTop: 30,

    },
    formTextImput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15,
    }
})
