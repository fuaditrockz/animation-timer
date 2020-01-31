import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class TimerBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingSecond: this.props.remainingSecond,
      hours: "",
      minutes: "",
      seconds: 0,
      isRunning: this.props.isRunning
    }
  }

  UNSAFE_componentWillMount() {
    const mins = this.state.remainingSecond / 60;
    const hrs = mins / 60;
    this.setState({
      hours: Math.floor(hrs),
      minutes: mins
    })
  }

  startCounting() {
    this.startCounting();
  }
  
  secondsCounting() {
    this.secondInterval = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1
      }))
    }, 1000)
  }

  render() {
    return (
       <>
         <View style={styles.container}>
           <View style={styles.wrapper}>

             <View style={styles.time}>
               <Text style={styles.text}>{this.state.hours}</Text>
             </View>

             <View style={styles.time}>
               <Text style={styles.text}>{this.state.minutes}</Text>
             </View>

             <View style={styles.time}>
               <Text style={styles.text}>{this.state.seconds}</Text>
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