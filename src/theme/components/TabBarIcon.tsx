import React, { StatelessComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeConsumer } from '../Theme';

interface TabBarIconProps {
  name: string;
  tintColor?: string | null;
  focused: boolean;
}

export const TabBarIcon: StatelessComponent<TabBarIconProps> = (props) => {
  switch (props.focused) {
    case true: return (
      <ThemeConsumer>
        {theme => (
          <Icon
            name={props.name}
            size={24}
            color={props.tintColor as string}
          />
        )}
      </ThemeConsumer>
    );
    case false: return (
      <ThemeConsumer>
        {(theme, variant, surface, builder) => (
          <Icon
            name={props.name}
            size={24}
            color={builder.textColor('disabled', surface, variant)}
          />
        )}
      </ThemeConsumer>
    );
  }
};
