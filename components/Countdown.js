import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';

export default class Countdown extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Countdown</Text>
        </SafeAreaView>
        <View>
          <Text>Hello World</Text>
        </View>
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
  }
})
