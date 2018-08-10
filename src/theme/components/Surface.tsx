import React, { Component } from 'react';
import { ViewProps, View } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import { SurfaceProvider } from '../SurfaceContext';
import { SurfaceBackground, ThemeData, ThemeVariant } from '../Theme';
import { ThemeConsumer, ThemeProvider } from '../ThemeContext';
import { VariantConsumer, VariantProvider } from '../ThemeVariantContext';

export interface SurfaceProps extends ViewProps {
  color?: SurfaceBackground;
  elevation?: number;
  variant?: ThemeVariant;
  theme?: ThemeData;
}

export class Surface extends Component<SurfaceProps> {
  private getViewProps(theme: ThemeData, variant: ThemeVariant) {
    return Object.assign({}, this.props, {
      color: undefined,
      style: Object.assign({}, this.props.style, {
        backgroundColor: (theme.surfaceColor(variant) as any)[this.props.color || 'primary']
      })
    });
  }

  render() {
    let content = (
      <ThemeConsumer>
        {theme => (
          <VariantConsumer>
            {variant => (
              <SurfaceProvider value={this.props.color || 'primary'}>
                <ElevatedView
                  {...this.getViewProps(theme, variant)}
                />
              </SurfaceProvider>
            )}
          </VariantConsumer>
        )}
      </ThemeConsumer>
    );
    if (this.props.variant) {
      content = (
        <VariantProvider value={this.props.variant}>
          {content}
        </VariantProvider>
      );
    }
    if (this.props.theme) {
      content = (
        <ThemeProvider value={this.props.theme}>
          {content}
        </ThemeProvider>
      );
    }
    return content;
  }
}
