import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../../../Domain/entities/Product';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { formatCOP } from '../../../Data/local/categoryMeta';

interface Props {
    products: Product[];
}

export const InventoryReportsAdmin = ({ products }: Props) => {
    const byCat: Record<string, number> = {};
    let totalValue = 0;
    let outOfStock = 0;
    let lowStock = 0;

    products.forEach((p) => {
        const cat = p.category || 'otros';
        byCat[cat] = (byCat[cat] || 0) + 1;
        totalValue += (p.price || 0) * (p.stock ?? 0);
        if ((p.stock ?? 0) === 0) outOfStock++;
        else if ((p.stock ?? 0) <= 10) lowStock++;
    });

    const catRows = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    const maxCatCount = Math.max(1, ...catRows.map(([, n]) => n));

    const lowStockList = [...products]
        .filter((p) => (p.stock ?? 0) <= 10)
        .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
        .slice(0, 6);

    return (
        <View style={{ marginBottom: 16 }}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>PRODUCTOS POR CATEGORÍA</Text>
                {catRows.map(([cat, count]) => (
                    <View key={cat} style={{ marginBottom: 10 }}>
                        <View style={styles.barRow}>
                            <Text style={styles.barLabel}>{cat}</Text>
                            <Text style={styles.barValue}>{count}</Text>
                        </View>
                        <View style={styles.barTrack}>
                            <View style={[styles.barFill, { width: `${(count / maxCatCount) * 100}%` }]} />
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>VALOR DEL INVENTARIO</Text>
                <Text style={styles.bigValue}>{formatCOP(totalValue)}</Text>
                <Text style={styles.smallHint}>Suma de precio × stock de todas las prendas.</Text>
                <View style={styles.statsRow}>
                    <View>
                        <Text style={styles.statBad}>{outOfStock}</Text>
                        <Text style={styles.statLabel}>Agotadas</Text>
                    </View>
                    <View>
                        <Text style={styles.statBad}>{lowStock}</Text>
                        <Text style={styles.statLabel}>Stock bajo (≤10)</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>PARA REPONER PRONTO</Text>
                {lowStockList.length === 0 ? (
                    <Text style={styles.smallHint}>Todo el inventario tiene stock saludable 🎉</Text>
                ) : (
                    lowStockList.map((p) => (
                        <View key={p.id} style={styles.lowRow}>
                            <Text style={styles.lowName} numberOfLines={1}>{p.name}</Text>
                            <Text style={[styles.lowStock, (p.stock ?? 0) === 0 && { color: BizzusColors.rust }]}>
                                {p.stock ?? 0}
                            </Text>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12,
        borderWidth: 1, borderColor: BizzusColors.border,
    },
    cardTitle: { fontSize: 11, fontWeight: '700', color: BizzusColors.mist, letterSpacing: 1, marginBottom: 12 },
    barRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    barLabel: { fontSize: 12, color: BizzusColors.ink, textTransform: 'capitalize' },
    barValue: { fontSize: 12, fontWeight: '700', color: BizzusColors.ink },
    barTrack: { height: 7, backgroundColor: BizzusColors.warm, borderRadius: 20 },
    barFill: { height: 7, backgroundColor: BizzusColors.gold, borderRadius: 20 },
    bigValue: { fontFamily: Fonts.serif, fontSize: 24, fontWeight: '700', color: BizzusColors.gold },
    smallHint: { fontSize: 11, color: BizzusColors.mist, marginTop: 4 },
    statsRow: { flexDirection: 'row', gap: 24, marginTop: 12 },
    statBad: { fontWeight: '700', color: BizzusColors.rust, fontSize: 16 },
    statLabel: { fontSize: 10, color: BizzusColors.mist },
    lowRow: {
        flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6,
        borderTopWidth: 1, borderTopColor: BizzusColors.border,
    },
    lowName: { fontSize: 12, color: BizzusColors.ink, flex: 1, marginRight: 8 },
    lowStock: { fontSize: 12, fontWeight: '700', color: BizzusColors.ink },
});
