import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  Text, View
} from 'react-native';

function timeFormat(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}
export default class TimeBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positionValue: new Animated.Value(0),
    }
  }

  _start = () => {
    Animated.timing(this.state.positionValue, {
      totalValue: 1,
      duration: 1000
    }).start();
  }

  componentDidMount() {
    this._start()
  }

  render() {
    return (
      <Animated.View style={{
        backgroundColor: "#fa983a",
        width: 80,
        height: 80,
        borderRadius: 10,
        justifyContent: 'center',
      }}>
        <Text style={styles.text}>{timeFormat(this.props.time,'0', 2)}</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  text: {
    fontFamily: 'Digital7',
    fontSize: 50, 
    textAlign: "center", 
    color: "white",
  }
})
