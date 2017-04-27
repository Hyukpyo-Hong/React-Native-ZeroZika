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
        fontSize: 17,
    },
    forecast_temp: {
        color: 'white',
        flex: 1,
        fontSize: 17,
    },
    forecast_date: {
        textAlign: 'center',
        color: 'white',
        flex: 1,
        fontSize: 18,
    },
    forecast_container: {
        marginTop: 2,
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff'
    },

    forecast_weather: {
        alignItems: 'center',
        flex: 4,
        flexDirection: 'row',
    },

    risk_container: {
        marginBottom: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'steelblue',
        flexDirection: 'row',

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