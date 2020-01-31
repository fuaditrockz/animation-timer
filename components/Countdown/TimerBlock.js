import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

function timeFormat(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export default class TimerBlock extends Component {
  render() {
    return (
       <>
         <View style={styles.container}>
           <View style={styles.wrapper}>

             <View style={styles.time}>
               <Text style={styles.text}>{timeFormat(this.props.hours,'0', 2)}</Text>
             </View>

             <View style={styles.time}>
               <Text style={styles.text}>{timeFormat(this.props.minutes,'0', 2)}</Text>
             </View>

             <View style={styles.time}>
               <Text style={styles.text}>{timeFormat(this.props.seconds,'0', 2)}</Text>
             </View>

           </View>
         </View>
       </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    /* backgroundColor: "blue", */
    height: 150,
    paddingHorizontal: 50,
    paddingVertical: 20
  },
  wrapper: {
    /* backgroundColor: "yellow", */
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  time: {
    /* backgroundColor: "white", */
    height: "100%",
    width: 80,
    textAlign: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 70,
    color: "#eb4d4b"
  }
})