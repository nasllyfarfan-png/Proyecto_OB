import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,
    Alert,
    RefreshControl,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { Product } from '../../../../Domain/entities/Product';
import { metaFor, formatCOP } from '../../../../Data/local/categoryMeta';
import { DEMO_PRODUCTS } from '../../../../Data/local/demoProducts';
import { getCustomCategories } from '../../../../Data/local/customCategories';
import { CategoryManagerAdmin } from '../../../components/admin/CategoryManagerAdmin';
import { InventoryReportsAdmin } from '../../../components/admin/InventoryReportsAdmin';
import ProductListViewModel from './viewModel';
import styles from './Styles';

interface Props extends StackScreenProps<RootStackParamList, 'ProductListScreen'> {}

const FALLBACK_IMG = require('../../../../../assets/featured/kid-hoodie.jpg');

export const ProductListScreen = ({ navigation }: Props) => {

    const { products, loading, errorMessage, getProducts, deleteProduct } = ProductListViewModel();

    const [query, setQuery] = useState('');
    const [catFilter, setCatFilter] = useState('todos');
    const [showReports, setShowReports] = useState(false);
    const [customCats, setCustomCats] = useState<{ id: string; name: string }[]>([]);

    const reloadCategories = useCallback(async () => {
        setCustomCats(await getCustomCategories());
    }, []);

    useEffect(() => {
        reloadCategories();
    }, [reloadCategories]);

    useEffect(() => {
        if (errorMessage !== '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
    }, [errorMessage]);

    // Botón en el header para ir al Perfil (donde está "Cerrar sesión")
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ProfileInfoScreen')}>
                    <Image
                        source={require('../../../../../assets/user.png')}
                        style={{ width: 26, height: 26, marginRight: 12 }}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // Refresca el listado cada vez que la pantalla vuelve a tomar foco
    // (por ejemplo, luego de crear o editar un producto)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProducts();
            reloadCategories();
        });
        return unsubscribe;
    }, [navigation]);

    const isBaseProduct = (p: Product) => String(p.id ?? '').startsWith('demo-');

    // Catálogo completo = catálogo base (con imágenes, solo lectura) + productos
    // reales creados desde este panel (editables/eliminables), igual que en la web.
    const allProducts = [...DEMO_PRODUCTS, ...products];

    const confirmDelete = (product: Product) => {
        if (isBaseProduct(product)) {
            Alert.alert('Catálogo base', 'Esta prenda es parte del catálogo base y no se puede eliminar aquí.');
            return;
        }
        Alert.alert(
            'Eliminar producto',
            `¿Seguro que deseas eliminar "${product.name}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => deleteProduct(product.id as string),
                },
            ]
        );
    };

    const goEdit = (product: Product) => {
        if (isBaseProduct(product)) {
            Alert.alert('Catálogo base', 'Esta prenda es parte del catálogo base y no se puede editar aquí.');
            return;
        }
        navigation.navigate('ProductFormScreen', { productId: product.id });
    };

    // --- Estadísticas (igual que InventoryPage.jsx, sobre el catálogo completo) ---
    const totalUnits = allProducts.reduce((s, p) => s + (p.stock ?? 0), 0);
    const healthy = allProducts.filter((p) => (p.stock ?? 0) > 10).length;
    const low = allProducts.filter((p) => (p.stock ?? 0) <= 10).length;

    // --- Categorías (derivadas del catálogo completo + personalizadas del admin) ---
    const derivedIds = Array.from(
        new Set(allProducts.map((p) => (p.category || '').trim().toLowerCase()).filter(Boolean))
    );
    const categories = [
        ...derivedIds.map(metaFor),
        ...customCats.filter((c) => !derivedIds.includes(c.id)).map((c) => metaFor(c.id)),
    ];
    const customIds = customCats.map((c) => c.id);

    const filtered = allProducts.filter((p) => {
        const matchCat = catFilter === 'todos' || (p.category || '').toLowerCase() === catFilter;
        const matchQ = !query.trim() || p.name.toLowerCase().includes(query.trim().toLowerCase());
        return matchCat && matchQ;
    });

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.card}>
            <Image
                source={item.image ? { uri: item.image } : FALLBACK_IMG}
                style={styles.cardImage}
            />
            <View style={styles.cardInfo}>
                <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                {isBaseProduct(item) ? (
                    <Text style={styles.baseTag}>Catálogo base</Text>
                ) : (
                    <Text style={styles.cardDescription} numberOfLines={1}>
                        {item.description}
                    </Text>
                )}
                <View style={styles.cardFooterRow}>
                    <Text style={styles.cardCategory}>{item.category}</Text>
                    <Text style={styles.cardPrice}>{formatCOP(item.price)}</Text>
                </View>
                <View style={styles.cardFooterRow}>
                    <Text style={[styles.stockText, (item.stock ?? 0) <= 10 && styles.stockLow]}>
                        Stock: {item.stock ?? 0}
                    </Text>
                    <View style={[styles.badge, (item.stock ?? 0) > 0 ? styles.badgeOk : styles.badgeBad]}>
                        <Text style={[styles.badgeText, (item.stock ?? 0) > 0 ? styles.badgeTextOk : styles.badgeTextBad]}>
                            {(item.stock ?? 0) > 0 ? 'Disponible' : 'Agotado'}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => goEdit(item)}>
                    <Image
                        source={require('../../../../../assets/edit.png')}
                        style={[styles.actionIcon, isBaseProduct(item) && { opacity: 0.3 }]}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => confirmDelete(item)}>
                    <Image
                        source={require('../../../../../assets/trash.png')}
                        style={[styles.actionIcon, isBaseProduct(item) && { opacity: 0.3 }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    const ListHeader = (
        <View>
            <Text style={styles.tag}>PANEL ADMINISTRATIVO</Text>
            <Text style={styles.pageTitle}>Inventario de prendas</Text>
            <Text style={styles.pageSubtitle}>Gestiona el catálogo: crea, edita y elimina prendas.</Text>

            <TouchableOpacity style={styles.reportsToggle} onPress={() => setShowReports((s) => !s)}>
                <Text style={styles.reportsToggleText}>
                    {showReports ? 'Ocultar reportes ▲' : 'Ver reportes ▼'}
                </Text>
            </TouchableOpacity>

            <View style={styles.statsGrid}>
                <StatCard label="Productos" value={allProducts.length} color={styles.statGold} />
                <StatCard label="Unidades" value={totalUnits} color={styles.statBlue} />
                <StatCard label="Stock saludable" value={healthy} color={styles.statGreen} />
                <StatCard label="Stock bajo" value={low} color={styles.statRust} />
            </View>

            {showReports && <InventoryReportsAdmin products={products} />}

            <CategoryManagerAdmin
                categories={categories}
                isCustomCategory={(id) => customIds.includes(id)}
                onChange={reloadCategories}
            />

            <TextInput
                style={styles.search}
                placeholder="Buscar prenda..."
                placeholderTextColor="#999"
                value={query}
                onChangeText={setQuery}
            />
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 14 }}
                data={[{ id: 'todos', name: 'Todas' }, ...categories]}
                keyExtractor={(c) => c.id}
                renderItem={({ item: c }) => (
                    <TouchableOpacity
                        style={[styles.chip, catFilter === c.id && styles.chipActive]}
                        onPress={() => setCatFilter(c.id)}
                    >
                        <Text style={[styles.chipText, catFilter === c.id && styles.chipTextActive]}>
                            {c.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filtered}
                keyExtractor={(item, index) => item.id ?? String(index)}
                renderItem={renderItem}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay prendas que coincidan con la búsqueda.</Text>
                }
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getProducts} />
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('ProductFormScreen', { productId: undefined })}
            >
                <Image
                    source={require('../../../../../assets/plus.png')}
                    style={styles.fabIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const StatCard = ({ label, value, color }: { label: string; value: number; color: any }) => (
    <View style={styles.statCard}>
        <Text style={[styles.statValue, color]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);