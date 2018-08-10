import {
  ColorData,
  SurfaceColorData,
  ThemeVariantData,
  TextColorData,
  MaterialTextColor,
  ThemeData,
  ThemeVariant,
  PaddingData,
  SurfaceBackground,
  TextThemeData,
  TextEmphasis,
  RawThemeData
} from './Theme';

export const Color: ColorData = {
  primary: {
    50:  '#EDE7F6',
    100: '#D1C4E9',
    200: '#B39DDB',
    300: '#9575CD',
    400: '#7E57C2',
    500: '#673AB7',
    600: '#5E35B1',
    700: '#512DA8',
    800: '#4527A0',
    900: '#311B92'
  },
  secondary: {
    50:  '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C'
  }
};

export const SurfaceColor: SurfaceColorData<ThemeVariantData<string>> = {
  primary: {
    lightVariant: '#FFFFFF',
    darkVariant: Color.primary[500]
  },
  secondary: {
    lightVariant: '#F5F5F5',
    darkVariant: Color.secondary[500]
  },
  dark: {
    lightVariant: '#000000',
    darkVariant:'#000000'
  },
  light: {
    lightVariant: '#FFFFFF',
    darkVariant:'#FFFFFF'
  }
};

export const TextColor: TextColorData<ThemeVariantData<MaterialTextColor>> = {
  onPrimary: {
    darkVariant: {
      highEmphasis: 'rgba(255, 255, 255, 1)',
      mediumEmphasis: 'rgba(255, 255, 255, 0.71)',
      disabled: 'rgba(255, 255, 255, 0.38)'
    },
    lightVariant: {
      highEmphasis: 'rgba(0, 0, 0, 0.87)',
      mediumEmphasis: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    }
  },
  onSecondary: {
    darkVariant: {
      highEmphasis: 'rgba(255, 255, 255, 1)',
      mediumEmphasis: 'rgba(255, 255, 255, 0.74)',
      disabled: 'rgba(255, 255, 255, 0.38)'
    },
    lightVariant: {
      highEmphasis: 'rgba(0, 0, 0, 0.87)',
      mediumEmphasis: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    }
  },
  black: {
    darkVariant: {
      highEmphasis: 'rgba(0, 0, 0, 0.87)',
      mediumEmphasis: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    lightVariant: {
      highEmphasis: 'rgba(0, 0, 0, 0.87)',
      mediumEmphasis: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    }
  },
  white: {
    darkVariant: {
      highEmphasis: 'rgba(255, 255, 255, 1)',
      mediumEmphasis: 'rgba(255, 255, 255, 0.6)',
      disabled: 'rgba(255, 255, 255, 0.38)'
    },
    lightVariant: {
      highEmphasis: 'rgba(255, 255, 255, 1)',
      mediumEmphasis: 'rgba(255, 255, 255, 0.6)',
      disabled: 'rgba(255, 255, 255, 0.38)'
    }
  }
};

export const RoboScorzTheme: ThemeData = {
  defaultVariant: 'light',
  color(variant?: ThemeVariant): ColorData {
    return Color;
  },
  primary(variant?: ThemeVariant): string {
    return Color.primary[500];
  },
  secondary(variant?: ThemeVariant): string {
    return Color.secondary[600];
  },
  padding(variant?: ThemeVariant): PaddingData {
    return {
      exSmall: 4,
      small: 6,
      medium: 8,
      large: 16,
      exLarge: 32
    };
  },
  borderRadius(variant?: ThemeVariant): number { return 16; },
  textTheme(
    variant?: ThemeVariant,
    surface?: SurfaceBackground,
    emphasis?: TextEmphasis
  ): TextThemeData {
    return {
      heading1: {
        fontFamily: 'Rubik',
        fontWeight: '400',
        fontSize: 97.54,
        letterSpacing: -1.5,
        color: this.textColor(emphasis || 'high', surface, variant)
      },
      heading2: {
        fontFamily: 'Rubik',
        fontWeight: '400',
        fontSize: 60.96,
        letterSpacing: -0.5,
        color: this.textColor(emphasis || 'high', surface, variant)
      },
      heading3: {
        fontFamily: 'Rubik',
        fontWeight: '400',
        fontSize: 48.77,
        letterSpacing: 0,
        color: this.textColor(emphasis || 'high', surface, variant)
      },
      heading4: {
        fontFamily: 'Rubik',
        fontWeight: '400',
        fontSize: 34.54,
        letterSpacing: 0.25,
        color: this.textColor(emphasis || 'high', surface, variant)
      },
      heading5: {
        fontFamily: 'Rubik',
        fontWeight: '400',
        fontSize: 24.38,
        letterSpacing: 0,
        color: this.textColor(emphasis || 'high', surface, variant)
      },
      heading6: {
        fontFamily: 'Rubik',
        fontWeight: '500',
        fontSize: 20.32,
        letterSpacing: 0.25,
        color: this.textColor(emphasis || 'high', surface, variant)
      },
      body1: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 15.8,
        letterSpacing: 0.5,
        color: this.textColor(emphasis || 'medium', surface, variant)
      },
      body2: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 13.82,
        letterSpacing: 0.25,
        color: this.textColor(emphasis || 'medium', surface, variant)
      },
      subtitle1: {
        fontFamily: 'Rubik',
        fontWeight: '400',
        fontSize: 16.26,
        letterSpacing: 0.15,
        color: this.textColor(emphasis || 'medium', surface, variant)
      },
      subtitle2: {
        fontFamily: 'Rubik',
        fontWeight: '500',
        fontSize: 14.22,
        letterSpacing: 0.1,
        color: this.textColor(emphasis || 'medium', surface, variant)
      },
      button: {
        fontFamily: 'Rubik',
        fontWeight: '500',
        fontSize: 14.22,
        letterSpacing: 1.25,
        textTransform: 'uppercase',
        color: this.textColor(emphasis || 'high', surface, variant)
      },
      caption: {
        fontFamily: 'Rubik',
        fontWeight: '400',
        fontSize: 12.19,
        letterSpacing: 0.4,
        color: this.textColor(emphasis || 'medium', surface, variant)
      },
      overline: {
        fontFamily: 'Rubik',
        fontWeight: '700',
        fontSize: 12.19,
        letterSpacing: 2,
        color: this.textColor(emphasis || 'medium', surface, variant)
      }
    };
  },
  surfaceColor(variant?: ThemeVariant): SurfaceColorData<string> {
    switch (variant) {
      case 'light': return {
        primary: SurfaceColor.primary.lightVariant,
        secondary: SurfaceColor.secondary.lightVariant,
        dark: SurfaceColor.dark.lightVariant,
        light: SurfaceColor.light.lightVariant
      };
      case 'dark': return {
        primary: SurfaceColor.primary.darkVariant,
        secondary: SurfaceColor.secondary.darkVariant,
        dark: SurfaceColor.dark.darkVariant,
        light: SurfaceColor.light.darkVariant
      };
      default: return {
        primary: SurfaceColor.primary.lightVariant,
        secondary: SurfaceColor.secondary.lightVariant,
        dark: SurfaceColor.dark.lightVariant,
        light: SurfaceColor.light.lightVariant
      };
    }
  },
  textColor(
    emphasis?: TextEmphasis,
    surface?: SurfaceBackground,
    variant?: ThemeVariant
  ): string {
    switch (surface) {
      case 'primary': {
        switch (emphasis) {
          case 'high': {
            switch (variant) {
              case 'light': return TextColor.onPrimary.lightVariant.highEmphasis;
              case 'dark': return TextColor.onPrimary.darkVariant.highEmphasis;
            }
          }
          case 'medium': {
            switch (variant) {
              case 'light': return TextColor.onPrimary.lightVariant.mediumEmphasis;
              case 'dark': return TextColor.onPrimary.darkVariant.mediumEmphasis;
            }
          }
          case 'disabled': {
            switch (variant) {
              case 'light': return TextColor.onPrimary.lightVariant.disabled;
              case 'dark': return TextColor.onPrimary.darkVariant.disabled;
            }
          }
        }
      }
      case 'secondary': {
        switch (emphasis) {
          case 'high': {
            switch (variant) {
              case 'light': return TextColor.onSecondary.lightVariant.highEmphasis;
              case 'dark': return TextColor.onSecondary.darkVariant.highEmphasis;
            }
          }
          case 'medium': {
            switch (variant) {
              case 'light': return TextColor.onSecondary.lightVariant.mediumEmphasis;
              case 'dark': return TextColor.onSecondary.darkVariant.mediumEmphasis;
            }
          }
          case 'disabled': {
            switch (variant) {
              case 'light': return TextColor.onSecondary.lightVariant.disabled;
              case 'dark': return TextColor.onSecondary.darkVariant.disabled;
            }
          }
          default: {
            switch (variant) {
              case 'light': return TextColor.onSecondary.lightVariant.highEmphasis;
              case 'dark': return TextColor.onSecondary.darkVariant.highEmphasis;
            }
          }
        }
      }
      case 'dark': {
        switch (emphasis) {
          case 'high': {
            switch (variant) {
              case 'light': return TextColor.white.lightVariant.highEmphasis;
              case 'dark': return TextColor.white.darkVariant.highEmphasis;
            }
          }
          case 'medium': {
            switch (variant) {
              case 'light': return TextColor.white.lightVariant.mediumEmphasis;
              case 'dark': return TextColor.white.darkVariant.mediumEmphasis;
            }
          }
          case 'disabled': {
            switch (variant) {
              case 'light': return TextColor.white.lightVariant.disabled;
              case 'dark': return TextColor.white.darkVariant.disabled;
            }
          }
        }
      }
      case 'light': {
        switch (emphasis) {
          case 'high': {
            switch (variant) {
              case 'light': return TextColor.black.lightVariant.highEmphasis;
              case 'dark': return TextColor.black.darkVariant.highEmphasis;
            }
          }
          case 'medium': {
            switch (variant) {
              case 'light': return TextColor.black.lightVariant.mediumEmphasis;
              case 'dark': return TextColor.black.darkVariant.mediumEmphasis;
            }
          }
          case 'disabled': {
            switch (variant) {
              case 'light': return TextColor.black.lightVariant.disabled;
              case 'dark': return TextColor.black.darkVariant.disabled;
            }
          }
        }
      }
      default: {
        switch (variant) {
          case 'light': return TextColor.black.lightVariant.highEmphasis;
          case 'dark': return TextColor.white.lightVariant.highEmphasis;
          default: return TextColor.black.lightVariant.highEmphasis;
        }
      }
    }
  },
  backgroundColor(variant?: ThemeVariant): string {
    return this.surfaceColor(variant).primary;
  },
  raw(variant?: ThemeVariant, surface?: SurfaceBackground, emphasis?: TextEmphasis): RawThemeData {
    return {
      color: this.color(variant),
      primary: this.primary(variant),
      secondary: this.secondary(variant),
      surfaceColor: this.surfaceColor(variant),
      padding: this.padding(variant),
      borderRadius: this.borderRadius(variant),
      textTheme: this.textTheme(variant, surface),
      textColor: this.textColor(emphasis, surface, variant),
      backgroundColor: this.backgroundColor(variant)
    };
  }
};
