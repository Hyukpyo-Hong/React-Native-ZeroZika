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
    this.state = {
      risk_set: this.props.navigation.state.params.risk_set,
      forecast: this.props.navigation.state.params.forecast,
    };

  }
  componentWillMount() {
    console.log(this.state);
  }
  render() {

    const { params } = this.props.navigation.state;
    return (
      <View>
        <Forecast forecast={this.state.forecast} risk_set={this.state.risk_set} />
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
            <Text>{rowData.weather.description} {rowData.temp}(°F)</Text>
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
