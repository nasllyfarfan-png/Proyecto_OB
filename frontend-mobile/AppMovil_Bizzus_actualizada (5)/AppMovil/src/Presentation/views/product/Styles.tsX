import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },

    formAAD: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },

    formAADText: {
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10,
    },

});
