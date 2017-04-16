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
} from 'react-native';
import { actionCreators } from '../model/reducer'
import Style from '../Style.setting';

const mapStateToProps = (state) => ({
  properties: state,
})



class SettingScreen extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      city: this.props.properties.city,
      alarm: this.props.properties.alarm
    }


  }
  static navigationOptions = {
    title: 'Setting',
  };

  save = () => {
    const { dispatch } = this.props;
    const { navigate } = this.props.navigation;
    var city = this.state.city;
    var alarm = this.state.alarm;
    if (city !== this.props.properties.city) {
      dispatch(actionCreators.set_city(city));
    }
    if (alarm !== this.props.properties.alarm) {
      dispatch(actionCreators.set_alarm(alarm));
    }
    navigate('Home')
  }

  render() {
    return (
      <View style={Style.container} >
        <View style={Style.row}>
          <Text style={Style.rowTitle}>Location(City, State)</Text>
          <TextInput style={Style.input}
            value={this.state.city}
            onChangeText={(text) => this.setState({ city: text })}
          />
        </View>
        <View style={Style.row}>
          <Text style={Style.rowTitle}>Notification</Text>
          <Switch value={this.state.alarm} onValueChange={(bool) => this.setState({ alarm: bool })} />
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