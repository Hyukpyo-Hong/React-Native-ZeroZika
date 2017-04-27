import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 20,
        alignItems: 'flex-end',
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
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    loadedContainer: {
        alignItems: 'center',
        flex: 1,
    },
    loadingtext: {
        backgroundColor: 'midnightblue',
        fontSize: 18,        
        color: 'white',
    },

    loadingContainer: {
        flex: 1,
        
        flexDirection: 'column',
        alignItems: 'center',
    },
    loadingtextBig: {
        backgroundColor: 'black',
        fontSize: 23,
        color: 'white',
    },
});

export default Style;