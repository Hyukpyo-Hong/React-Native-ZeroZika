import React, { Component } from 'react';
import {
  Text,
  View,  
} from 'react-native';

class ForecastScreen extends Component {
  static navigationOptions = {
    title: 'Forecast',
  };  
  render() {
    return (
        <Text>Forecast</Text>
    );
  }
}

export default ForecastScreen;
