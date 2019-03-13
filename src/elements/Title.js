import React from 'react';
import { StyleSheet, Text } from 'react-native';
import platform from '../theme/variables/platform';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#474747',
    fontFamily: platform.titleFontfamily
  },
});

const Title = ({ style, children }) => <Text style={[style, styles.title]}>{children}</Text>;

export default Title;
