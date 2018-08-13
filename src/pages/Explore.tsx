import React, { Component, RefObject } from 'react';
import { View, StyleSheet, MapViewRegion, Animated } from 'react-native';
import MapView, { AnimatedRegion } from 'react-native-maps';
import { ThemeConsumer } from '../theme';
import { SearchSheet } from '../components/SearchSheet';
import { NavigationScreenOptions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabBarIcon } from '../theme/components/TabBarIcon';

interface ExploreStateProps { }

interface ExploreState {
  ready: boolean;
  regionChangeCount: number;
}

export default class Explore extends Component<{}, ExploreState> {
  private mapRef: RefObject<MapView> = React.createRef();
  private searchRef: RefObject<SearchSheet> = React.createRef();

  static navigationOptions: NavigationScreenOptions = {
    tabBarIcon: options => <TabBarIcon name="location-on" {...options}/>
  };

  constructor(props: ExploreStateProps) {
    super(props);
    this.state = {
      ready: false,
      regionChangeCount: 0
    };
  }

  async getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
  }

  onRegionChange() {
    if (this.state.ready) {
      if (this.searchRef.current) {
        this.searchRef.current.collapse();
      }
    }
  }

  onRegionChangeComplete() {
    // Keep track of region changes so the search container only collapses due to user movement
    this.setState({
      regionChangeCount: this.state.regionChangeCount + 1
    }, () => {
      if (this.state.regionChangeCount === 2) {
        this.setState({
          ready: true
        });
      }
    });
  }

  onMapReady() {
    this.getCurrentLocation().then((position) => {
      if (position) {
        if (this.mapRef.current) {
          this.mapRef.current.animateToRegion({
            latitude: position.coords.latitude - 0.5,
            longitude: position.coords.longitude,
            latitudeDelta: 4,
            longitudeDelta: 4
          });
        }
      }
    });
  }

  render() {
    return (
      <ThemeConsumer>
        {theme => (
          <View style={styles.container}>
            <MapView
                provider="google"
                showsUserLocation={true}
                loadingEnabled={true}
                loadingIndicatorColor={theme.primary}
                followsUserLocation={true}
                showsCompass={false}
                onMapReady={() => this.onMapReady()}
                onRegionChange={() => this.onRegionChange()}
                onRegionChangeComplete={() => this.onRegionChangeComplete()}
                initialRegion={{
                  latitude: 0,
                  longitude: 0,
                  latitudeDelta: 1000,
                  longitudeDelta: 1000
                }}
                style={styles.map}
                ref={this.mapRef}
              >
              </MapView>
            <SearchSheet ref={this.searchRef}/>
          </View>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});
