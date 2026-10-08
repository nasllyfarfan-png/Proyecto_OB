import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from '../../../Domain/entities/Product';
import { GetProductByIdUseCase } from '../../../Domain/UseCases/products/GetProductById';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { StarRating } from '../../components/store/StarRating';
import { sizesFor, formatCOP } from '../../../Data/local/categoryMeta';
import { findDemoProduct } from '../../../Data/local/demoProducts';
import { useCart } from '../../context/CartContext';
import { useCatalog } from '../../hooks/useCatalog';
import { ProductCard } from '../../components/store/ProductCard';

const FALLBACK_IMG = 'https://i.pinimg.com/736x/8f/bc/68/8fbc68f73eba7ceaf2e8275542c3524f.jpg';

export const ProductDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { productId } = route.params || {};
    const { addToCart } = useCart();
    const { products } = useCatalog();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selSize, setSelSize] = useState<string | null>(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (typeof productId === 'string' && productId.startsWith('demo-')) {
                setProduct(findDemoProduct(productId) ?? null);
                setLoading(false);
                return;
            }
            const response = await GetProductByIdUseCase(productId);
            if (response?.success) {
                setProduct(response.data);
            } else {
                setProduct(findDemoProduct(productId) ?? null);
            }
            setLoading(false);
        })();
    }, [productId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={BizzusColors.gold} size="large" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.center}>
                <Text style={styles.notFound}>Producto no encontrado</Text>
                <TouchableOpacity style={styles.btnDark} onPress={() => navigation.navigate('ProductsTab')}>
                    <Text style={styles.btnDarkText}>Ver productos</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
    const outOfStock = (product.stock ?? 0) <= 0;

    const handleAdd = () => {
        if (!selSize || outOfStock) return;
        addToCart({
            id: product.id as string,
            name: product.name,
            price: product.price,
            img: product.image,
            category: product.category,
            size: selSize,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.image || FALLBACK_IMG }} style={styles.mainImg} />
            <View style={styles.info}>
                <Text style={styles.catTag}>{(product.category || '').toUpperCase()}</Text>
                <Text style={styles.title}>{product.name}</Text>
                <StarRating value={5} size={14} />
                <Text style={styles.price}>{formatCOP(product.price)}</Text>
                <Text style={styles.desc}>
                    {product.description ||
                        `Prenda de la colección ${product.category} de OFICIAL BIZZUS. Diseño colombiano con materiales de alta calidad.`}
                </Text>

                <Text style={styles.sizeLabel}>Selecciona tu talla:</Text>
                <View style={styles.sizeRow}>
                    {sizesFor(product.category).map((s) => (
                        <TouchableOpacity
                            key={s}
                            style={[styles.sizeBtn, selSize === s && styles.sizeBtnSel]}
                            onPress={() => setSelSize(s)}
                        >
                            <Text style={[styles.sizeText, selSize === s && styles.sizeTextSel]}>{s}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {!selSize && <Text style={styles.hint}>Por favor selecciona una talla</Text>}

                <TouchableOpacity
                    style={[styles.btnDark, { opacity: !selSize || outOfStock ? 0.5 : 1, marginTop: 20 }]}
                    onPress={handleAdd}
                    disabled={!selSize || outOfStock}
                >
                    <Text style={styles.btnDarkText}>
                        {outOfStock ? 'Agotado' : added ? '¡Añadido! ✓' : 'Añadir al carrito'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.detailsBox}>
                    <DetailRow label="Categoría" value={product.category} />
                    <DetailRow label="Envío" value="A todo Colombia" />
                    <DetailRow label="Garantía" value="30 días" />
                    <DetailRow label="Pago" value="Nequi · Daviplata · PSE" />
                </View>
            </View>

            {related.length > 0 && (
                <View style={styles.related}>
                    <Text style={styles.relatedTitle}>También te puede gustar</Text>
                    <View style={styles.relatedGrid}>
                        {related.map((r) => (
                            <ProductCard
                                key={r.id}
                                product={r}
                                onPress={() => navigation.push('ProductDetail', { productId: r.id })}
                                onAdd={() =>
                                    addToCart({
                                        id: r.id as string,
                                        name: r.name,
                                        price: r.price,
                                        img: r.image,
                                        category: r.category,
                                    })
                                }
                            />
                        ))}
                    </View>
                </View>
            )}
            <View style={{ height: 30 }} />
        </ScrollView>
    );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label.toUpperCase()}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BizzusColors.cream },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
    notFound: { fontFamily: Fonts.serif, fontSize: 20, marginBottom: 16 },
    mainImg: { width: '100%', aspectRatio: 3 / 4, backgroundColor: BizzusColors.warm },
    info: { padding: 22 },
    catTag: { color: BizzusColors.gold, fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
    title: { fontFamily: Fonts.serif, fontSize: 28, fontWeight: '700', color: BizzusColors.ink, marginVertical: 6 },
    price: { fontFamily: Fonts.serif, fontSize: 24, fontWeight: '700', color: BizzusColors.gold, marginVertical: 10 },
    desc: { color: BizzusColors.mist, fontSize: 13, lineHeight: 21 },
    sizeLabel: { fontWeight: '700', fontSize: 13, marginTop: 20, marginBottom: 8 },
    sizeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    sizeBtn: {
        paddingHorizontal: 16, paddingVertical: 9, borderRadius: 8, borderWidth: 1.5,
        borderColor: BizzusColors.border, backgroundColor: '#fff',
    },
    sizeBtnSel: { backgroundColor: BizzusColors.ink, borderColor: BizzusColors.ink },
    sizeText: { fontWeight: '600', fontSize: 13, color: BizzusColors.ink },
    sizeTextSel: { color: '#fff' },
    hint: { color: BizzusColors.rust, fontSize: 11, marginTop: 6 },
    btnDark: {
        backgroundColor: BizzusColors.ink, paddingVertical: 15, borderRadius: 30,
        alignItems: 'center',
    },
    btnDarkText: { color: '#fff', fontWeight: '700', fontSize: 14 },
    detailsBox: { backgroundColor: BizzusColors.warm, borderRadius: 12, padding: 16, marginTop: 24 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
    detailLabel: { fontSize: 10, color: BizzusColors.gold, fontWeight: '700', letterSpacing: 1 },
    detailValue: { fontSize: 13, color: BizzusColors.ink, fontWeight: '500', textTransform: 'capitalize' },
    related: { paddingHorizontal: 22, marginTop: 10 },
    relatedTitle: { fontFamily: Fonts.serif, fontSize: 20, fontWeight: '700', marginBottom: 14 },
    relatedGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
