import getDate from './getDate'
import { connect } from 'react-redux'
import { actionCreators } from '../reducer/reducer'



function getInfo() {
    try {
        //Get Latitude and Longitude
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const geo = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                store.dispatch(actionCreators.set_geo(geo));

                let key = '&key=d05c52f28c5e48d2afc4284807540cb2'
                let startdate = getDate(true);
                let enddate = getDate(false);
                let forecasturl = 'https://api.weatherbit.io/v1.0/forecast/3hourly?lat=' + this.state.latitude + '&lon=' + this.state.longitude + key;
                let yesterdayurl = 'https://api.weatherbit.io/v1.0/history?lat=' + this.state.latitude + '&lon=' + this.state.longitude + key + '&start_date=' + startdate + '&end_date=' + enddate + '&key=' + key;

                //Get forecast for 5 days
                fetch(forecasturl).then((response) => response.json())
                    .then((responseJson) => {
                        const city = responseJson.city_name + ', ' + responseJson.state_code;
                        const forecast = responseJson;
                        dispatch(actionCreators.set_city(city));
                        dispatch(actionCreators.set_forecast(forecast));

                        console.log("Forecast");
                        console.log(this.state.forecast);

                        if (this.props.properties.yesterday) {
                            dispatch(actionCreators.set_isloading(false));
                        }
                    }).done();

                //Get yesterday's weather informatin.
                fetch(yesterdayurl).then((response) => response.json())
                    .then((responseJson) => {
                        const yesterday = responseJson;
                        dispatch(actionCreators.set_yesterday(yesterday));

                        console.log("Yesterday");
                        console.log(this.state.yesterday);
                        if (this.props.properties.forecast) {
                            dispatch(actionCreators.set_isloading(false));
                        }
                    }).done();
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, },
            // This line makes geolocation not working. But looks like neccessary.
            //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    } catch (e) {
        console.log(e);
        this.setState({ loading: false, fetchError: true })
    }

}
export default getInfo;