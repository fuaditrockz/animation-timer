import React, { Component } from 'react';
import {
  Button,
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
        <SafeAreaView style={styles.mainContent}>
          
        </SafeAreaView>
        <SafeAreaView style={styles.bottomBar}>
          <Button
            title="Start Again"
            onPress={() => Alert.alert('Simple Button pressed')}
            style={styles.bottomBarButton}
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
    
  },
  bottomBar: {
    backgroundColor: "#c7ecee",
    justifyContent: "center", 
    paddingHorizontal: 10,
    position: 'absolute', 
    bottom: 0, 
    width: "100%",
    height: 70
  },
  bottomBarButton: {
    width: 80
  }
})
