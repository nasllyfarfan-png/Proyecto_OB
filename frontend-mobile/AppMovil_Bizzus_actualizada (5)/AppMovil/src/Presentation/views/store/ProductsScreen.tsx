import React, { useState } from 'react';
import {
    View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet,
    TouchableOpacity, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { SectionHeader } from '../../components/store/SectionHeader';
import { ProductCard } from '../../components/store/ProductCard';
import { useCatalog } from '../../hooks/useCatalog';
import { useCart } from '../../context/CartContext';

export const ProductsScreen = () => {
    const navigation = useNavigation<any>();
    const { products, categories, loading, reload, usingDemo } = useCatalog();
    const { addToCart } = useCart();
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('todos');

    const filtered = products.filter((p) => {
        const matchCat = filter === 'todos' || (p.category || '').toLowerCase() === filter;
        const matchQ = !query.trim() || p.name.toLowerCase().includes(query.trim().toLowerCase());
        return matchCat && matchQ;
    });

    return (
        <View style={styles.container}>
            <FlatList
                data={filtered}
                keyExtractor={(p, i) => p.id ?? String(i)}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ padding: 20 }}
                refreshing={loading}
                onRefresh={reload}
                ListHeaderComponent={
                    <>
                        <SectionHeader tag="Catálogo" title="Nuestros Productos" />
                        {usingDemo && (
                            <View style={styles.demoBanner}>
                                <Text style={styles.demoBannerText}>
                                    Mostrando catálogo de muestra — conecta tu backend con productos reales para reemplazarlo.
                                </Text>
                            </View>
                        )}
                        <TextInput
                            style={styles.search}
                            placeholder="Buscar prenda..."
                            placeholderTextColor={BizzusColors.mist}
                            value={query}
                            onChangeText={setQuery}
                        />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                            {['todos', ...categories.map((c) => c.id)].map((c) => (
                                <TouchableOpacity
                                    key={c}
                                    style={[styles.chip, filter === c && styles.chipActive]}
                                    onPress={() => setFilter(c)}
                                >
                                    <Text style={[styles.chipText, filter === c && styles.chipTextActive]}>
                                        {c === 'todos' ? 'Todos' : c.charAt(0).toUpperCase() + c.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                }
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator style={{ marginTop: 40 }} color={BizzusColors.gold} />
                    ) : (
                        <Text style={styles.empty}>No se encontraron productos.</Text>
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
    search: {
        borderWidth: 1.5, borderColor: BizzusColors.border, borderRadius: 10,
        paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, marginBottom: 14,
        backgroundColor: '#fff', color: BizzusColors.ink,
    },
    chip: {
        paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
        borderColor: BizzusColors.border, marginRight: 8, backgroundColor: '#fff',
    },
    chipActive: { backgroundColor: BizzusColors.ink, borderColor: BizzusColors.ink },
    chipText: { fontSize: 12, color: BizzusColors.ink, fontWeight: '600' },
    chipTextActive: { color: '#fff' },
    empty: { textAlign: 'center', color: BizzusColors.mist, marginTop: 40 },
    demoBanner: {
        backgroundColor: BizzusColors.goldPale, borderRadius: 8, padding: 10, marginBottom: 14,
        borderWidth: 1, borderColor: BizzusColors.gold,
    },
    demoBannerText: { color: BizzusColors.gold, fontSize: 11, fontWeight: '600', textAlign: 'center' },
});
