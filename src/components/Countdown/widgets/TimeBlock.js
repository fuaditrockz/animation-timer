import React, { Component } from 'react';
import {
  StyleSheet,
  Text, View
} from 'react-native';

function timeFormat(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}
export default class TimeBlock extends Component {
  render() {
    return (
      <View style={{
        backgroundColor: "#4a69bd",
        width: 80,
        height: 80,
        borderRadius: 10,
        justifyContent: 'center',
        position: this.props.position
      }}>
        <Text style={styles.text}>{timeFormat(this.props.time,'0', 2)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Digital7',
    fontSize: 50, 
    textAlign: "center", 
    color: "white",
  }
})
