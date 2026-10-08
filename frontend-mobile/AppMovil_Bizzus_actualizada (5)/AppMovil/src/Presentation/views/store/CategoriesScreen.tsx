import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BizzusColors, Fonts, Shadow } from '../../theme/AppTheme';
import { SectionHeader } from '../../components/store/SectionHeader';
import { useCatalog } from '../../hooks/useCatalog';

export const CategoriesScreen = () => {
    const navigation = useNavigation<any>();
    const { categories, loading, usingDemo } = useCatalog();

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(c) => c.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ padding: 20 }}
                ListHeaderComponent={
                    <>
                        <SectionHeader tag="Explora" title="Nuestras Categorías" />
                        {usingDemo && (
                            <View style={styles.demoBanner}>
                                <Text style={styles.demoBannerText}>
                                    Mostrando catálogo de muestra — conecta tu backend con productos reales para reemplazarlo.
                                </Text>
                            </View>
                        )}
                    </>
                }
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator style={{ marginTop: 40 }} color={BizzusColors.gold} />
                    ) : (
                        <Text style={styles.empty}>Aún no hay categorías. Agrega productos desde Inventario.</Text>
                    )
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('CategoryProducts', { categoryId: item.id, categoryName: item.name })}
                    >
                        <Image source={{ uri: item.img }} style={styles.img} />
                        <View style={styles.overlay} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.sub}>{item.desc}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BizzusColors.bg },
    card: {
        width: '48%', aspectRatio: 0.85, borderRadius: 16, overflow: 'hidden',
        marginBottom: 16, backgroundColor: BizzusColors.warm, ...Shadow.card,
    },
    img: { width: '100%', height: '100%', position: 'absolute' },
    overlay: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    info: { position: 'absolute', bottom: 14, left: 14, right: 14 },
    name: { color: '#fff', fontFamily: Fonts.serif, fontSize: 20, fontWeight: '700' },
    sub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 },
    empty: { textAlign: 'center', color: BizzusColors.mist, marginTop: 40 },
    demoBanner: {
        backgroundColor: BizzusColors.goldPale, borderRadius: 8, padding: 10, marginBottom: 14,
        borderWidth: 1, borderColor: BizzusColors.gold, marginHorizontal: 0,
    },
    demoBannerText: { color: BizzusColors.gold, fontSize: 11, fontWeight: '600', textAlign: 'center' },
});
