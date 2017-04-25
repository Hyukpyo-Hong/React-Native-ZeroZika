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

class BackgroundImage extends Component {
  render() {
    return (
      <Image source={require('../images/forecast.png')} style={Style.backgroundImage} resizeMode='cover'>
        {this.props.children}
      </Image>
    )
  }
}

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
      yesterday:this.props.navigation.state.params.yesterday,
      today:this.props.navigation.state.params.today,
    };

  }
  componentWillMount() {
  }
  render() {
    return (
      <BackgroundImage>
        <Forecast yesterday={this.state.yesterday} today={this.state.today} forecast={this.state.forecast} risk_set={this.state.risk_set} />
      </BackgroundImage>
    );
  }
}

class Forecast extends Component {
  constructor(props) {
    super(props);
    
    // Combine today + forecast
    var a = this.props.forecast.data
    var b = this.props.today.data;
    a.unshift(b[0]);
    //

    var dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url });
    this.state = {
      yesterday_weather: dataSource.cloneWithRows(this.props.yesterday.data),
      today_weather: dataSource.cloneWithRows(this.props.today.data),
      forecast: dataSource.cloneWithRows(this.props.forecast.data),
      yesterday: this.props.risk_set.yesterday, // Have to add something to display (need to string)
      today: this.props.risk_set.today,
      season: this.props.risk_set.season,
      temp: this.props.risk_set.temp,
      result: this.props.risk_set.result,
    };
    console.log("State:", this.state);
  }

  renderRow(rowData, sectionID, rowID) {
    var icon = iconMap[rowData.weather.icon];
    var date = rowData.datetime;
    var month = monthMap[date.substr(5, 2)];
    var day = date.substr(8, 2);
    var time = timeMap[date.substr(11, 2)];

    return (
      <TouchableHighlight
        underlayColor='#dddddd' >
        <View style={Style.forecast_container}>
          <Text style={Style.forecast_date}>{day}.{month}</Text>
          <Text style={Style.forecast_date}>{time}</Text>
          <View style={Style.forecast_weather}>
            <Image source={iconMap[rowData.weather.icon]} style={Style.forecast_icon} />
            <Text style={Style.forecast_desc}>{rowData.weather.description}</Text>
            <Text style={Style.forecast_temp}>{rowData.temp}(°F)</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  componentWillMount() {
    if (this.state.result === false) {
      this.setState({
        result: 'LOW ↓'
      })
    } else {
      this.setState({
        result: 'HIGH ↑'
      })
    }
    if (this.state.yesterday === false) {
      this.setState({
        yesterday: 'No'
      })
    }
    else {
      this.setState({
        yesterday: 'Yes'
      })
    }
    if (this.state.today === false) {
      this.setState({
        today: 'No'
      })
    }
    else {
      this.setState({
        today: 'Yes'
      })
    }
    if (this.state.season === false) {
      this.setState({
        season: 'No'
      })
    }
    else {
      this.setState({
        season: 'Yes'
      })
    }
    if (this.state.temp === false) {
      this.setState({
        temp: 'No'
      })
    }
    else {
      this.setState({
        temp: 'Yes'
      })
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <View style={Style.risk_container}>
          <Risk_result result={this.state.result} />
          <View style={Style.risk_factor_container}>
            <Text style={Style.risk_factor}> ✓ Rain Yesterday: {this.state.yesterday}</Text>
            <Text style={Style.risk_factor}> ✓ Rain Today: {this.state.today}</Text>
            <Text style={Style.risk_factor}> ✓ April~October: {this.state.season}</Text>
            <Text style={Style.risk_factor}> ✓ Above 50°F: {this.state.temp}</Text>
          </View>
        </View>
        <ListView
          dataSource={this.state.forecast}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}
class Risk_result extends Component {
  componentWillMount() {
    if (this.props.result === 'HIGH ↑') {
      this.setState({
        style: {
          backgroundColor: "red",
          flex: 1.7,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }
      })
    } else {
      this.setState({
        style: {
          backgroundColor: "steelblue",
          flex: 1.7,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }
      })
    }
  }
  render() {
    return (
      <View style={this.state.style}>
        <Text style={Style.risk_result_title}>Zika Risk</Text>
        <Text style={Style.risk_result}>{this.props.result}</Text>
      </View >
    )
  }
}

export default ForecastScreen;