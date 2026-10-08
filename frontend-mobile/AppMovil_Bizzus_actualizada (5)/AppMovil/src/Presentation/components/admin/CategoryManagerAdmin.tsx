import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BizzusColors, Fonts } from '../../theme/AppTheme';
import { CategoryMeta } from '../../../Data/local/categoryMeta';
import { addCustomCategory, deleteCustomCategory } from '../../../Data/local/customCategories';

interface Props {
    categories: CategoryMeta[];
    isCustomCategory: (id: string) => boolean;
    onChange: () => void;
}

export const CategoryManagerAdmin = ({ categories, isCustomCategory, onChange }: Props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [err, setErr] = useState('');

    const submit = async () => {
        try {
            await addCustomCategory(name, img, categories.map((c) => c.id));
            setName('');
            setImg('');
            setErr('');
            onChange();
        } catch (e: any) {
            setErr(e.message || 'No se pudo agregar la categoría');
        }
    };

    const remove = (c: CategoryMeta) => {
        Alert.alert(
            'Eliminar categoría',
            `¿Eliminar la categoría "${c.name}"? Las prendas que la usen quedarán sin categoría visible.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteCustomCategory(c.id);
                        onChange();
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.header} onPress={() => setOpen(!open)}>
                <Text style={styles.headerTitle}>CATEGORÍAS ({categories.length})</Text>
                <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {open && (
                <View style={{ marginTop: 12 }}>
                    <View style={styles.chipsRow}>
                        {categories.map((c) => (
                            <View key={c.id} style={styles.chip}>
                                <Text style={styles.chipText}>{c.name}</Text>
                                {isCustomCategory(c.id) && (
                                    <TouchableOpacity onPress={() => remove(c)} style={{ marginLeft: 6 }}>
                                        <Text style={styles.chipRemove}>✕</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>

                    <TextInput
                        style={[styles.input, !!err && { borderColor: BizzusColors.rust }]}
                        placeholder="Nombre de la nueva categoría"
                        placeholderTextColor={BizzusColors.mist}
                        value={name}
                        onChangeText={(t) => { setName(t); setErr(''); }}
                    />
                    {!!err && <Text style={styles.errText}>{err}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder="URL de imagen (opcional)"
                        placeholderTextColor={BizzusColors.mist}
                        value={img}
                        onChangeText={setImg}
                    />
                    <TouchableOpacity style={styles.addBtn} onPress={submit}>
                        <Text style={styles.addBtnText}>+ Agregar categoría</Text>
                    </TouchableOpacity>
                    <Text style={styles.hint}>
                        Las categorías nuevas se guardan en este dispositivo (no en la base de datos) y
                        aparecen de inmediato en la tienda y en el formulario de prendas.
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16,
        borderWidth: 1, borderColor: BizzusColors.border,
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { fontSize: 12, fontWeight: '700', color: BizzusColors.mist, letterSpacing: 1 },
    chevron: { color: BizzusColors.mist, fontSize: 12 },
    chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
    chip: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: BizzusColors.warm,
        borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
    },
    chipText: { fontSize: 12, color: BizzusColors.ink, fontWeight: '600' },
    chipRemove: { color: BizzusColors.rust, fontWeight: '700', fontSize: 12 },
    input: {
        borderWidth: 1.5, borderColor: BizzusColors.border, borderRadius: 8, paddingHorizontal: 12,
        paddingVertical: 10, fontSize: 13, marginBottom: 8, color: BizzusColors.ink,
    },
    errText: { color: BizzusColors.rust, fontSize: 11, marginBottom: 6 },
    addBtn: { backgroundColor: BizzusColors.ink, borderRadius: 8, paddingVertical: 11, alignItems: 'center' },
    addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
    hint: { fontSize: 10, color: BizzusColors.mist, marginTop: 8, lineHeight: 15 },
});
