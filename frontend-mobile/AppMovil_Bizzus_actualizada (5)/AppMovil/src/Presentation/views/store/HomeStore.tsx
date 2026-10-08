import React from 'react';
import {
    View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BizzusColors, Fonts, Shadow } from '../../theme/AppTheme';
import { SectionHeader } from '../../components/store/SectionHeader';

const { width } = Dimensions.get('window');

const FEATURED = [
    require('../../../../assets/featured/kid-hoodie.jpg'),
    require('../../../../assets/featured/woman-top.jpg'),
    require('../../../../assets/featured/man-jacket.jpg'),
    require('../../../../assets/featured/woman-blazer.jpg'),
];

const TESTIMONIALS = [
    { name: 'Alejandra Gómez', city: 'Bogotá, Colombia', img: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Increíble calidad en cada prenda. Los colores son exactos a las fotos y el envío llegó rapidísimo.' },
    { name: 'Carlos Restrepo', city: 'Medellín, Colombia', img: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Me encanta el estilo de Bizzus. Siempre encuentro algo que se adapta a mi personalidad.' },
    { name: 'Valentina Torres', city: 'Cali, Colombia', img: 'https://randomuser.me/api/portraits/women/65.jpg', text: 'Excelente atención. Tuve un problema con mi talla y lo resolvieron de inmediato.' },
];

export const HomeStore = () => {
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* HERO */}
            <ImageHero />
            <View style={styles.heroTextWrap}>
                <Text style={styles.heroTitle}>
                    Viste con{'\n'}
                    <Text style={styles.heroEm}>carácter</Text> y actitud
                </Text>
                <Text style={styles.heroDesc}>
                    En OFICIAL BIZZUS cada prenda es una declaración. Diseños colombianos
                    con alma propia, tejidos premium y un estilo que no pide permiso.
                </Text>
                <View style={styles.heroBtns}>
                    <TouchableOpacity
                        style={styles.btnDark}
                        onPress={() => navigation.navigate('ProductsTab')}
                    >
                        <Text style={styles.btnDarkText}>Explorar Colección →</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnOutline}
                        onPress={() => navigation.navigate('About')}
                    >
                        <Text style={styles.btnOutlineText}>Sobre Nosotros</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* DESTACADOS */}
            <View style={styles.section}>
                <SectionHeader tag="Colección exclusiva" title="Estilo que marca tendencia" />
                <View style={styles.featuredGrid}>
                    {FEATURED.map((img, i) => (
                        <Image key={i} source={img} style={styles.featuredImg} />
                    ))}
                </View>
            </View>

            {/* TESTIMONIOS */}
            <View style={[styles.section, { backgroundColor: BizzusColors.ink }]}>
                <SectionHeader tag="Lo que dicen" title="Nuestros clientes" />
                {TESTIMONIALS.map((t) => (
                    <View key={t.name} style={styles.testiCard}>
                        <Text style={styles.testiStars}>★★★★★</Text>
                        <Text style={styles.testiText}>"{t.text}"</Text>
                        <View style={styles.testiAuthor}>
                            <Image source={{ uri: t.img }} style={styles.testiAvatar} />
                            <View>
                                <Text style={styles.testiName}>{t.name}</Text>
                                <Text style={styles.testiCity}>{t.city}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            <View style={{ height: 30 }} />
        </ScrollView>
    );
};

const ImageHero = () => (
    <Image
        source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80' }}
        style={{ width, height: width * 0.9 }}
    />
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BizzusColors.bg },
    heroTextWrap: { padding: 24, backgroundColor: BizzusColors.cream },
    heroTitle: { fontFamily: Fonts.serif, fontSize: 34, fontWeight: '700', color: BizzusColors.ink, lineHeight: 40 },
    heroEm: { fontStyle: 'italic', color: BizzusColors.gold },
    heroDesc: { color: BizzusColors.mist, fontSize: 14, lineHeight: 22, marginTop: 14 },
    heroBtns: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 },
    btnDark: { backgroundColor: BizzusColors.ink, paddingHorizontal: 20, paddingVertical: 13, borderRadius: 30 },
    btnDarkText: { color: '#fff', fontWeight: '700', fontSize: 13 },
    btnOutline: { borderWidth: 1.5, borderColor: BizzusColors.ink, paddingHorizontal: 20, paddingVertical: 13, borderRadius: 30 },
    btnOutlineText: { color: BizzusColors.ink, fontWeight: '700', fontSize: 13 },
    section: { padding: 24 },
    featuredGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    featuredImg: { width: '48%', aspectRatio: 1, borderRadius: 12, marginBottom: 12 },
    testiCard: { backgroundColor: '#1c1c1c', borderRadius: 14, padding: 18, marginBottom: 14 },
    testiStars: { color: BizzusColors.gold, marginBottom: 8 },
    testiText: { color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', fontSize: 13, lineHeight: 20, marginBottom: 14 },
    testiAuthor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    testiAvatar: { width: 40, height: 40, borderRadius: 20 },
    testiName: { color: '#fff', fontWeight: '700', fontSize: 13 },
    testiCity: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
});
