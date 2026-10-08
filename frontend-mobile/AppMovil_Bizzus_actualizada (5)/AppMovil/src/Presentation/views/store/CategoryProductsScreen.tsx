import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BizzusColors } from '../../theme/AppTheme';
import { SectionHeader } from '../../components/store/SectionHeader';
import { ProductCard } from '../../components/store/ProductCard';
import { useCatalog } from '../../hooks/useCatalog';
import { useCart } from '../../context/CartContext';

export const CategoryProductsScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { categoryId, categoryName } = route.params || {};
    const { products, loading } = useCatalog();
    const { addToCart } = useCart();

    const filtered = products.filter(
        (p) => (p.category || '').trim().toLowerCase() === (categoryId || '').toLowerCase()
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filtered}
                keyExtractor={(p, i) => p.id ?? String(i)}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ padding: 20 }}
                ListHeaderComponent={
                    <>
                        <SectionHeader tag="Categoría" title={categoryName || categoryId} />
                        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                            <Text style={styles.backText}>← Todas las categorías</Text>
                        </TouchableOpacity>
                    </>
                }
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator style={{ marginTop: 40 }} color={BizzusColors.gold} />
                    ) : (
                        <Text style={styles.empty}>No hay productos en esta categoría.</Text>
                    )
                }
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                        onAdd={() =>
                            addToCart({
                                id: item.id as string,
                                name: item.name,
                                price: item.price,
                                img: item.image,
                                category: item.category,
                            })
                        }
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BizzusColors.bg },
    backBtn: { alignSelf: 'center', marginBottom: 18 },
    backText: { color: BizzusColors.gold, fontWeight: '600', fontSize: 13 },
    empty: { textAlign: 'center', color: BizzusColors.mist, marginTop: 40 },
});
