import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  style,
  ScrollView,
  StyleSheet,

} from 'react-native';

import Style from '../Style';

class BackgroundImage extends Component {
  render() {
    return (
      <Image source={require('../images/top5.jpg')} style={Style.backgroundImage} resizeMode='cover'>
        {this.props.children}
      </Image>
    )
  }
}


class InformationScreen extends Component {
  static navigationOptions = {
    title: 'Information',
  }
  render() {
    return (
      <View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollView}
        >
          <BackgroundImage>
            <Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text><Text> </Text>
          </BackgroundImage>
        </ScrollView >
      </View >

    );
  }
}
var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#eeeeee',
    height: 600,
  },
})

export default InformationScreen;

