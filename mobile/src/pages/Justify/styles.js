import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#e3e3e3',
        flex: 1,
        paddingHorizontal: 0,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingLeft: 10,
        marginTop: 20,
        marginHorizontal: 15,
    },
    name: {
        fontSize: 25,
        paddingVertical: 15,
        paddingHorizontal: 2,
    },
    optionContainer: {
        marginVertical: 20,
        marginHorizontal: 15,
    },
    option: {
        backgroundColor: 'white',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomColor: 'red',
        borderBottomWidth: 5,
    },
    optionText: {
        fontSize: 20
    },
    optionLogo: {},
    textInputMult: {
        padding: 10,
        fontSize: 20,
        marginTop: 8,
        textAlignVertical: 'top',
        textAlign: 'justify',
        width: 300, 
        backgroundColor: '#f2f2f2',
    },
    textInputPickerView: {
        fontSize: 20,
        marginTop: 8,
        width: 300, 
        height: 50,
        color: 'black',
        backgroundColor: '#f2f2f2',
    },
    textInputPicker: {
        textAlign: 'justify',
        width: 300, 
        height: 50,
    }
});