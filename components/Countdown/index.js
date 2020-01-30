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
      seconds: '00',
      minutes: '00',
      hours: '00'
    }
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
