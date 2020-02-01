import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

function timeFormat(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export default class TimerBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeValue: new Animated.Value(0)
    }
  }

  _start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 3000
    }).start();
  };

  componentDidMount() {
    this._start()
  }
  
  render() {
    return (
       <>
         <View style={styles.container}>
           <View>
              <Animated.Text
                style={{
                  opacity: this.state.fadeValue,
                }}
              >
                Hello World
              </Animated.Text>
           </View>
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