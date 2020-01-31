import React, { Component } from 'react';
import {
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert
} from 'react-native';
import TimerBlock from './TimerBlock';

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingSecond: this.props.remainingSecond,
      time: {},
      buttonStatus: false
    }
    this.handleStartStop = this.handleStartStop.bind(this);
  }

  setupTime() {
    const remainingSecond = this.state.remainingSecond;
    if (remainingSecond <= 60 || remainingSecond <= 0) {
      this.state.time.seconds = remainingSecond;
      this.state.time.minutes = 0;
      this.state.time.hours = 0;
    } else if(this.state.remainingSecond > 60) {
      this.state.time.minutes = Math.floor(remainingSecond / 60);
      this.state.time.seconds = Math.floor(remainingSecond - this.state.time.minutes * 60);
      this.state.time.hours = Math.floor(remainingSecond / 3600);
    } 
  }

  UNSAFE_componentWillMount() {
    this.setupTime();
  }

  handleStartStop() {
    if (this.timer) {
      this.timer = clearInterval(this.timer);
      this.setState({
        buttonStatus: false
      })
      return null;
    }

    this.timer = setInterval(() => this.setState(prevState => {
      if (prevState.time.seconds === 0 && prevState.time.minutes >= 1) {
        return {
          time: {
            seconds: 59,
            minutes: this.state.time.minutes - 1,
            hours: this.state.time.hours
          }
        }
      } else if (prevState.time.seconds === 0 && prevState.time.minutes === 0) {
        this.resetState();
        this.timer = clearInterval(this.timer);
        return null;
      }

      return {
        buttonStatus: true,
        time: {
          seconds: prevState.time.seconds - 1,
          minutes: this.state.time.minutes,
          hours: this.state.time.hours,
        }
      }
    }), 1000)
  }

  resetState() {
    Alert.alert(
      'Done',
      'The countdown was finished.',
      [{text: 'OK', onPress: () => console.log("Close alert.")}],
      {cancelable: false},
    );

    this.setState({
      remainingSecond: this.props.remainingSecond,
      buttonStatus: false
    })
    
    this.setupTime();
  }
  
  render() {
    return (
      <>
        <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Countdown</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.mainContent}>
          <TimerBlock
            hours={this.state.time.hours}
            minutes={this.state.time.minutes}
            seconds={this.state.time.seconds}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.bottomBar}>
          {this.state.buttonStatus === false 
            ? 
            <Button
            title="Start"
            onPress={this.handleStartStop}
            style={styles.bottomBarButton}
            color="#30336b"
          />
            : 
          <Button
              title="Pause"
              onPress={this.handleStartStop}
              style={styles.bottomBarButton}
              color="#30336b"
            />
          }
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
