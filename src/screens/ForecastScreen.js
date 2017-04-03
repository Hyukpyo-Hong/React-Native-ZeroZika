import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

import iconMap from '../images/iconMap'
import monthMap from '../model/monthMap'
import timeMap from '../model/timeMap'

class ForecastScreen extends Component {

  static navigationOptions = {
    title: 'Forecast',
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Forecast forecast={params.forecast} />
      </View>
    );
  }
}

class Forecast extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url });
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.forecast.data)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    var icon = iconMap[rowData.weather.icon];
    var date = rowData.datetime;
    var month = monthMap[date.substr(5, 2)];
    var day = date.substr(8, 2);
    var time = timeMap[date.substr(11, 2)];


    return (
      <TouchableHighlight
        underlayColor='#dddddd'>
        <View>
          <Text>{time}  {day}.{month}</Text>
          <View style={Style.weather}>
            <Image source={iconMap[rowData.weather.icon]} style={Style.icon} />
            <Text>{rowData.weather.description} {Math.round(rowData.temp * 9 / 5 + 32)}(°F)</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
    );
  }
}

var Style = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
  weather: {
    flexDirection: 'row',
  }
});


export default ForecastScreen;
