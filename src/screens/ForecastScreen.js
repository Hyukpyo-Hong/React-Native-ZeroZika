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

import Style from '../design/Style_forecast';

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
  }
  render() {
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
      dataSource: dataSource.cloneWithRows(this.props.forecast.data),
      yesterday: this.props.risk_set.yesterday + "", // Have to add something to display (need to string)
      today: this.props.risk_set.today + "",
      season: this.props.risk_set.season + "",
      temp: this.props.risk_set.temp + "",
      result: this.props.risk_set.result + "",
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
        underlayColor='#dddddd' style={Style.forecast_container}>
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
  componentWillMount() {
    if (this.state.result === 'false') {
      this.setState({
        result: 'LOW'
      })
    } else {
      this.setState({
        result: 'HIGH'
      })
    }

  }
  render() {
    return (
      <View style={Style.container}>
        <View style={Style.risk_container}>
          <Text style={Style.risk_result}>Risk: {this.state.result}</Text>
          <View style={Style.risk_factor_container}>
            <Text style={Style.risk_factor}>Rain Yesterday: {this.state.yesterday}</Text>
            <Text style={Style.risk_factor}>Rain Today: {this.state.today}</Text>
            <Text style={Style.risk_factor}>April~October: {this.state.season}</Text>
            <Text style={Style.risk_factor}>Above 50°F: {this.state.temp}</Text>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}


export default ForecastScreen;