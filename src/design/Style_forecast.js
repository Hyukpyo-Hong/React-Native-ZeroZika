import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    forecast_icon: {
        flex: 1,
        width: 50,
        height: 50,
    },
    forecast_desc: {
        color: 'white',
        flex: 2,
    },
    forecast_temp: {
        color: 'white',
        flex: 1,
    },
    forecast_date: {
        color: 'white',
        flex: 1,
    },
    forecast_container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10
    },

    forecast_weather: {
        flex: 4,
        flexDirection: 'row',
    },

    risk_container: {
        backgroundColor: 'steelblue',
        flexDirection: 'row',

    },
    risk_result_container: {
        flex: 1.7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    risk_result_title: {
        fontSize: 23,
        color: 'white',
    },
    risk_result: {
        fontSize: 35,
        color: 'white',
    },
    risk_factor_container: {
        flex: 2,
        flexDirection: 'column',
    },

    risk_factor: {
        color: 'white',
        fontSize: 17,
    },

    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },

});

export default Style;