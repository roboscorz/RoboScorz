import React, { Component, createContext } from 'react';
import { TextStyle } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { ThemeVariantContext } from './ThemeVariantContext';
import { SurfaceContext } from './SurfaceContext';

export type MaterialColor = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type SurfaceBackground = 'primary' | 'secondary' | 'dark' | 'light';
export type TextEmphasis = 'high' | 'medium' | 'disabled';
export type ThemeVariant = 'light' | 'dark';

export type TextStyleName =
  'heading1' |
  'heading2' |
  'heading3' |
  'heading4' |
  'heading5' |
  'heading6' |
  'body1' |
  'body2' |
  'subtitle1' |
  'subtitle2' |
  'button' |
  'caption' |
  'overline';

export type SurfaceColorData<T> = {
  primary: T;
  secondary: T;
  dark: T;
  light: T;
};

export type ColorData = {
  primary: MaterialColor;
  secondary: MaterialColor;
};

export type MaterialTextColor = {
  highEmphasis: string;
  mediumEmphasis: string;
  disabled: string;
};

export type TextColorData<T> = {
  onPrimary: T;
  onSecondary: T;
  black: T;
  white: T;
};

export type TextThemeData = {
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  heading4: TextStyle;
  heading5: TextStyle;
  heading6: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  subtitle1: TextStyle;
  subtitle2: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  overline: TextStyle;
};

export type PaddingData = {
  exSmall: number;
  small: number;
  medium: number;
  large: number;
  exLarge: number;
};

export type ThemeData = {
  color: ColorData;
  primary: string;
  secondary: string;
  padding: PaddingData;
  borderRadius: number;
  textTheme: TextThemeData;
  surfaceColor: SurfaceColorData<string>;
  textColor: string;
  backgroundColor: string;
};

export interface ThemeBuilder {
  defaultVariant: ThemeVariant;
  color(variant?: ThemeVariant): ColorData;
  primary(variant?: ThemeVariant): string;
  secondary(variant?: ThemeVariant): string;
  padding(variant?: ThemeVariant): PaddingData;
  borderRadius(variant?: ThemeVariant): number;
  textTheme(
    variant?: ThemeVariant,
    surface?: SurfaceBackground,
    emphasis?: TextEmphasis
  ): TextThemeData;
  surfaceColor(variant?: ThemeVariant): SurfaceColorData<string>;
  backgroundColor(variant?: ThemeVariant): string;
  textColor(
    emphasis?: TextEmphasis,
    surface?: SurfaceBackground,
    variant?: ThemeVariant
  ): string;
  build(
    variant?: ThemeVariant,
    surface?: SurfaceBackground,
    emphasis?: TextEmphasis
  ): ThemeData;
}

export type ThemeVariantData<T> = {
  lightVariant: T;
  darkVariant: T;
};

export interface VariantProviderProps {
  variant: ThemeVariant;
}

export class VariantProvider extends Component<VariantProviderProps> {
  render() {
    return (
      <ThemeVariantContext.Provider value={this.props.variant}>
        {this.props.children}
      </ThemeVariantContext.Provider>
    );
  }
}

export interface SurfaceProviderProps {
  surface: SurfaceBackground;
}

export class SurfaceProvider extends Component<SurfaceProviderProps> {
  render() {
    return (
      <SurfaceContext.Provider value={this.props.surface}>
        {this.props.children}
      </SurfaceContext.Provider>
    );
  }
}

export interface ThemeProviderProps {
  theme?: ThemeBuilder;
  variant?: ThemeVariant;
  surface?: SurfaceBackground;
}

export class Theme extends Component<ThemeProviderProps> {
  render() {
    return (
      <ThemeConsumer>
        {(theme, variant, surface, builder) => (
          <ThemeContext.Provider value={this.props.theme || builder}>
            <ThemeVariantContext.Provider value={this.props.variant || variant}>
              <SurfaceContext.Provider value={this.props.surface || surface}>
                {this.props.children}
              </SurfaceContext.Provider>
            </ThemeVariantContext.Provider>
          </ThemeContext.Provider>
        )}
      </ThemeConsumer>
    );
  }
}

export interface ThemeConsumerProps {
  children: (
    theme: ThemeData,
    variant: ThemeVariant,
    surface: SurfaceBackground,
    builder: ThemeBuilder
  ) => JSX.Element;
}

export class ThemeConsumer extends Component<ThemeConsumerProps> {
  render() {
    return (
      <ThemeContext.Consumer>
        {builder => (
          <ThemeVariantContext.Consumer>
            {variant => (
              <SurfaceContext.Consumer>
                {surface =>
                  this.props.children(builder.build(variant), variant, surface, builder)
                }
              </SurfaceContext.Consumer>
            )}
          </ThemeVariantContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}
