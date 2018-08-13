import React, { Component, RefObject } from 'react';
import {
  Dimensions,
  Animated,
  StyleSheet,
  View,
  Platform,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native';
import { Sheet } from '../theme/components/Sheet';
import Interactable from 'react-native-interactable';
import { SearchBar } from './SearchBar';

const Screen = {
  width: Dimensions.get('window').width,
  height: Platform.OS === 'ios' ?
    Dimensions.get('window').height - 49 : Dimensions.get('window').height - 20
};

export interface SearchSheetProps {
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export class SearchSheet extends Component<SearchSheetProps> {
  private _deltaY: Animated.Value;
  private interactableRef: RefObject<any> = React.createRef();
  
  constructor(props: any) {
    super(props);
    this._deltaY = new Animated.Value(Screen.height - 100);
  }

  public collapse() {
    if (this.interactableRef.current) {
      this.interactableRef.current.snapTo({ index: 2 });
    }
  }

  render() {
    return (
      <View style={styles.sheetContainer} pointerEvents={'box-none'}>
        <Interactable.View
          ref={this.interactableRef}
          animatedNativeDriver={true}
          verticalOnly={true}
          snapPoints={[{ y: 25 }, { y: Screen.height - 200 }, { y: Screen.height - 80 }]}
          boundaries={{ top: -300 }}
          initialPosition={{ y: Screen.height - 200 }}
          animatedValueY={this._deltaY}>
          <Sheet style={styles.sheet}>
            <View style={styles.grab}/>
            <SearchBar
              placeholder="Search RoboScorz"
              style={styles.searchBar}
              onFocus={(e) => {
                if (this.interactableRef.current) {
                  this.interactableRef.current.snapTo({ index: 0 });
                }
                if (this.props.onFocus) this.props.onFocus(e);
              }}
              onBlur={(e) => {
                if (this.interactableRef.current) {
                  this.interactableRef.current.snapTo({ index: 1 });
                }
                if (this.props.onBlur) this.props.onBlur(e);
              }}
            />
          </Sheet>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  sheet: {
    minHeight: Screen.height + 300,
    width: '100%'
  },
  grab: {
    height: 4,
    width: 24,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  searchBar: {
    marginLeft: 12,
    marginRight: 12
  }
});
