import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { CustomTextInput } from '../../../components/CustomTextInput';
import RoundedButton from '../../../components/RoundedButton';
import ProductFormViewModel from './viewModel';
import styles from './Styles';

interface Props extends StackScreenProps<RootStackParamList, 'ProductFormScreen'> {}

export const ProductFormScreen = ({ navigation, route }: Props) => {

    const { productId } = route.params ?? {};

    const {
        name,
        description,
        price,
        category,
        stock,
        sku,
        discount,
        image,
        isEditing,
        loading,
        errorMessage,
        saved,
        onChange,
        save,
    } = ProductFormViewModel(productId);

    useEffect(() => {
        if (errorMessage !== '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (saved) {
            ToastAndroid.show(
                isEditing ? 'Producto actualizado' : 'Producto creado',
                ToastAndroid.SHORT
            );
            navigation.goBack();
        }
    }, [saved]);

    if (loading && isEditing && name === '') {
        return (
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.form}>
                <Text style={styles.title}>
                    {isEditing ? 'Editar prenda' : 'Registrar nueva prenda'}
                </Text>

                <CustomTextInput
                    image={require('../../../../../assets/document.png')}
                    placeholder="Nombre de la prenda *"
                    keyboardType="default"
                    property="name"
                    onChangeText={onChange}
                    value={name}
                />

                <CustomTextInput
                    image={require('../../../../../assets/categories.png')}
                    placeholder="Categoría *"
                    keyboardType="default"
                    property="category"
                    onChangeText={onChange}
                    value={category}
                />

                <CustomTextInput
                    image={require('../../../../../assets/price.png')}
                    placeholder="Precio (COP) *"
                    keyboardType="numeric"
                    property="price"
                    onChangeText={onChange}
                    value={price}
                />

                <CustomTextInput
                    image={require('../../../../../assets/list.png')}
                    placeholder="Stock disponible *"
                    keyboardType="numeric"
                    property="stock"
                    onChangeText={onChange}
                    value={stock}
                />


                <CustomTextInput
                    image={require('../../../../../assets/document.png')}
                    placeholder="SKU (opcional)"
                    keyboardType="default"
                    property="sku"
                    onChangeText={onChange}
                    value={sku}
                />

                <CustomTextInput
                    image={require('../../../../../assets/description.png')}
                    placeholder="Descripción *"
                    keyboardType="default"
                    property="description"
                    onChangeText={onChange}
                    value={description}
                />

                <CustomTextInput
                    image={require('../../../../../assets/image_add.png')}
                    placeholder="URL de la imagen *"
                    keyboardType="default"
                    property="image"
                    onChangeText={onChange}
                    value={image}
                />

                {!!image && (
                    <View style={styles.previewWrap}>
                        <Image source={{ uri: image }} style={styles.preview} />
                    </View>
                )}

                <View style={styles.buttonContainer}>
                    <RoundedButton
                        text={loading ? 'GUARDANDO...' : 'GUARDAR PRENDA'}
                        onPress={() => !loading && save()}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
