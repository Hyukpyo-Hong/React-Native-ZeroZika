import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    AppRegistry,
    Button,
    ActivityIndicator,
    DeviceEventEmitter,
    AsyncStorage,
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

import { Provider, connect } from 'react-redux'
import {
    createStore,
    applyMiddleware,
    bindActionCreators,
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import { reducer } from './reducer/reducer'
import { actionCreators } from './reducer/reducer'

import * as zikaActions from './actions/Actions';

import compute_risk from './model/compute_risk';

import BackgroundJob from 'react-native-background-job';
import PushNotificationAndroid from 'react-native-push-notification'


const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));


const mapStateToProps = (state) => ({
    properties: state,
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(zikaActions, dispatch);
};

class BackgroundImage extends Component {
    render() {
        return (
            <Image source={require('./images/title.png')} style={Style.backgroundImage} resizeMode='cover'>
                {this.props.children}
            </Image>
        )
    }
}

class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.properties.forecast === null
            || nextProps.properties.yesterday === null
            || nextProps.properties.today === null) {
            return false
        }
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.properties.city !== nextProps.properties.temp && !this.props.properties.isinitial) {
            this.props.reset_info(nextProps.properties.temp);
        }
    }
    componentWillMount() {
        if (this.props.properties.isinitial) {
            this.props.set_info();
            this.props.isinitial(false);
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        if (this.props.properties.iserror) {
            return (
                <BackgroundImage>
                    <View style={Style.loadingContainer}>
                        <Text style={Style.loadingtextBig}>
                            It is likely there are too many requests from other users. Please try again serveral minutes later.
                        </Text>
                    </View>
                </BackgroundImage>
            )
        }
        // Todo: Highlighting texts
        if (!this.props.properties.forecast || !this.props.properties.yesterday || !this.props.properties.today) {
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
        } else {
            var risk_set = compute_risk(this.props.properties.forecast, this.props.properties.yesterday, this.props.properties.today);

        }
        let buttonColor = '#6495ed';
        return (
            <BackgroundImage style={Style.container}>
                <View style={Style.loadedContainer}>
                    <Text style={Style.loadingtext}> Current Location: {this.props.properties.city}  </Text>
                </View>
                <View style={Style.buttonContainer}>
                    <View style={Style.buttonContainersub}>
                        <Button color={buttonColor} style={Style.menuButton} title={'Forecast'}
                            onPress={() => navigate('Forecast',
                                { today: this.props.properties.today, yesterday: this.props.properties.yesterday, forecast: this.props.properties.forecast, risk_set: risk_set })} />
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
    componentDidMount() { }
}

const _HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const _MainScreen = StackNavigator({
    Home: { screen: _HomeScreen },
    Forecast: { screen: ForecastScreen },
    Information: { screen: InformationScreen },
    Setting: { screen: SettingScreen },
    TipnToss: { screen: TipnTossScreen },
});

class MainScreen extends Component {
    render() {
        return (
            <Provider store={store}>
                <_MainScreen />
            </Provider>
        )
    }
}

//Push Notification Configure
var PushNotification = require('react-native-push-notification');
PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
});

//Background job for the Notification 
const backProcess = () => {
    AsyncStorage.getItem('city').then((city) => {
        console.log(city);
        zikaActions.backProcess(city); // ->> Need to Modify
        PushNotification.localNotification({
            /* Android Only Properties */
            id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            ticker: "My Notification Ticker", // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: "Current Zika Risk is High. Please refer to the Tip n' Toss video in Zero Zika App, and check around your location.", // (optional) default: "message" prop
            //subText: "This is a subText", // (optional) default: none
            color: "red", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: "group", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification

            /* iOS and Android properties */
            title: "Zero Zika Alarm!", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
            message: "Current Zika Risk is High.", // (required)
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            //repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
            //actions: '["Watch the Video"]',  // (Android only) See the doc for notification actions to know more
        });
    })

}

const backgroundJob = {
    jobKey: "alarm",
    job: () => console.log("Test")
//    job: () => backProcess()
};

BackgroundJob.register(backgroundJob);


AppRegistry.registerComponent('ZeroZika', () => MainScreen);