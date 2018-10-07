import React, { Component, RefObject } from 'react';
import {
  Dimensions,
  Animated,
  StyleSheet,
  View,
  Platform,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ScrollView,
  GestureResponderEvent
} from 'react-native';
import { Sheet } from '../theme/components/Sheet';
import Interactable from 'react-native-interactable';
import { SearchBar } from './SearchBar';

const Screen = {
  width: Dimensions.get('window').width,
  height: Platform.OS === 'ios' ?
    Dimensions.get('window').height - 52 : Dimensions.get('window').height - 68
};

export interface SearchSheetProps {
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

interface SearchSheetState {
  allowScroll: boolean;
}

export class SearchSheet extends Component<SearchSheetProps, SearchSheetState> {
  private _deltaY: Animated.Value;
  private interactableRef: RefObject<any> = React.createRef();
  private scrollViewRef: RefObject<ScrollView> = React.createRef();
  
  constructor(props: any) {
    super(props);
    this.state = {
      allowScroll: false
    };
    this._deltaY = new Animated.Value(Screen.height - 100);
  }

  public collapse() {
    if (this.interactableRef.current) {
      // this.interactableRef.current.snapTo({ index: 1 });
      // this.scrollToTop();
    }
  }

  private scrollToTop() {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }

  private onSnap(e: Interactable.ISnapEvent) {
    this.setState({
      allowScroll: e.nativeEvent.id === 'top'
    });
  }

  private onDrag(e: Interactable.IDragEvent) {
    if (e.nativeEvent.state === 'end' && (e.nativeEvent as any).targetSnapPointId === 'top') {
      this.setState({ allowScroll: true });
    } else {
      this.scrollToTop();
      this.setState({ allowScroll: false });
    }
  }

  render() {
    return (
      <View style={styles.sheetContainer} pointerEvents={'box-none'}>
        <Interactable.View
          ref={this.interactableRef}
          animatedNativeDriver={true}
          verticalOnly={true}
          snapPoints={[
            {
              y: Screen.height - 200
            },
            {
              y: Screen.height - 80
            },
            {
              id: 'top',
              y: 25
            }
          ]}
          onSnap={e => this.onSnap(e)}
          onDrag={e => this.onDrag(e)}
          initialPosition={{ y: Screen.height - 200 }}
          animatedValueY={this._deltaY}
        >
          <Sheet style={styles.sheet}>
            <View style={styles.grab}/>
            <SearchBar
              placeholder="Search RoboScorz"
              style={styles.searchBar}
              onFocus={(e) => {
                if (this.interactableRef.current) {
                  this.interactableRef.current.snapTo({ index: 2 });
                }
                if (this.props.onFocus) this.props.onFocus(e);
              }}
              onBlur={(e) => {
                if (this.interactableRef.current) {
                  this.interactableRef.current.snapTo({ index: 0 });
                }
                if (this.props.onBlur) this.props.onBlur(e);
              }}
            />
            <ScrollView
              bounces={false}
              style={styles.scrollView}
              scrollEnabled={this.state.allowScroll}
              showsVerticalScrollIndicator={this.state.allowScroll}
              ref={this.scrollViewRef}
            >
              {this.props.children}
            </ScrollView>
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
    minHeight: Screen.height + 600,
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
  },
  scrollView: {
    flex: 1,
    padding: 8,
    marginTop: 16
  }
});
