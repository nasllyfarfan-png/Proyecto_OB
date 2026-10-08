import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { useUserLocal } from '../../hooks/useUserLocal';
import { RemoveUserLocalUseCase } from '../../../Domain/UseCases/userLocal/RemoveUserLocal';
import { isAdmin } from '../../../Data/local/admin';

export const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const { user } = useUserLocal();

    if (!user) {
        return (
            <View style={styles.center}>
                <Text style={styles.lockIcon}>🔒</Text>
                <Text style={styles.title}>Acceso restringido</Text>
                <Text style={styles.sub}>Debes iniciar sesión para ver tu perfil.</Text>
            </View>
        );
    }

    const initials = `${user.name?.[0] ?? ''}${user.lastname?.[0] ?? ''}`.toUpperCase();
    const admin = isAdmin(user);

    const logout = () => {
        Alert.alert('Cerrar sesión', '¿Seguro que deseas salir?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Cerrar sesión',
                style: 'destructive',
                onPress: async () => {
                    await RemoveUserLocalUseCase();
                    navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
                },
            },
        ]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials || 'U'}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{user.name} {user.lastname}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>✓ Cuenta activa</Text>
                    </View>
                </View>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statVal}>0</Text>
                    <Text style={styles.statLabel}>Mis pedidos</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statVal}>0</Text>
                    <Text style={styles.statLabel}>Direcciones</Text>
                </View>
            </View>

            {/* Info */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Información de cuenta</Text>
                <InfoRow label="Nombre completo" value={`${user.name} ${user.lastname}`} />
                <InfoRow label="Correo electrónico" value={user.email} />
                <InfoRow label="Teléfono" value={user.phone || '—'} />
            </View>

            {/* Links */}
            <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('About')}>
                <Text style={styles.linkText}>Sobre nosotros</Text>
                <Text style={styles.linkArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('Contact')}>
                <Text style={styles.linkText}>Contáctanos</Text>
                <Text style={styles.linkArrow}>›</Text>
            </TouchableOpacity>

            {admin && (
                <TouchableOpacity
                    style={[styles.linkRow, { backgroundColor: BizzusColors.goldPale }]}
                    onPress={() => navigation.navigate('ProductListScreen')}
                >
                    <Text style={[styles.linkText, { color: BizzusColors.gold, fontWeight: '700' }]}>
                        📦 Panel de inventario (Admin)
                    </Text>
                    <Text style={styles.linkArrow}>›</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BizzusColors.bg },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
    lockIcon: { fontSize: 44, marginBottom: 10 },
    title: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: '700', marginBottom: 6 },
    sub: { color: BizzusColors.mist, textAlign: 'center' },
    header: {
        backgroundColor: BizzusColors.ink, borderRadius: 16, padding: 22,
        flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 18,
    },
    avatar: {
        width: 64, height: 64, borderRadius: 32, backgroundColor: BizzusColors.gold,
        alignItems: 'center', justifyContent: 'center',
    },
    avatarText: { fontFamily: Fonts.serif, fontSize: 24, fontWeight: '700', color: BizzusColors.ink },
    name: { color: '#fff', fontFamily: Fonts.serif, fontSize: 18, fontWeight: '700' },
    email: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
    badge: {
        alignSelf: 'flex-start', backgroundColor: 'rgba(201,162,74,0.15)', borderWidth: 1,
        borderColor: 'rgba(201,162,74,0.3)', borderRadius: 20, paddingHorizontal: 10,
        paddingVertical: 3, marginTop: 8,
    },
    badgeText: { color: BizzusColors.gold, fontSize: 10, fontWeight: '700' },
    statsRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
    statCard: {
        flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16,
        borderWidth: 1, borderColor: BizzusColors.border,
    },
    statVal: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: '700', color: BizzusColors.ink },
    statLabel: { fontSize: 11, color: BizzusColors.mist, textTransform: 'uppercase', marginTop: 2 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 18, marginBottom: 18, borderWidth: 1, borderColor: BizzusColors.border },
    cardTitle: { fontFamily: Fonts.serif, fontSize: 17, fontWeight: '700', marginBottom: 12 },
    infoRow: {
        flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 9,
        borderBottomWidth: 1, borderBottomColor: BizzusColors.border,
    },
    infoLabel: { fontSize: 11, color: BizzusColors.mist, textTransform: 'uppercase' },
    infoValue: { fontSize: 13, fontWeight: '600', color: BizzusColors.ink },
    linkRow: {
        backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 10,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderWidth: 1, borderColor: BizzusColors.border,
    },
    linkText: { fontSize: 14, fontWeight: '600', color: BizzusColors.ink },
    linkArrow: { fontSize: 18, color: BizzusColors.mist },
    logoutBtn: {
        backgroundColor: BizzusColors.rust, borderRadius: 30, paddingVertical: 15,
        alignItems: 'center', marginTop: 10,
    },
    logoutText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
