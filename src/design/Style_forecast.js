import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    forecast_container: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    icon: {
        width: 50,
        height: 50,
    },
    weather: {
        flexDirection: 'row',
    },


    risk_factor_container: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    risk_factor: {
        backgroundColor: 'black',
        fontSize: 15,
        color: 'white',
    },

    risk_container: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    risk_result: {
        backgroundColor: 'darkblue',
        fontSize: 23,
        color: 'white',
        alignItems: 'stretch',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },

});

export default Style;