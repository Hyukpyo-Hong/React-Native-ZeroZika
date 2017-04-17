import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

class InformationScreen extends Component {
  static navigationOptions = {
    title: 'Information',
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
  render() {
    return (
      <Text>InformationScreen</Text>
    );
  }
}

export default InformationScreen;
