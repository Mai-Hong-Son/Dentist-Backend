import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 7,
    margin: 5
  }
});

export default class Dot extends React.Component {
  state = {
    active: this.props.active
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          padding: 2
        }}
        onPress={this.props.onPress}
      >
        <View
          style={[
            styles.dot,
            {
              backgroundColor: this.state.active ? '#fff' : '#ffffff40'
            }
          ]}
        />
      </TouchableOpacity>
    );
  }
}
