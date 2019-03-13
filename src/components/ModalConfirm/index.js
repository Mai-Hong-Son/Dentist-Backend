import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, View } from 'react-native';

export default class Modal extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <View  full>
          <Text>Confirm remove item {item.title}</Text>
          <Button style={{ flex: 1 }} title="Confirm"/>
          <Button
            onPress={() => this.props.navigator.dismissLightBox()}
            style={{ flex: 1 }}
            title="Cancel"
          />
      </View>
    );
  }
}
