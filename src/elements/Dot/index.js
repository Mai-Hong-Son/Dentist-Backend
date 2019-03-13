import React from 'react';
import { StyleSheet } from 'react-native';
import FullGradient from '../FullGradient';

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 3
  }
});

const Dot = ({ style }) => (
  <FullGradient
    style={[styles.dot, style]}
  />
);

export default Dot;
