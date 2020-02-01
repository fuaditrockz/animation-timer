import React, { Component } from 'react';
import {
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert, View,
} from 'react-native';
import TimerBlock from './TimerBlock';
import TimeBlock from './widgets/TimeBlock';

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
        Alert.alert(
          'Done',
          'The countdown was finished.',
          [{text: 'OK', onPress: this.setupTime()}],
          {cancelable: false},
        );
        this.timer = clearInterval(this.timer);
        return {
          remainingSecond: this.props.remainingSecond,
          buttonStatus: false
        };
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
  
  render() {
    return (
      <>
        <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Countdown</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.mainContent}>
          <View style={styles.blockContainer}>
            <TimeBlock time={this.state.time.hours} />
            <Text style={styles.colonDivider} >:</Text>
            <TimeBlock time={this.state.time.minutes} />
            <Text style={styles.colonDivider} >:</Text>
            <TimeBlock time={this.state.time.seconds} />
          </View>
          {/* <TimerBlock
            hours={this.state.time.hours}
            minutes={this.state.time.minutes}
            seconds={this.state.time.seconds}
          /> */}
        </SafeAreaView>

        <SafeAreaView style={styles.bottomBar}>
          {this.state.buttonStatus === false 
            ? 
            <Button
            title="Start"
            onPress={this.handleStartStop}
            style={styles.bottomBarButton}
            color="#f6b93b"
          />
            : 
          <Button
              title="Pause"
              onPress={this.handleStartStop}
              style={styles.bottomBarButton}
              color="#f6b93b"
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
    backgroundColor: "#e58e26",
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
    alignItems: "stretch",
    /* backgroundColor: "red" */
  },
  colonDivider: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fa983a"
  },
  blockContainer: {
    backgroundColor: "blue",
    height: 300,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bottomBar: {
    /* backgroundColor: "#c7ecee", */
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
