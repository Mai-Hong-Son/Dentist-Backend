import React from 'react';
import { SafeAreaView, Dimensions, View } from 'react-native';
import platform from '../theme/variables/platform';

const SafeArea = ({ testID = 'safearea', children, style }) => {
  if (!platform.isIphoneX) {
    return (
      <View testID={testID} style={[{ flex: 1, backgroundColor: '#f9f9f9' }, style && style]}>
        {children}
      </View>
    );
  }

  return (
    <SafeAreaView
      testID={testID}
      style={[
        {
          // height: Dimensions.get('window').height, // flash tabbar https://github.com/wix/react-native-navigation/issues/2849
          flex: 1,
          backgroundColor: '#fafafa'
        },
        style && style
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
