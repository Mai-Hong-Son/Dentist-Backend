import React from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
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

export default class LightPasswordField extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    inputProps: PropTypes.object
  };

  static defaultProps = {
    style: {
      color: '#fff',
      paddingVertical: 20
    },
    inputProps: {}
  };

  state = {
    secureTextEntry: true
  };

  render() {
    const { style, ...props } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <View style={styles.container}>
            <Icon>{this.props.prefix}</Icon>
            <TextInput
              {...props}
              style={[styles.input, style]}
              secureTextEntry={this.state.secureTextEntry}
              placeholderTextColor={'#fff'}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <TouchableOpacity
              onPressIn={() => this.setState({ secureTextEntry: false })}
              onPressOut={() => this.setState({ secureTextEntry: true })}
            >
              <Icon>
                <Image
                  resizeMode={'contain'}
                  source={require('../../../assets/images/icon_see.png')}
                  style={{
                    width: 22,
                    height: 26
                  }}
                />
              </Icon>
            </TouchableOpacity>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}
