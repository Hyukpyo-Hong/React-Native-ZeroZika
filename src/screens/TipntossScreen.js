import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

class TipntossScreen extends Component {
  static navigationOptions = {
    title: 'Tip N`Toss',
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
      <Text>TipntossScreen</Text>
    );
  }
}

export default TipntossScreen;
