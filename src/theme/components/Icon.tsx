import React, { Component } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  IconProps as MaterialIconProps
} from 'react-native-vector-icons/Icon';
import {
  Theme,
  SurfaceBackground,
  ThemeBuilder,
  ThemeVariant,
  ThemeConsumer,
  SurfaceProvider,
  ThemeData
} from '../Theme';

export interface IconProps extends MaterialIconProps {
  color?: SurfaceBackground;
  themeVariant?: ThemeVariant;
  theme?: ThemeBuilder;
}

export class Icon extends Component<IconProps> {
  private getIconProps(theme: ThemeData) {
    return Object.assign({}, this.props, {
      size: this.props.size || 24,
      color: this.props.color || theme.secondary,
      themeVariant: undefined,
      theme: undefined
    });
  }

  render() {
    let content = (
      <ThemeConsumer>
        {theme => (
          <MaterialIcon {...this.getIconProps(theme)}/>
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
