import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    AppRegistry,
    Button
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




function getYesterday(yesterday) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1; //January is 0!

    if (yesterday) {
        var dd = today.getDate() - 1;
    } else {
        var dd = today.getDate();
    }
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;

}


class BackgroundImage extends Component {
    render() {
        return (
            <Image source={require('./images/logo.png')}
                style={Style.backgroundImage} resizeMode='cover'>
                {this.props.children}
            </Image>
        )
    }
}


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { latitude: null, longitude: null };

        //Get Latitude and Longitude
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.state.latitude = position.coords.latitude;
                this.state.longitude = position.coords.longitude;

                var key = '&key=d05c52f28c5e48d2afc4284807540cb2'
                var startdate = getYesterday(true);
                var enddate = getYesterday(false);
                var forecasturl = 'https://api.weatherbit.io/v1.0/forecast/3hourly?lat=' + this.state.latitude + '&lon=' + this.state.longitude + key;
                var yesterdayurl = 'https://api.weatherbit.io/v1.0/history?lat=' + this.state.latitude + '&lon=' + this.state.longitude + key + '&start_date=' + startdate + '&end_date=' + enddate + '&key=' + key;

                fetch(forecasturl).then((response) => response.json())
                    .then((responseJson) => {
                        console.log("Forecast");
                        console.log(responseJson);
                    }).done();

                fetch(yesterdayurl).then((response) => response.json())
                    .then((responseJson) => {
                        console.log("Yesterday");
                        console.log(responseJson);
                    }).done();
            },
            // This line makes geolocation not working. But looks like neccessary.
            //  (error) => this.setState({ error: error.message }),
            //  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    componentWillMount() {

    }


    static navigationOptions = {
        header: {
            visible: false,
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        let buttonColor = '#6495ed';

        return (

            <BackgroundImage>
                <View style={Style.buttonContainer}>
                    <View style={Style.buttonContainersub}>
                        <Button color={buttonColor} style={Style.menuButton} title={'Forecast'} onPress={() => navigate('Forecast')} />
                        <Button color={buttonColor} style={Style.menuButton} title={'Information'} onPress={() => navigate('Information')} />
                    </View>
                    <View style={Style.buttonContainersub}>
                        <Button color={buttonColor} style={Style.menuButton} title={'Tip N`Toss'} onPress={() => navigate('TipnToss')} />
                        <Button color={buttonColor} style={Style.menuButton} title={'Setting'} onPress={() => navigate('Setting')} />
                    </View>
                </View>
            </BackgroundImage>

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
