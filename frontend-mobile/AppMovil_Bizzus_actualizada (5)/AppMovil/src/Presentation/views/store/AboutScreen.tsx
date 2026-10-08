import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { SectionHeader } from '../../components/store/SectionHeader';

const FEATS = [
    { icon: '🌿', title: 'Materiales sostenibles', desc: 'Comprometidos con el planeta y prácticas éticas de producción.' },
    { icon: '🏅', title: 'Calidad garantizada', desc: 'Control estricto en cada etapa del proceso de fabricación.' },
    { icon: '❤️', title: 'Hecho con amor', desc: 'Diseños 100% originales colombianos con identidad única.' },
];

export const AboutScreen = () => {
    const navigation = useNavigation<any>();
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
            <Image
                source={{ uri: 'https://i.pinimg.com/736x/4b/3e/a7/4b3ea7ad237a40edc168f690e51cc39f.jpg' }}
                style={styles.mainImg}
            />
            <View style={styles.statBadge}>
                <Text style={styles.statNum}>4</Text>
                <Text style={styles.statLabel}>Años de{'\n'}experiencia</Text>
            </View>

            <SectionHeader tag="Quiénes somos" title="La historia detrás de OFICIAL BIZZUS" center={false} />
            <Text style={styles.desc}>
                Somos una marca colombiana nacida en 2022, impulsada por la pasión por la moda y el deseo de
                vestir a personas con estilo propio. Cada colección nace del detalle, del tejido impecable y
                de esa actitud que te hace único.
            </Text>

            {FEATS.map((f) => (
                <View key={f.title} style={styles.feat}>
                    <Text style={styles.featIcon}>{f.icon}</Text>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.featTitle}>{f.title}</Text>
                        <Text style={styles.featDesc}>{f.desc}</Text>
                    </View>
                </View>
            ))}

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Contact')}>
                <Text style={styles.btnText}>Contáctanos →</Text>
            </TouchableOpacity>
            <View style={{ height: 30 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BizzusColors.bg },
    mainImg: { width: '100%', aspectRatio: 4 / 3, borderRadius: 16, marginBottom: 12, backgroundColor: BizzusColors.warm },
    statBadge: {
        alignSelf: 'flex-start', backgroundColor: BizzusColors.ink, borderRadius: 12, padding: 14,
        marginBottom: 22,
    },
    statNum: { color: BizzusColors.gold, fontFamily: Fonts.serif, fontSize: 26, fontWeight: '700' },
    statLabel: { color: '#fff', fontSize: 11, marginTop: 2 },
    desc: { color: BizzusColors.mist, fontSize: 13, lineHeight: 21, marginBottom: 20 },
    feat: { flexDirection: 'row', gap: 14, marginBottom: 18, alignItems: 'flex-start' },
    featIcon: { fontSize: 22 },
    featTitle: { fontWeight: '700', fontSize: 14, color: BizzusColors.ink, marginBottom: 3 },
    featDesc: { fontSize: 12, color: BizzusColors.mist, lineHeight: 18 },
    btn: { backgroundColor: BizzusColors.ink, borderRadius: 30, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
