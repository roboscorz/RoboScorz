import React, { Component } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { ThemeConsumer, ThemeData, ThemeVariant } from '../theme/Theme';

export interface SearchBarProps extends TextInputProps {

}

export class SearchBar extends Component<SearchBarProps> {
  makeProps(theme: ThemeData, variant: ThemeVariant): SearchBarProps {
    return Object.assign({}, this.props, {
      style: Object.assign({}, this.props.style, {
        backgroundColor: variant === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
        height: 48,
        borderRadius: theme.borderRadius,
        paddingLeft: theme.padding.large,
        paddingRight: theme.padding.large,
        ...theme.textTheme.subtitle1
      })
    });
  }

  render() {
    return (
      <ThemeConsumer>
        {(theme, variant, surface, builder) => (
          <TextInput
            selectionColor={theme.primary}
            placeholderTextColor={builder.textColor('disabled', surface, variant)}
            {...this.makeProps(theme, variant)}
          />
        )}
      </ThemeConsumer>
    );
  }
}
