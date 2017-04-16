import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    AppRegistry,
    Button,
    ActivityIndicator,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import ForecastScreen from './screens/ForecastScreen'
import InformationScreen from './screens/InformationScreen'
import SettingScreen from './screens/SettingScreen'
import TipnTossScreen from './screens/TipntossScreen'

import Style from './Style';
import getDate from './model/getDate'
import { reducer } from './model/reducer'
import { actionCreators } from './model/reducer'


const store = createStore(reducer);

const mapStateToProps = (state) => ({
    properties: state,
})

class BackgroundImage extends Component {
    render() {
        return (
            <Image source={require('./images/logo.png')} style={Style.backgroundImage} resizeMode='cover'>
                {this.props.children}
            </Image>
        )
    }
}

class _HomeScreen extends Component {
    static navigationOptions = {
        header: {
            visible: false,
        }
    };
    render() {
        return (
            <Provider store={store}>
                <__HomeScreen store={store} navigation={this.props.navigation} />
            </Provider>
        )
    }
}

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            latitude: null, longitude: null, error: null,
            forecast: null, yesterday: null,
            city_name: null,
            loading: true, fetchError: false,
        };
    }
    componentWillMount() {


    }

    componentDidMount() {
        const { dispatch } = this.props;
        try {
            //Todo: Seperate from this file
            //Get Latitude and Longitude
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const geo = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                    dispatch(actionCreators.set_geo(geo));
                    this.setState({
                        latitude: geo.latitude,
                        longitude: geo.longitude,
                        error: null,
                    });

                    let key = '&key=d05c52f28c5e48d2afc4284807540cb2'
                    let startdate = getDate(true);
                    let enddate = getDate(false);
                    let forecasturl = 'https://api.weatherbit.io/v1.0/forecast/3hourly?lat=' + this.state.latitude + '&lon=' + this.state.longitude + key;
                    let yesterdayurl = 'https://api.weatherbit.io/v1.0/history?lat=' + this.state.latitude + '&lon=' + this.state.longitude + key + '&start_date=' + startdate + '&end_date=' + enddate + '&key=' + key;

                    //Get forecast for 5 days
                    fetch(forecasturl).then((response) => response.json())
                        .then((responseJson) => {
                            const city = responseJson.city_name;
                            const forecast = responseJson;
                            dispatch(actionCreators.set_city(city));
                            dispatch(actionCreators.set_forecast(forecast));
                            this.setState({
                                forecast: forecast,
                                city_name: city,
                            });
                            console.log("Forecast");
                            console.log(this.state.forecast);



                            if (this.state.yesterday) {
                                this.setState({ loading: false });
                            }
                        }).done();

                    //Get yesterday's weather informatin.
                    fetch(yesterdayurl).then((response) => response.json())
                        .then((responseJson) => {
                            const yesterday = responseJson;
                            dispatch(actionCreators.set_yesterday(yesterday));
                            this.setState({
                                yesterday: yesterday,
                            });
                            console.log("Yesterday");
                            console.log(this.state.yesterday);


                            if (this.state.forecast) {
                                this.setState({ loading: false });
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
    render() {
        const { navigate } = this.props.navigation;
        let buttonColor = '#6495ed';

        // Todo: Highlighting texts
        if (this.state.loading) {
            return (
                <BackgroundImage>
                    <View style={Style.loadingContainer}>
                        <ActivityIndicator animating={true} />
                        <Text style={Style.loadingtextBig}>  Forecast loading.  </Text>
                        <Text />
                        <Text style={Style.loadingtext}>  It takes a few seconds.  </Text>
                    </View>
                </BackgroundImage>
            )
        }

        if (this.state.fetchError) {
            return (
                <View style={Style.center}>
                    <Text>
                        It is likely there are too many requests from other users. Please try again serveral minutes later.
          </Text>
                </View>
            )
        }

        return (

            <BackgroundImage>
                <View style={Style.buttonContainer}>
                    <View style={Style.buttonContainersub}>
                        <Button color={buttonColor} style={Style.menuButton} title={'Forecast'} onPress={() => navigate('Forecast', { forecast: this.state.forecast })} />
                        <Button color={buttonColor} style={Style.menuButton} title={'Information'} onPress={() => navigate('Information')} />
                    </View>
                    <View style={Style.buttonContainersub}>
                        <Button color={buttonColor} style={Style.menuButton} title={'Tip N`Toss'} onPress={() => navigate('TipnToss')} />
                        <Button color={buttonColor} style={Style.menuButton} title={'Setting'} onPress={() => navigate('Setting', { store: { store } })} />
                    </View>
                </View>
            </BackgroundImage>
            /*
            <View >
            <Text> Latitude: {this.state.latitude} </Text>
            <Text> Longitude: {this.state.longitude} </Text>
            <Text>City: {this.state.city_name}</Text>
            </View>
                */
        )
    }
}

const __HomeScreen = connect(mapStateToProps)(HomeScreen);

const MainScreen = StackNavigator({
    Home: { screen: _HomeScreen },
    Forecast: { screen: ForecastScreen },
    Information: { screen: InformationScreen },
    Setting: { screen: SettingScreen },
    TipnToss: { screen: TipnTossScreen },
});


AppRegistry.registerComponent('ZeroZika', () => MainScreen);