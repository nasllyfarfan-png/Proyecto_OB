import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../../../Domain/entities/Product';
import { BizzusColors, Fonts, Shadow } from '../../theme/AppTheme';
import { formatCOP } from '../../../Data/local/categoryMeta';
import { StarRating } from './StarRating';

interface Props {
    product: Product;
    onPress: () => void;
    onAdd: () => void;
}

const FALLBACK_IMG = 'https://i.pinimg.com/736x/8f/bc/68/8fbc68f73eba7ceaf2e8275542c3524f.jpg';

export const ProductCard = ({ product, onPress, onAdd }: Props) => {
    const outOfStock = (product.stock ?? 0) <= 0;
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.imgWrap}>
                <Image source={{ uri: product.image || FALLBACK_IMG }} style={styles.img} />
                {!!product.discount && product.discount > 0 && (
                    <View style={[styles.tag, { backgroundColor: BizzusColors.rust }]}>
                        <Text style={styles.tagText}>-{product.discount}%</Text>
                    </View>
                )}
                {outOfStock && (
                    <View style={styles.outOverlay}>
                        <Text style={styles.outText}>Agotado</Text>
                    </View>
                )}
            </View>
            <View style={styles.info}>
                <StarRating value={5} size={11} />
                <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.cat}>{product.category}</Text>
                <View style={styles.rowBetween}>
                    <Text style={styles.price}>{formatCOP(product.price)}</Text>
                    <TouchableOpacity
                        style={[styles.addBtn, outOfStock && { opacity: 0.4 }]}
                        onPress={onAdd}
                        disabled={outOfStock}
                    >
                        <Text style={styles.addBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: BizzusColors.white,
        borderRadius: 14,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: BizzusColors.border,
        ...Shadow.card,
    },
    imgWrap: { width: '100%', aspectRatio: 3 / 4, backgroundColor: BizzusColors.warm },
    img: { width: '100%', height: '100%', resizeMode: 'cover' },
    tag: {
        position: 'absolute', top: 8, left: 8,
        paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20,
    },
    tagText: { color: '#fff', fontSize: 10, fontWeight: '700' },
    outOverlay: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(17,17,17,0.55)',
        alignItems: 'center', justifyContent: 'center',
    },
    outText: { color: '#fff', fontWeight: '700', fontSize: 12, letterSpacing: 1 },
    info: { padding: 10 },
    name: { fontFamily: Fonts.serif, fontSize: 15, fontWeight: '700', color: BizzusColors.ink, marginTop: 4 },
    cat: { fontSize: 11, color: BizzusColors.mist, textTransform: 'capitalize', marginTop: 1 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    price: { fontWeight: '700', color: BizzusColors.gold, fontSize: 14 },
    addBtn: {
        width: 26, height: 26, borderRadius: 13, backgroundColor: BizzusColors.ink,
        alignItems: 'center', justifyContent: 'center',
    },
    addBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', marginTop: -2 },
});
