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
        };
    }
    componentWillMount() { }
    componentDidMount() {
        this.props.set_info();
    }
    static navigationOptions = {
        header: {
            visible: false,
        }
    };
    render() {
        const { navigate } = this.props.navigation;
        let buttonColor = '#6495ed';

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
        if (!this.props.properties.forecast && !this.props.properties.yesterday) {
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

        return (

            <BackgroundImage>
                <View style={Style.buttonContainer}>
                    <View style={Style.buttonContainersub}>
                        <Button color={buttonColor} style={Style.menuButton} title={'Forecast'} onPress={() => navigate('Forecast', { forecast: this.props.properties.forecast })} />
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