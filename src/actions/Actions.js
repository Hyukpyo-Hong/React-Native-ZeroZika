import types from '../reducer/reducer';
import { actionCreators } from '../reducer/reducer'
import getDate from '../model/getDate'

function _set_info(dispatch) {
    try {
        //Get Latitude and Longitude
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const geo = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                dispatch(actionCreators.set_geo(geo));

                let key = '&key=d05c52f28c5e48d2afc4284807540cb2'
                let startdate = getDate(true);
                let enddate = getDate(false);
                let forecasturl = 'https://api.weatherbit.io/v1.0/forecast/3hourly?lat=' + geo.latitude + '&lon=' + geo.longitude + key;
                let yesterdayurl = 'https://api.weatherbit.io/v1.0/history?lat=' + geo.latitude + '&lon=' + geo.longitude + key + '&start_date=' + startdate + '&end_date=' + enddate + '&key=' + key;

                //Get forecast for 5 days
                fetch(forecasturl).then((response) => response.json())
                    .then((responseJson) => {
                        const city = responseJson.city_name + ', ' + responseJson.state_code;
                        const forecast = responseJson;
                        dispatch(actionCreators.set_city(city));
                        dispatch(actionCreators.set_forecast(forecast));
                        console.log("Forecast", city, forecast);
                    }).done();

                //Get yesterday's weather informatin.
                fetch(yesterdayurl).then((response) => response.json())
                    .then((responseJson) => {
                        const yesterday = responseJson;
                        dispatch(actionCreators.set_yesterday(yesterday));
                        console.log("Yesterday", yesterday);
                    }).done();
            },
            (error) => {
                dispatch(actionCreators.iserror(true));
            },
            { enableHighAccuracy: true, timeout: 20000, },
            // This line makes geolocation not working. But looks like neccessary.
            //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    } catch (e) {
        console.log(e);
        dispatch(actionCreators.iserror(true));
    }
}



export function set_info() {
    return (dispatch) => {
        _set_info(dispatch);
    }
}
