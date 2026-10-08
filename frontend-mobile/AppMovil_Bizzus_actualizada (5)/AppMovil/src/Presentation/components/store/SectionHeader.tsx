import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BizzusColors, Fonts } from '../../theme/AppTheme';

interface Props {
    tag: string;
    title: string;
    center?: boolean;
}

export const SectionHeader = ({ tag, title, center = true }: Props) => (
    <View style={[styles.wrap, center && { alignItems: 'center' }]}>
        <Text style={styles.tag}>{tag.toUpperCase()}</Text>
        <Text style={[styles.title, center && { textAlign: 'center' }]}>{title}</Text>
        <View style={styles.rule} />
    </View>
);

const styles = StyleSheet.create({
    wrap: { marginBottom: 20 },
    tag: {
        color: BizzusColors.gold,
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 2,
    },
    title: {
        fontFamily: Fonts.serif,
        fontSize: 26,
        fontWeight: '700',
        color: BizzusColors.ink,
        marginTop: 6,
    },
    rule: {
        width: 50,
        height: 3,
        backgroundColor: BizzusColors.gold,
        borderRadius: 3,
        marginTop: 10,
    },
});
