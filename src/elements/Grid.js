import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  twoCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: 8,
  },
  colLeft: {
    flex: 3
  },

  colRight: {
    flex: 1
  },

  col: {
    flex: 1
  }
});

export const Gap = () => <View style={{ marginBottom: 10 }} />;

export const Col = ({ children, style }) => <View style={[styles.col, style]}>{children}</View>;

export const Row = ({ children, style }) =>
  (<View style={[styles.twoCol, style]}>{children}</View>);

export const Left = ({ children, style = {} }) =>
  (<View style={[styles.colLeft, style]}>{children}</View>);

export const Right = ({ children, style = {} }) =>
  (<View style={[styles.colRight, style]}>{children}</View>);
