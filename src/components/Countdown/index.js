import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Alert, View, TouchableOpacity, Image, Animated
} from 'react-native';
import TimerBlock from './TimerBlock';
import TimeBlock from './widgets/TimeBlock';

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingSecond: this.props.remainingSecond,
      time: {},
      buttonStatus: false,
    }
    this.handleStartStop = this.handleStartStop.bind(this);
    this.slideUp = new Animated.ValueXY({ x: 0, y: 0 })
    this.opacity = new Animated.Value(1)
  }

  _moveTest = () => {
    Animated.timing(this.opacity, {
      toValue: 0,
    }).start();

    Animated.spring(this.slideUp, {
      toValue: {x: 0, y: -40},
      duration: 1000,
    }).start();
  }

  setupTime() {
    this.opacity = new Animated.Value(1)
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
      this.slideUp = new Animated.ValueXY({ x: 0, y: 0 })
      this.opacity = new Animated.Value(1)
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

      this._moveTest();

      return {
        buttonStatus: true,
        time: {
          seconds: prevState.time.seconds - 1,
          minutes: this.state.time.minutes,
          hours: this.state.time.hours,
        },
      }
    }), 1000)
  }
  
  render() {
    return (
      <>
        <SafeAreaView style={styles.header}>
          <Image 
            source={require('../../assets/images/illustration.png')} 
            style={{
              width: "100%",
              height: 290
            }}
          />
          {/* <Text style={styles.headerText}>Countdown</Text> */}
        </SafeAreaView>

        <SafeAreaView style={styles.mainContent}>
          <View style={styles.blockContainer}>
            <View style={styles.timeWrapper}>
              <TimeBlock time={this.state.time.hours} />
              <Text style={styles.colonDivider} >:</Text>
              <TimeBlock time={this.state.time.minutes} />
              <Text style={styles.colonDivider} >:</Text>
              <Animated.View
                useNativeDriver={true}
                style={[{
                  opacity: this.opacity
                }, this.slideUp.getLayout()]}
              >
                <TimeBlock time={this.state.time.seconds} />
              </Animated.View>
            </View>
          </View>
          {/* <TimerBlock
            hours={this.state.time.hours}
            minutes={this.state.time.minutes}
            seconds={this.state.time.seconds}
          /> */}
        </SafeAreaView>

        <SafeAreaView style={styles.bottomBar}>
          {
            this.state.buttonStatus === false
            ?
            <TouchableOpacity
              onPress={this.handleStartStop}
              activeOpacity={0.9}
              style={styles.bottomBarButton}
            >
              <Text style={styles.buttonText}>START</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={this.handleStartStop}
              activeOpacity={0.9}
              style={styles.bottomBarButtonActive}
            >
              <Text style={styles.buttonText}>PAUSE</Text>
            </TouchableOpacity>
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
    backgroundColor: "#82ccdd",
    height: 290
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
    alignItems: "stretch",
    backgroundColor: "#4a4a4a"
  },
  colonDivider: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white"
  },
  blockContainer: {
    /* backgroundColor: "blue", */
    height: 300,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  timeWrapper: {
    backgroundColor: "#1e3799",
    width: "100%",
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
    position: 'absolute',
    top: -40

  },
  bottomBar: {
    /* backgroundColor: "#c7ecee", */
    justifyContent: "center", 
    position: 'absolute', 
    bottom: 0, 
    width: "100%",
    height: 70
  },
  bottomBarButton: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1e3799",
    justifyContent: "center"
  },
  bottomBarButtonActive: {
    height: "100%",
    width: "100%",
    backgroundColor: "#38ada9",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: 'Morton-Black',
    color: "white",
    letterSpacing: 5
  }
})
