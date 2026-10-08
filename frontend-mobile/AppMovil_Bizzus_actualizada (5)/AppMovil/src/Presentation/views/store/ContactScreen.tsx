import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert,
} from 'react-native';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { SectionHeader } from '../../components/store/SectionHeader';

const vEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const vName = (v: string) => /^[A-Za-zÀ-ÿñÑ\s]{2,40}$/.test(v.trim());

export const ContactScreen = () => {
    const [fn, setFn] = useState('');
    const [fa, setFa] = useState('');
    const [fe, setFe] = useState('');
    const [ft, setFt] = useState('');
    const [fmsg, setFmsg] = useState('');

    const send = () => {
        if (!vName(fn) || !vName(fa)) {
            Alert.alert('Revisa el formulario', 'Nombre y apellido deben tener solo letras (mín. 2 caracteres).');
            return;
        }
        if (!vEmail(fe.trim())) {
            Alert.alert('Revisa el formulario', 'El correo no es válido.');
            return;
        }
        if (fmsg.trim().length < 10) {
            Alert.alert('Revisa el formulario', 'Cuéntanos un poco más (mínimo 10 caracteres).');
            return;
        }
        Alert.alert('¡Mensaje enviado!', 'Te contactaremos pronto.');
        setFn(''); setFa(''); setFe(''); setFt(''); setFmsg('');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
            <SectionHeader tag="Hablemos" title="Contáctanos" />
            <Text style={styles.desc}>
                ¿Tienes dudas sobre productos, tallas o pedidos? Escríbenos y te respondemos a la brevedad.
            </Text>

            <View style={styles.infoBox}>
                <InfoLine icon="📍" label="Dirección" value="Dg. 36 #11 24, Soacha, Cundinamarca" />
                <InfoLine icon="📞" label="Teléfono" value="+57 3142985545" />
                <InfoLine icon="✉️" label="Correo" value="Oficialbizzus@gmail.com" />
                <InfoLine icon="🕒" label="Horario" value="Lun–Vie 9am–7pm · Sáb 10am–5pm" />
            </View>

            <View style={styles.row}>
                <TextInput style={[styles.input, { flex: 1 }]} placeholder="Nombre *" value={fn} onChangeText={setFn} placeholderTextColor={BizzusColors.mist} />
                <TextInput style={[styles.input, { flex: 1 }]} placeholder="Apellido *" value={fa} onChangeText={setFa} placeholderTextColor={BizzusColors.mist} />
            </View>
            <TextInput style={styles.input} placeholder="Correo *" keyboardType="email-address" autoCapitalize="none" value={fe} onChangeText={setFe} placeholderTextColor={BizzusColors.mist} />
            <TextInput style={styles.input} placeholder="Teléfono" keyboardType="phone-pad" value={ft} onChangeText={setFt} placeholderTextColor={BizzusColors.mist} />
            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Escríbenos tu consulta... *"
                multiline
                numberOfLines={5}
                value={fmsg}
                onChangeText={setFmsg}
                placeholderTextColor={BizzusColors.mist}
            />

            <TouchableOpacity style={styles.btn} onPress={send}>
                <Text style={styles.btnText}>Enviar mensaje →</Text>
            </TouchableOpacity>
            <View style={{ height: 30 }} />
        </ScrollView>
    );
};

const InfoLine = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <View style={styles.infoLine}>
        <Text style={{ fontSize: 18, marginRight: 10 }}>{icon}</Text>
        <View>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BizzusColors.bg },
    desc: { color: BizzusColors.mist, fontSize: 13, lineHeight: 20, marginBottom: 18 },
    infoBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 22, borderWidth: 1, borderColor: BizzusColors.border },
    infoLine: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
    infoLabel: { fontSize: 10, color: BizzusColors.gold, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
    infoValue: { fontSize: 13, color: BizzusColors.ink, marginTop: 2 },
    row: { flexDirection: 'row', gap: 10 },
    input: {
        borderWidth: 1.5, borderColor: BizzusColors.border, borderRadius: 10, paddingHorizontal: 14,
        paddingVertical: 12, fontSize: 14, backgroundColor: '#fff', marginBottom: 12, color: BizzusColors.ink,
    },
    textarea: { height: 110, textAlignVertical: 'top' },
    btn: { backgroundColor: BizzusColors.ink, borderRadius: 30, paddingVertical: 15, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
