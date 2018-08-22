import React, { Component, RefObject } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { ThemeConsumer } from '../theme';
import { SearchSheet } from '../components/SearchSheet';
import { NavigationScreenOptions } from 'react-navigation';
import { TabBarIcon } from '../theme/components/TabBarIcon';
import { inject, observer } from 'mobx-react';
import { EventStore } from '../stores/EventStore';
import { Units, Location } from '../entity/Location';
import { Program } from '../entity/Team';

interface ExploreProps { 
  event: EventStore;
}

interface ExploreState {
  loading: boolean;
  ready: boolean;
  regionChangeCount: number;
  region: Region | null;
}

@inject('event')
@observer
export default class Explore extends Component<ExploreProps, ExploreState> {
  private mapRef: RefObject<MapView> = React.createRef();
  private searchRef: RefObject<SearchSheet> = React.createRef();
  private regionChangeTimeout: any;

  static navigationOptions: NavigationScreenOptions = {
    tabBarIcon: options => <TabBarIcon name="location-on" {...options}/>
  };

  constructor(props: ExploreProps) {
    super(props);
    this.state = {
      loading: true,
      ready: false,
      regionChangeCount: 0,
      region: null
    };
  }

  async loadNearbyEvents(region: Region) {
    this.setState({ loading: true });
    this.props.event.findByLocation(
      {
        lat: region.latitude,
        lon: region.longitude
      },
      ~~((region.latitudeDelta / 2) * 111), // one degree of latitude delta is equal to 111 km
      Units.KM,
      {
        first: 500,
        dateRange: {
          gte: 'now'
        }
      }
    ).then((events) => {
      this.setState({ loading: false });
    });
  }

  async getCurrentLocation(): Promise<Location> {
    return new Promise<Location>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      }, e => reject(e));
    });
  }

  onRegionChange(region: Region) {
    if (this.state.ready) {
      if (this.searchRef.current) {
        this.searchRef.current.collapse();
        this.setState({
          region
        });
        clearTimeout(this.regionChangeTimeout);
        // Make sure the maps is still before loading more events
        this.regionChangeTimeout = setTimeout(() => {
          // If the region change count hasn't changed in 250 ms, load more events
          if (region === this.state.region) {
            // Load more events
            if (!this.props.event.loadedAllMapEvents) this.loadNearbyEvents(region);
          }
        }, 250);
      }
    }
  }

  onRegionChangeComplete() {
    // Prevent infinite increase in count
    if (this.state.regionChangeCount < 3) {
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
  }

  onMapReady() {
    this.getCurrentLocation().then((position) => {
      if (position) {
        if (this.mapRef.current) {
          const region = {
            latitude: position.lat - 0.5,
            longitude: position.lon,
            latitudeDelta: 4,
            longitudeDelta: 4
          };
          this.setState({
            region
          });
          this.mapRef.current.animateToRegion(region);
          this.loadNearbyEvents(region);
        }
      }
    });
  }

  getPinColor(type: Program): string {
    switch (type) {
      case Program.FTC: return 'orange';
      case Program.FRC: return 'aqua';
      case Program.FLL: return 'red';
      case Program.JFLL: return 'green';
      default: return 'red';
    }
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
              onRegionChange={region => this.onRegionChange(region)}
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
              {this.props.event.mapEvents.map(event => (
                <Marker
                  key={event.id}
                  title={event.name}
                  coordinate={event.coordinates}
                  pinColor={this.getPinColor(event.program!)}
                />
              ))}
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
