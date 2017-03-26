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
  static navigationOptions = {
     header: {
       visible: false,  }};  
    render() {
            const { navigate } = this.props.navigation;
            let buttonColor='#6495ed';
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
