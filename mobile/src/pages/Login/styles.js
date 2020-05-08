import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#e3e3e3',
        flex: 1,
        paddingHorizontal: 0,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal: 15,
    },
    title: {
        fontSize: 25,
        paddingVertical: 15,
    },
    loginContainer: {
        backgroundColor: 'white',
        marginVertical: 20,
        marginHorizontal: 15,
    },
    loginText: {
        fontSize: 22,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        borderLeftColor: '#d1d1d1',
        borderLeftWidth: 1,
        padding: 5,
    },
    passLogo: {
        marginVertical: 5,
        marginRight: 5,
    },
    userLogo: {
        marginVertical: 5,
        marginRight: 5,
    },
    input: {
        fontSize: 15,
        paddingVertical: 5,
        width: 250,
    },
    switchContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5,
    },
    switch: {},
    switchText: {
        marginVertical: 3,
    },
    loginButton: {
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'center',
        marginTop: 5,
    },
    loginButtonText: {
        fontSize: 20,
        color: 'white',
        padding: 7,
    },
});