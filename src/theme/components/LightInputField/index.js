import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../theme-context';

const Icon = props => (
  <View
    style={{
      width: 28,
      height: 28
    }}
  >
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  input: {
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1
  }
});

export default class LightInputField extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    inputProps: PropTypes.object
  };

  static defaultProps = {
    style: {},
    inputProps: {}
  };

  render() {
    const { style, ...props } = this.props;

    return (
      <ThemeContext.Consumer>
        {() => (
          <View style={styles.container}>
            <Icon>{this.props.prefix}</Icon>
            <TextInput
              autoCapitalize={'none'}
              {...props}
              style={[styles.input, style]}
              placeholderTextColor={'#fff'}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}
