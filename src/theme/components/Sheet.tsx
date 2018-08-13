import React, { Component } from 'react';
import { Material, MaterialProps } from './Material';
import { ThemeConsumer } from '../Theme';

export interface SheetProps extends MaterialProps {

}

export class Sheet extends Component<SheetProps> {
  render() {
    return (
      <ThemeConsumer>
        {theme => (
          <Material
            elevation={8}
            borderTopLeftRadius={theme.borderRadius}
            borderTopRightRadius={theme.borderRadius}
            {...this.props}
          />
        )}
      </ThemeConsumer>
    );
  }
}
