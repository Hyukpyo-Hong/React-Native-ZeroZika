import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Text,
  TextInput,
  Switch,
  Image,
  View,
  AppRegistry,
  Button,
  ActivityIndicator,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import { actionCreators } from '../reducer/reducer'
import Style from '../Style.setting';
import { NavigationActions } from 'react-navigation'
import BackgroundJob from 'react-native-background-job';


class BackgroundImage extends Component {
  render() {
    return (
      <Image source={require('../images/setting.png')} style={Style.backgroundImage} resizeMode='cover'>
        {this.props.children}
      </Image>
    )
  }
}

const backAction = NavigationActions.back({
})

const mapStateToProps = (state) => ({
  properties: state,
})

class SettingScreen extends Component {
  static navigationOptions = {
    title: 'Setting',
  }
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      city: this.props.properties.city,
      alarm: this.props.properties.alarm
    }
  }

  save = () => {
    const { dispatch } = this.props;
    const { navigate } = this.props.navigation;
    var city = this.state.city;
    var alarm = this.state.alarm;
    if (city !== this.props.properties.city) {
      city = encodeURI(city);
      dispatch(actionCreators.set_temp(city));
    }
    if (alarm !== this.props.properties.alarm) {
      switch (alarm) {
        case true:
          BackgroundJob.schedule({
            jobKey: "alarm",
            period: 500000,
            timeout: 5000,
            networkType: BackgroundJob.NETWORK_TYPE_UNMETERED
          });
          break;
        case false:
          BackgroundJob.cancel({ jobKey: "alarm" });
          break;
      }

      AsyncStorage.setItem('alarm', alarm.toString());
      dispatch(actionCreators.set_alarm(alarm));
    }
    Keyboard.dismiss();
    this.props.navigation.dispatch(backAction)
    //navigate('Home'); -> make multiple windows
  }

  render() {
    return (
      <BackgroundImage>
        <View style={Style.container} >
          <View style={Style.row}>
            <Text style={Style.rowTitle}>Location(City, State)</Text>
            <TextInput style={Style.input}
              placeholder={this.state.city}
              onChangeText={(text) => this.setState({ city: text })}
            />
          </View>
          <View style={Style.row}>
            <Text style={Style.rowTitle}>Notification</Text>
            <Switch value={this.state.alarm} onValueChange={(bool) => { this.setState({ alarm: bool }); Keyboard.dismiss(); }
            } />
          </View>
          <View>
            <Button
              onPress={this.save}
              title="Save Properties"
              color="#6495ed"
            />
          </View>
        </View>
      </BackgroundImage>
    )
  }
}

export default connect(mapStateToProps)(SettingScreen);