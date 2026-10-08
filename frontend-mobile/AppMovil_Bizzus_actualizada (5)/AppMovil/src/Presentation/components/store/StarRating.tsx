import React from 'react';
import { Text } from 'react-native';
import { BizzusColors } from '../../theme/AppTheme';

export const StarRating = ({ value = 5, size = 12 }: { value?: number; size?: number }) => (
    <Text style={{ color: BizzusColors.gold, fontSize: size, letterSpacing: 1 }}>
        {'★'.repeat(value)}
        {'☆'.repeat(Math.max(0, 5 - value))}
    </Text>
);
