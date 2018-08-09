import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class Explore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          showsUserLocation={true}
          loadingEnabled={true}
          style={styles.map}
       >
       </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
