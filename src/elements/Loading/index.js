import React from 'react';
import LottieView from 'lottie-react-native';
import { Animated, Easing, View } from 'react-native';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 68, height: 68 }}>
          <LottieView
            source={require('../../assets/lotties/material_wave_loading.json')}
            loop
            style={{ }} // disable warning - https://github.com/react-community/lottie-react-native/issues/243
            autoPlay
            enableMergePathsAndroidForKitKatAndAbove
          />
        </View>
      </View>
    );
  }
}
