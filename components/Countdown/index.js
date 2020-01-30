import React, { Component } from 'react';
import {
  Button,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import TimerBlock from './TimerBlock';

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hours: "",
      minutes: "",
      seconds: "",
      status: ""
    }
  }

  startCountdown = () => {
    const dateNow = new Date();
    const deadline = new Date().setMinutes(dateNow.getMinutes() + 30);

    setInterval(function() {
      let now = dateNow.getTime();
      let t = deadline - now;
      var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
      var seconds = Math.floor((t % (1000 * 60)) / 1000);
      this.setState({ seconds: 30 })
      if(t < 0) {
        clearInterval(x);
        this.setState({ status: "EXPIRED" })
      }
    }, 1000)
  }

  setHours = (hrs) => {
    this.setState({
      hours: hrs
    })
  }

  setMinutes = (mins) => {
    this.setState({
      minutes: mins
    })
  }

  setSeconds(secs) {
    this.setState({
      seconds: secs
    })
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Countdown</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.mainContent}>
          <TimerBlock
            hours={this.state.hours}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.bottomBar}>
          <Button
            title="Start Again"
            onPress={() => this.startCountdown()}
            style={styles.bottomBarButton}
            color="#30336b"
          />
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#22a6b3",
    height: 60
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  bottomBar: {
    backgroundColor: "#c7ecee",
    justifyContent: "center", 
    paddingHorizontal: 10,
    position: 'absolute', 
    bottom: 0, 
    width: "100%",
    height: 80
  },
  bottomBarButton: {
    
  },
})
