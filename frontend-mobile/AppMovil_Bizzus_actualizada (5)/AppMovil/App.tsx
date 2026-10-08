import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { HomeScreen } from './src/Presentation/views/home/home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { ProfileInfoScreen } from './src/Presentation/views/profile/info/ProfileInfo';
import { ProductFormScreen } from './src/Presentation/views/products/form/ProductForm';
import { ProductListScreen } from './src/Presentation/views/products/list/ProductList';

import { MainTabs } from './src/Presentation/views/store/MainTabs';
import { CategoryProductsScreen } from './src/Presentation/views/store/CategoryProductsScreen';
import { ProductDetailScreen } from './src/Presentation/views/store/ProductDetailScreen';
import { ContactScreen } from './src/Presentation/views/store/ContactScreen';
import { AboutScreen } from './src/Presentation/views/store/AboutScreen';
import { CartProvider } from './src/Presentation/context/CartContext';
import { BizzusColors, Fonts } from './src/Presentation/theme/AppTheme';

export type RootStackParamList = {
    HomeScreen: undefined;
    RegisterScreen: undefined;
    ProfileInfoScreen: undefined;
    ProductFormScreen: { productId?: string };
    ProductListScreen: undefined;
    MainTabs: undefined;
    CategoryProducts: { categoryId: string; categoryName: string };
    ProductDetail: { productId: string };
    Contact: undefined;
    About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="HomeScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >

                    {/* LOGIN */}
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                    />

                    {/* REGISTRO */}
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{
                            headerShown: true,
                            title: 'Nuevo Usuario',
                        }}
                    />

                    {/* TIENDA (pestañas: Inicio, Categorías, Productos, Carrito, Perfil) */}
                    <Stack.Screen
                        name="MainTabs"
                        component={MainTabs}
                    />

                    {/* PRODUCTOS POR CATEGORÍA */}
                    <Stack.Screen
                        name="CategoryProducts"
                        component={CategoryProductsScreen}
                        options={{
                            headerShown: true,
                            title: 'Categoría',
                            headerStyle: { backgroundColor: BizzusColors.ink },
                            headerTintColor: '#fff',
                            headerTitleStyle: { fontFamily: Fonts.serif },
                        }}
                    />

                    {/* DETALLE DE PRODUCTO */}
                    <Stack.Screen
                        name="ProductDetail"
                        component={ProductDetailScreen}
                        options={{
                            headerShown: true,
                            title: 'Producto',
                            headerStyle: { backgroundColor: BizzusColors.ink },
                            headerTintColor: '#fff',
                            headerTitleStyle: { fontFamily: Fonts.serif },
                        }}
                    />

                    {/* CONTACTO */}
                    <Stack.Screen
                        name="Contact"
                        component={ContactScreen}
                        options={{
                            headerShown: true,
                            title: 'Contáctanos',
                            headerStyle: { backgroundColor: BizzusColors.ink },
                            headerTintColor: '#fff',
                            headerTitleStyle: { fontFamily: Fonts.serif },
                        }}
                    />

                    {/* SOBRE NOSOTROS */}
                    <Stack.Screen
                        name="About"
                        component={AboutScreen}
                        options={{
                            headerShown: true,
                            title: 'Sobre Nosotros',
                            headerStyle: { backgroundColor: BizzusColors.ink },
                            headerTintColor: '#fff',
                            headerTitleStyle: { fontFamily: Fonts.serif },
                        }}
                    />

                    {/* PERFIL (acceso directo / legado) */}
                    <Stack.Screen
                        name="ProfileInfoScreen"
                        component={ProfileInfoScreen}
                        options={{
                            headerShown: true,
                            title: 'Información de Perfil',
                        }}
                    />

                    {/* PRODUCTO (form admin) */}
                    <Stack.Screen
                        name="ProductFormScreen"
                        component={ProductFormScreen}
                        options={{
                            headerShown: true,
                            title: 'Producto',
                        }}
                    />

                    {/* INVENTARIO (admin) */}
                    <Stack.Screen
                        name="ProductListScreen"
                        component={ProductListScreen}
                        options={{
                            headerShown: true,
                            title: 'Inventario',
                            headerStyle: { backgroundColor: BizzusColors.ink },
                            headerTintColor: '#fff',
                            headerTitleStyle: { fontFamily: Fonts.serif },
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
};

export default App;
