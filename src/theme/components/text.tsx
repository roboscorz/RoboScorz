import React, { StatelessComponent, Component } from 'react';
import { Text, TextProps } from 'react-native';
import { SurfaceBackground, TextEmphasis, ThemeData, TextStyleName } from '../Theme';
import { VariantConsumer, VariantProvider } from '../ThemeVariantContext';
import { ThemeVariant } from '..';
import { ThemeConsumer, ThemeProvider } from '../ThemeContext';
import { SurfaceConsumer, SurfaceProvider } from '../SurfaceContext';

export interface ThemeTextProps extends TextProps {
  theme?: ThemeData;
  variant?: ThemeVariant;
  surface?: SurfaceBackground;
  emphasis?: TextEmphasis;
}

function makeProps(
  props: ThemeTextProps,
  theme: ThemeData,
  variant: ThemeVariant,
  surface: SurfaceBackground,
  styleName: string,
  emphasis?: TextEmphasis
): ThemeTextProps {
  return Object.assign({}, props, {
    variant: undefined,
    emphasis: undefined,
    style: Object.assign(
      {},
      props.style,
      (theme.textTheme(variant, surface, emphasis) as any)[styleName]
    )
  });
}

export class ThemeText extends Component<ThemeTextProps & { styleName: TextStyleName }> {
  render() {
    let content = (
      <ThemeConsumer>
        {theme => (
          <VariantConsumer>
            {variant => (
              <SurfaceConsumer>
                {surface => (
                  <Text {...makeProps(
                    this.props,
                    theme,
                    variant,
                    surface,
                    this.props.styleName,
                    this.props.emphasis
                  )}/>
                )}
              </SurfaceConsumer>
            )}
          </VariantConsumer>
        )}
      </ThemeConsumer>
    );
    if (this.props.surface) {
      content = (
        <SurfaceProvider value={this.props.surface}>
          {content}
        </SurfaceProvider>
      );
    }
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

export const Heading1: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="heading1" {...props} />;

export const Heading2: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="heading2" {...props} />;

export const Heading3: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="heading3" {...props} />;

export const Heading4: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="heading4" {...props} />;

export const Heading5: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="heading5" {...props} />;

export const Heading6: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="heading6" {...props} />;

export const Body1: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="body1" {...props} />;

export const Body2: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="body2" {...props} />;

export const Subtitle1: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="subtitle1" {...props} />;
  
export const Subtitle2: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="subtitle2" {...props} />;

export const ButtonText: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="button" {...props} />;

export const Caption: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="caption" {...props} />;

export const Overline: StatelessComponent<ThemeTextProps>
  = props => <ThemeText styleName="caption" {...props} />;
