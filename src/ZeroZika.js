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
        header: {
            visible: false,
        }
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

AppRegistry.registerComponent('ZeroZika', () => MainScreen);