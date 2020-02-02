import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Alert, View, TouchableOpacity, Image, Animated
} from 'react-native';
import TimeBlock from './widgets/TimeBlock';

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingSecond: this.props.remainingSecond,
      time: {},
      buttonStatus: false,
      opacityValueSecond: new Animated.Value(1),
      opacityValueMinute: new Animated.Value(1)
    }
    this.handleStartStop = this.handleStartStop.bind(this);
    this.slideUpSecond = new Animated.ValueXY({ x: 0, y: 0 });
    this.slideUpMinute = new Animated.ValueXY({ x: 0, y: 0 });
  }

  _secondAnimation = () => {
    Animated.timing(this.state.opacityValueSecond, {
      toValue: 0,
    }).start();

    Animated.spring(this.slideUpSecond, {
      toValue: {x: 0, y: -40},
      duration: 1000,
    }).start();
  }

  _minuteAnimation = () => {
    Animated.timing(this.state.opacityValueMinute, {
      toValue: 0,
    }).start();

    Animated.spring(this.slideUpMinute, {
      toValue: {x: 0, y: -40},
      duration: 1000,
    }).start();
  }

  setupTime() {
    const remainingSecond = this.props.remainingSecond;
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
      this.slideUpSecond = new Animated.ValueXY({ x: 0, y: 0 })
      this.state.opacityValueSecond = new Animated.Value(1)

      if (prevState.time.seconds <= 1 && prevState.time.minutes >= 1) {
        this._minuteAnimation();
        this._secondAnimation();
        return {
          time: {
            seconds: 60,
            minutes: this.state.time.minutes - 1,
            hours: this.state.time.hours
          }
        }
      } else if (prevState.time.seconds <= 1 && prevState.time.minutes === 0) {
        Alert.alert(
          'Done',
          'The countdown was finished.',
          [{text: 'OK', onPress: this.setupTime()}],
          {cancelable: false},
        );

        this.timer = clearInterval(this.timer);

        return {
          time: {
            seconds: this.state.time.seconds + 1,
            minutes: this.state.time.minutes,
            hours: this.state.time.hours
          },
          buttonStatus: false
        };
      }

      this._secondAnimation();

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

              <View>
                <TimeBlock 
                  position="absolute"
                  time={this.state.time.minutes <= 0 ? 0 : this.state.time.minutes - 1}
                />
                <Animated.View
                  useNativeDriver={true}
                  style={[{
                    opacity: this.state.opacityValueMinute
                  }, this.slideUpMinute.getLayout()]}
                >
                  <TimeBlock time={this.state.time.minutes} />
                </Animated.View>
              </View>

              <Text style={styles.colonDivider} >:</Text>

              <View>
                <TimeBlock 
                  position="absolute"
                  time={this.state.time.seconds <= 0 ? 0 : this.state.time.seconds - 1}
                />
                <Animated.View
                  useNativeDriver={true}
                  style={[{
                    opacity: this.state.opacityValueSecond
                  }, this.slideUpSecond.getLayout()]}
                >
                  <TimeBlock time={this.state.time.seconds} />
                </Animated.View>
              </View>
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
