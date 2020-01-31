import React, { Component } from 'react';
import {
  Animated,
  Text, View
} from 'react-native';

export default class SecondsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionValue: new Animated.Value(0),
      
    }
  }

  _slidingUp = () => {
    Animated.timing(this.state.positionValue, {
      totalValue: 1,
      duration: 1000
    }).start();
  }

  componentDidMount() {
    this._slidingUp()
  }

  render() {
    return (
      <View style={{
        flexDirection: 'column'
      }}>
        <Animated.View style={{
          backgroundColor: "#fa983a",
          width: 80,
          height: 80,
          borderRadius: 10,
          justifyContent: 'center',
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 50, textAlign: "center", color: "white" }}>{this.props.seconds}</Text>
        </Animated.View>
        <Animated.View style={{
          backgroundColor: "#fa983a",
          width: 80,
          height: 80,
          borderRadius: 10,
          justifyContent: 'center',
          position: "absolute",
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 50, textAlign: "center", color: "white" }}>{this.props.seconds}</Text>
        </Animated.View>
      </View>
    )
  }
}