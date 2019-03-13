
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import platform from '../../theme/variables/platform';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF'
  },
  item: {
    paddingVertical: 18,
    paddingHorizontal: 10,
  },
  itemSelected: {
    paddingVertical: 18,
    paddingHorizontal: 10,
  },

  number: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  numberSelected: {
    fontSize: 24,
    marginTop: -2,
    fontWeight: '700',
    color: '#fe6529',
    textAlign: 'center',
    marginBottom: 4,
  },

  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    fontFamily: platform.titleFontfamily,
  },
  titleSelected: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fe6529',
    textAlign: 'center',
    fontFamily: platform.titleFontfamily,
  },
});

export default ({ title, total, onPress, isSelected = false }) => (
  <TouchableOpacity
    style={isSelected ? styles.itemSelected : styles.item}
    onPress={onPress}
  >
    <Text style={isSelected ? styles.numberSelected : styles.number}>{total}</Text>
    <Text style={isSelected ? styles.titleSelected : styles.title}>{title}</Text>
  </TouchableOpacity>
);

export const TabContainer = ({ children, style }) => (
  <View style={[styles.container, style]}>
    {children}
  </View>
);
