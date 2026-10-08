import { StyleSheet } from "react-native";
import { BizzusColors, Fonts, MyColors } from "../../../theme/AppTheme";

const ProductFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.background,
    },
    form: {
        padding: 25,
    },
    title: {
        fontFamily: Fonts.serif,
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        color: BizzusColors.ink,
    },
    buttonContainer: {
        marginTop: 30,
    },
    previewWrap: {
        marginTop: 16,
        alignItems: 'flex-start',
    },
    preview: {
        width: 110,
        height: 130,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BizzusColors.border,
        backgroundColor: BizzusColors.warm,
    },
});

export default ProductFormStyles;
