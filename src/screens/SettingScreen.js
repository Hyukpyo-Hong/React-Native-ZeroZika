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
} from 'react-native';
import { actionCreators } from '../reducer/reducer'
import Style from '../Style.setting';
import { NavigationActions } from 'react-navigation'

const backAction = NavigationActions.back({
})



const mapStateToProps = (state) => ({
  properties: state,
})

class SettingScreen extends Component {
  static navigationOptions = {
    title: 'Setting',
    header: navigation => ({
      style: {
        backgroundColor: 'rgb(47,54,61)'
      },
      titleStyle: {
        color: '#fefefe',
        fontWeight: '300',
      },
      tintColor: '#fefefe'
    })
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
      dispatch(actionCreators.set_alarm(alarm));
    }
    Keyboard.dismiss();
    this.props.navigation.dispatch(backAction)
    //navigate('Home'); -> make multiple windows
  }

  render() {
    return (
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
            color="#841584"
          />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(SettingScreen);