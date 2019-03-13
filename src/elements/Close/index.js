import React from 'react';
import { Text } from 'react-native';
import FullGradient from '../FullGradient';

export const BtnClose = () => (
  <FullGradient
    style={{
      width: 20,
      height: 20,
      borderRadius: 20 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5
    }}
  >
    <Text
      style={{
        fontSize: 20,
        color: '#fff',
        lineHeight: 20
      }}
    >
      ×
    </Text>
  </FullGradient>
);
