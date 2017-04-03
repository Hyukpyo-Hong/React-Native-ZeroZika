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

import ForecastScreen from './screens/ForecastScreen'
import InformationScreen from './screens/InformationScreen'
import SettingScreen from './screens/SettingScreen'
import TipnTossScreen from './screens/TipntossScreen'

import Style from './Style';
import getDate from './model/getDate'


class BackgroundImage extends Component {
    render() {
        return (
            <Image source={require('./images/logo.png')} style={Style.backgroundImage} resizeMode='cover'>
                {this.props.children}
            </Image>
        )
    }
}


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null, longitude: null, error: null,
            forecast: null, yesterday: null,
            city_name: null,
            loading: true, fetchError: false,
            a: 'A is not here!',

        };
    }
    componentWillMount() {
        try {
            //Todo: Seperate from this file
            //Get Latitude and Longitude
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });


                    let key = '&key=d05c52f28c5e48d2afc4284807540cb2'

                    let startdate = getDate(true);
                    let enddate = getDate(false);
                    let forecasturl = 'https://api.weatherbit.io/v1.0/forecast/3hourly?lat=' + this.state.latitude + '&lon=' + this.state.longitude + key;
                    let yesterdayurl = 'https://api.weatherbit.io/v1.0/history?lat=' + this.state.latitude + '&lon=' + this.state.longitude + key + '&start_date=' + startdate + '&end_date=' + enddate + '&key=' + key;
                    console.log(forecasturl);
                    console.log(yesterdayurl);

                    //Get forecast for 5 days
                    fetch(forecasturl).then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                forecast: responseJson,
                                city_name: responseJson.city_name,
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
                            this.setState({
                                yesterday: responseJson
                            });
                            console.log("Yesterday");
                            console.log(this.state.yesterday);
                            if (this.state.forecast) {
                                this.setState({ loading: false });
                            }
                        }).done();
                },
                // This line makes geolocation not working. But looks like neccessary.
                //  (error) => this.setState({ error: error.message }),
                //  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        } catch (e) {
            console.log(e);
            this.setState({ loading: false, fetchError: true })
        }

    }

    static navigationOptions = {
        header: {
            visible: false,
        }
    };

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
                        Failed to load Weather Information! It is likely there are too many requests from other users. Please try later.
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
                        <Button color={buttonColor} style={Style.menuButton} title={'Setting'} onPress={() => navigate('Setting')} />
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

const MainScreen = StackNavigator({
    Home: { screen: HomeScreen },
    Forecast: { screen: ForecastScreen },
    Information: { screen: InformationScreen },
    Setting: { screen: SettingScreen },
    TipnToss: { screen: TipnTossScreen },
});


AppRegistry.registerComponent('ZeroZika', () => MainScreen);