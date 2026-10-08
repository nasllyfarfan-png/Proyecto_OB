import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { HomeStore } from './HomeStore';
import { CategoriesScreen } from './CategoriesScreen';
import { ProductsScreen } from './ProductsScreen';
import { CartScreen } from './CartScreen';
import { ProfileScreen } from './ProfileScreen';
import { useCart } from '../../context/CartContext';

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, focused }: { icon: string; focused: boolean }) => (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{icon}</Text>
);

const CartIcon = ({ focused }: { focused: boolean }) => {
    const { cartCount } = useCart();
    return (
        <View>
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>🛍️</Text>
            {cartCount > 0 && (
                <View style={{
                    position: 'absolute', top: -4, right: -8, backgroundColor: BizzusColors.rust,
                    borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center',
                    paddingHorizontal: 3,
                }}>
                    <Text style={{ color: '#fff', fontSize: 9, fontWeight: '700' }}>{cartCount}</Text>
                </View>
            )}
        </View>
    );
};

export const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: BizzusColors.ink },
                headerTitleStyle: { fontFamily: Fonts.serif, color: '#fff', fontSize: 18 },
                headerTintColor: '#fff',
                tabBarActiveTintColor: BizzusColors.gold,
                tabBarInactiveTintColor: BizzusColors.mist,
                tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6, backgroundColor: '#fff' },
                tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStore}
                options={{ title: 'OFICIAL BIZZUS', tabBarLabel: 'Inicio', tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} /> }}
            />
            <Tab.Screen
                name="CategoriesTab"
                component={CategoriesScreen}
                options={{ title: 'Categorías', tabBarLabel: 'Categorías', tabBarIcon: ({ focused }) => <TabIcon icon="📂" focused={focused} /> }}
            />
            <Tab.Screen
                name="ProductsTab"
                component={ProductsScreen}
                options={{ title: 'Productos', tabBarLabel: 'Productos', tabBarIcon: ({ focused }) => <TabIcon icon="👕" focused={focused} /> }}
            />
            <Tab.Screen
                name="CartTab"
                component={CartScreen}
                options={{ title: 'Carrito', tabBarLabel: 'Carrito', tabBarIcon: ({ focused }) => <CartIcon focused={focused} /> }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{ title: 'Mi Perfil', tabBarLabel: 'Perfil', tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} /> }}
            />
        </Tab.Navigator>
    );
};
