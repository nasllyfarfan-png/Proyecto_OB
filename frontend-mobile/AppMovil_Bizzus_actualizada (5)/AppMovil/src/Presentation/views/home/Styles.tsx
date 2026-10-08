import { StyleSheet } from "react-native";

// HOT RELOAD - Cambios en caliente

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    ImageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%',
    },
    form: {
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 10,
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    formRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
},
    formRegisterText: {
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10,
},
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '15%',
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default HomeStyles; 