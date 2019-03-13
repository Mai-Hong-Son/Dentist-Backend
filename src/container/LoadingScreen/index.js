import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';


import platform from '../../theme/variables/platform';
import FullGradient from '../../components/FullGradient';

export default class LoadingScreen extends Component {

  static defaultProps = {
    visible: false,
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <View
        {...this.props.modalProps}
        style={{
          flex: 1,
          zIndex: 9999,
          position: 'absolute',
          height: platform.deviceHeight,
          top: 0,
          // bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <FullGradient
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            alignContent: 'center',
          }}
        >
          <View
            style={{
              flex: 5,
              justifyContent: 'center'
            }}
          >
            <Image
              resizeMode="contain"
              source={require('../../assets/images/logo.png')}
              style={{
                width: platform.deviceWidth * 0.6,
                flex: 1.8
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <Text>* * * * * *</Text>
          </View>
        </FullGradient>
      </View>
    );
  }
}
