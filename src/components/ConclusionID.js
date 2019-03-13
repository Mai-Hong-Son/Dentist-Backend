import React from 'react';
import { Text } from 'react-native';

export default ({ item }) => (
  <Text
    style={{
      fontSize: 13,
      color: '#bbb',
      fontWeight: '800'
    }}
  >
    {'ID#'}
    {item.id}
  </Text>
);
