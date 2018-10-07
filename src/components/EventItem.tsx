import React, { Component } from 'react';
import { View } from 'react-native';
import { Event } from '../entity/Event';
import { Body2, Heading5 } from '../theme/components/text';
import { Material } from '../theme/components/Material';

export interface EventItemProps {
  event: Event;
}

export class EventItem extends Component<EventItemProps> {
  render() {
    return (
      <Material
        elevation={4}
        borderRadius={8}
        style={{ minHeight: 112, width: '100%', padding: 8, marginBottom: 8 }}
      >
        <Body2 emphasis="medium">Dates</Body2>
        <Heading5>{this.props.event.name}</Heading5>
        <View>
          <Body2
            emphasis="medium">
            {
              this.props.event.venue + ' - ' +
              this.props.event.city + ',' +
              this.props.event.stateProv
            }
          </Body2>
        </View>
      </Material>
    );
  }
}
