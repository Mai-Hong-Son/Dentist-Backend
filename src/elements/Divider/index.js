import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  div: {
    height: 1,
    // marginLeft: 10,
    // marginRight: 13,
    backgroundColor: '#eee' }
});

const Divider = ({ style }) => <View
  style={[styles.div, style]}
/>;

export default Divider;
