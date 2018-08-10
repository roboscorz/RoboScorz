import React, { Component } from 'react';
import { ViewProps, View } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import {
  Theme,
  SurfaceBackground,
  ThemeBuilder,
  ThemeVariant,
  ThemeConsumer,
  SurfaceProvider,
  ThemeData
} from '../Theme';

export interface MaterialProps extends ViewProps {
  color?: SurfaceBackground;
  elevation?: number;
  themeVariant?: ThemeVariant;
  theme?: ThemeBuilder;
}

export class Material extends Component<MaterialProps> {
  private getViewProps(theme: ThemeData) {
    return Object.assign({}, this.props, {
      color: undefined,
      style: Object.assign({}, this.props.style, {
        backgroundColor: (theme.surfaceColor as any)[this.props.color || 'primary']
      })
    });
  }

  render() {
    let content = (
      <ThemeConsumer>
        {theme => (
          <SurfaceProvider surface={this.props.color || 'primary'}>
            <ElevatedView
              {...this.getViewProps(theme)}
            />
          </SurfaceProvider>
        )}
      </ThemeConsumer>
    );
    if (this.props.theme || this.props.themeVariant) {
      content = (
        <Theme theme={this.props.theme} variant={this.props.themeVariant}>
          {content}
        </Theme>
      );
    }
    return content;
  }
}
