import types from '../reducer/reducer';
import { actionCreators } from '../reducer/reducer'
import getDate from '../model/getDate'
import { AsyncStorage } from 'react-native'

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
                let forecasturl = 'https://api.weatherbit.io/v1.0/forecast/3hourly?lat=' + geo.latitude + '&lon=' + geo.longitude + '&units=I' + key;
                let yesterdayurl = 'https://api.weatherbit.io/v1.0/history?lat=' + geo.latitude + '&lon=' + geo.longitude + '&start_date=' + startdate + '&end_date=' + enddate + '&units=I' + key;
                let todayurl = 'https://api.weatherbit.io/v1.0/current?lat=' + geo.latitude + '&lon=' + geo.longitude + '&units=I' + key;

                //Get forecast for 5 days
                fetch(forecasturl).then((response) => response.json())
                    .then((responseJson) => {
                        const city = responseJson.city_name + ', ' + responseJson.state_code;
                        const forecast = responseJson;
                        dispatch(actionCreators.set_city(city));
                        dispatch(actionCreators.set_forecast(forecast));
                        //console.log("Forecast", city, forecast);
                    }).done();

                //Get yesterday's weather informatin.
                fetch(yesterdayurl).then((response) => response.json())
                    .then((responseJson) => {
                        const yesterday = responseJson;
                        dispatch(actionCreators.set_yesterday(yesterday));
                        //console.log("Yesterday", yesterday);
                    }).done();

                //Get current weather informatin.
                fetch(todayurl).then((response) => response.json())
                    .then((responseJson) => {
                        const today = responseJson;
                        dispatch(actionCreators.set_today(today));
                        //console.log("Today", today);
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
    //Load Alarm Setting from storage
    let alarm = AsyncStorage.getItem('alarm').then((alarm) => {
        let _alarm = (alarm=='true');//String -> Bool
        dispatch(actionCreators.set_alarm(_alarm));
    })

}
function _reset_info(dispatch, city) {
    try {
        //Get current weather informatin. If latitude , longitude can be received, keep processing.
        let key = '&key=d05c52f28c5e48d2afc4284807540cb2'
        let todayurl = 'https://api.weatherbit.io/v1.0/current/geosearch?city=' + city + '&country=us&units=I&' + key;
        fetch(todayurl).then((response) => {
            if (response.status !== 204) {
                dispatch(actionCreators.set_init());
                return response.json();
            } else {
                console.log('Invalid City Name.');
                throw new BreakSignal();
            }
        })
            .then((responseJson) => {
                const today = responseJson;
                const city = responseJson.data[0].city_name + ', ' + responseJson.data[0].state_code;
                dispatch(actionCreators.set_city(city));

                console.log("Today", today);
                dispatch(actionCreators.set_today(today));
                const geo = {
                    latitude: today.data[0].lat,
                    longitude: today.data[0].lon,
                }
                dispatch(actionCreators.set_geo(geo));

                let startdate = getDate(true);
                let enddate = getDate(false);
                let forecasturl = 'https://api.weatherbit.io/v1.0/forecast/3hourly?lat=' + geo.latitude + '&lon=' + geo.longitude + '&units=I&country=us' + key;
                let yesterdayurl = 'https://api.weatherbit.io/v1.0/history/geosearch?city=' + city + '&start_date=' + startdate + '&end_date=' + enddate + '&country=us&units=I' + key;

                //Get forecast for 5 days
                fetch(forecasturl).then((response) => response.json())
                    .then((responseJson) => {
                        const forecast = responseJson;
                        dispatch(actionCreators.set_forecast(forecast));
                        console.log("Forecast", forecast);
                    }).done();

                //Get yesterday's weather informatin.
                fetch(yesterdayurl).then((response) => response.json())
                    .then((responseJson) => {
                        const yesterday = responseJson;
                        dispatch(actionCreators.set_yesterday(yesterday));
                        console.log("Yesterday", yesterday);
                    }).done();
            }).catch(BreakSignal, function () { }).done();
    } catch (e) {
        console.log(e);
    }
}


export function set_info() {
    return (dispatch) => {
        _set_info(dispatch);
    }
}

export function reset_info(city) {
    return (dispatch) => {
        _reset_info(dispatch, city);
    }
}

export function isinitial(value) {
    return (dispatch) => {
        dispatch(actionCreators.isinitial(value));
    }
}

export function set_risk(value) {
    return (dispatch) => {
        dispatch(actionCreators.set_risk(value));
    }
}