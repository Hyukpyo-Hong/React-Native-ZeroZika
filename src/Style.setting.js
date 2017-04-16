import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        alignItems: 'flex-start',
        margin:10,
    },
    rowTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        height: 40,
        width:200,
    },
    button: {
        borderRadius: 5,
        flexGrow: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
});

export default Style;