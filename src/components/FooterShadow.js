import React from 'react';
import { View } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import platform from '../theme/variables/platform';

export default ({ style, children }) =>
  platform.isAndroid ? null : (
    <BoxShadow
      style={style}
      setting={{
        width: platform.deviceWidth,
        border: 18,
        height: 1,
        x: 0,
        y: 10,
        radius: 10,
        backgroundColor: '#000000f0',
        style: {
          zIndex: 999,
          bottom: 0,
          opacity: 0
        }
      }}
    >
      {children}
    </BoxShadow>
  );
