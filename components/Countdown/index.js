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
      remainingSecond: 240,
      time: {},
      isRunning: false
    }
    this.startCountdown = this.startCountdown.bind(this);
  }

  UNSAFE_componentWillMount() {
    const mins = this.state.remainingSecond / 60;
    const hrs = mins / 60;
    this.setState({
      time: {
        hours: Math.floor(hrs),
        minutes: mins,
        seconds: 10
      }
    })
  }

  startCountdown() {
    let isRunning = this.state.isRunning;
    if(isRunning === false) {
      this.setState({ isRunning: true })
      /* this.interval = setInterval(() => this.tick(), 1000); */
    } else {
      this.setState({ isRunning: false })
      /* clearInterval(this.interval); */
    }
  }

  tick() {
    if(this.state.time.seconds <= 0) {
      this.setState(prevState => ({
        time: {
          seconds: 60
        }
      }));
    }

    this.setState(prevState => ({
      time: {
        hours: this.state.hours,
        minutes: this.state.minutes,
        seconds: prevState.time.seconds - 1
      }
    }));
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Countdown</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.mainContent}>
          <TimerBlock
            remainingSecond={240}
            isRunning={false}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.bottomBar}>
          {this.state.isRunning ? (
            <Button
              title="Stop"
              onPress={this.startCountdown}
              style={styles.bottomBarButton}
              color="#30336b"
            />
          ) : (
            <Button
              title="Start"
              onPress={this.startCountdown}
              style={styles.bottomBarButton}
              color="#30336b"
            />
          )}
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
