import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { SectionHeader } from '../../components/store/SectionHeader';
import { useCart, CartItem } from '../../context/CartContext';
import { formatCOP } from '../../../Data/local/categoryMeta';

const FALLBACK_IMG = 'https://i.pinimg.com/736x/8f/bc/68/8fbc68f73eba7ceaf2e8275542c3524f.jpg';

export const CartScreen = () => {
    const navigation = useNavigation<any>();
    const { cart, total, updateQty, removeFromCart, clearCart } = useCart();

    const checkout = () => {
        if (cart.length === 0) return;
        Alert.alert(
            'Pedido confirmado',
            `Tu pedido por ${formatCOP(total)} fue registrado. ¡Gracias por tu compra!`,
            [{ text: 'OK', onPress: () => clearCart() }]
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(it, i) => `${it.id}-${it.size ?? ''}-${i}`}
                contentContainerStyle={{ padding: 20, paddingBottom: 160 }}
                ListHeaderComponent={<SectionHeader tag="Tu compra" title="Carrito" />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>🛍️</Text>
                        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
                        <TouchableOpacity style={styles.btnDark} onPress={() => navigation.navigate('ProductsTab')}>
                            <Text style={styles.btnDarkText}>Ver productos</Text>
                        </TouchableOpacity>
                    </View>
                }
                renderItem={({ item }: { item: CartItem }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.img || FALLBACK_IMG }} style={styles.itemImg} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                            {!!item.size && <Text style={styles.itemSize}>Talla: {item.size}</Text>}
                            <Text style={styles.itemPrice}>{formatCOP(item.price)}</Text>
                            <View style={styles.qtyRow}>
                                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, item.size, -1)}>
                                    <Text style={styles.qtyBtnText}>−</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyNum}>{item.qty}</Text>
                                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, item.size, 1)}>
                                    <Text style={styles.qtyBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeFromCart(item.id, item.size)}>
                            <Text style={styles.removeText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {cart.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total estimado</Text>
                        <Text style={styles.totalValue}>{formatCOP(total)}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnDark} onPress={checkout}>
                        <Text style={styles.btnDarkText}>Proceder al pago</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('ProductsTab')}>
                        <Text style={styles.btnOutlineText}>Seguir comprando</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BizzusColors.bg },
    empty: { alignItems: 'center', marginTop: 50 },
    emptyIcon: { fontSize: 40, marginBottom: 10 },
    emptyText: { color: BizzusColors.mist, marginBottom: 20 },
    item: {
        flexDirection: 'row', gap: 12, backgroundColor: '#fff', borderRadius: 12,
        padding: 12, marginBottom: 12, borderWidth: 1, borderColor: BizzusColors.border, alignItems: 'center',
    },
    itemImg: { width: 60, height: 74, borderRadius: 8, backgroundColor: BizzusColors.warm },
    itemName: { fontWeight: '700', fontSize: 14, color: BizzusColors.ink },
    itemSize: { fontSize: 11, color: BizzusColors.mist, marginTop: 2 },
    itemPrice: { fontWeight: '700', color: BizzusColors.gold, marginTop: 4 },
    qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 10 },
    qtyBtn: {
        width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: BizzusColors.border,
        alignItems: 'center', justifyContent: 'center',
    },
    qtyBtnText: { fontSize: 16, fontWeight: '700' },
    qtyNum: { fontSize: 13, fontWeight: '600', minWidth: 16, textAlign: 'center' },
    removeText: { color: BizzusColors.rust, fontSize: 11, fontWeight: '600' },
    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff',
        padding: 20, borderTopWidth: 1, borderTopColor: BizzusColors.border,
    },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    totalLabel: { color: BizzusColors.mist, fontSize: 13 },
    totalValue: { fontFamily: Fonts.serif, fontWeight: '700', fontSize: 20, color: BizzusColors.ink },
    btnDark: { backgroundColor: BizzusColors.ink, paddingVertical: 14, borderRadius: 30, alignItems: 'center', marginBottom: 8 },
    btnDarkText: { color: '#fff', fontWeight: '700', fontSize: 14 },
    btnOutline: { borderWidth: 1.5, borderColor: BizzusColors.ink, paddingVertical: 14, borderRadius: 30, alignItems: 'center' },
    btnOutlineText: { color: BizzusColors.ink, fontWeight: '700', fontSize: 14 },
});
