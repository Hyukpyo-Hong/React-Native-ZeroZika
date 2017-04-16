import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        //alignItems: 'flex-end',
    },
    buttonContainersub: {
        flex: 1,
    },
    menuButton: {
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    loadingtext: {
        backgroundColor: 'black',
        fontSize: 15,
        color: 'white',
    },
    loadingtextBig: {
        backgroundColor: 'black',
        fontSize: 23,
        color: 'white',
    },
});

export default Style;