import { StyleSheet } from "react-native";

// Paleta tomada de la web (bizzus-react-router/src/index.css)
// para que la app móvil se vea consistente con el sitio.
export const BizzusColors = {
    bg: '#f7f4ef',
    white: '#ffffff',
    ink: '#111111',
    gold: '#c9a24a',
    goldLight: '#d8b35c',
    goldPale: '#fdf6e7',
    mist: '#6b6257',
    line: '#e8e1d8',
    warm: '#f2ede6',
    cream: '#faf7f2',
    border: '#e8e1d8',
    rust: '#c0392b',
    success: '#2e7d32',
    successBg: '#e8f5e9',
};

// Se conserva por retrocompatibilidad con pantallas existentes.
export const MyColors = {
    background: BizzusColors.bg,
    primary: BizzusColors.gold,
    secondary: BizzusColors.rust,
};

export const Fonts = {
    serif: 'serif',
    sans: 'System',
};

export const Shadow = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
});
