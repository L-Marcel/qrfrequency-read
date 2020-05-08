import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#e3e3e3',
        flex: 1,
        paddingHorizontal: 0,
    },
    scanner: {
        height: 640,
    },
    scannerMark: {
        position: 'absolute',
        bottom: 200,
        left: 52,
    },
    scannerButton: {
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 360,
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    scannerButtonText: {
        marginVertical: 8,
        fontSize: 25,
        color: 'white',
    },
});