// notification icon on navbar

import React, { Component } from 'react';
import path from 'object-path';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import CustomIcon from '../elements/Icon/CustomIcon';
import platform from '../theme/variables/platform';

const styles = StyleSheet.create({
  badge: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 10,
    paddingHorizontal: 2,
    textAlign: 'center'
  },
  badgeContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
    backgroundColor: platform.primaryColor,
    position: 'absolute',
    padding: 4,
    top: 0,
    right: -8
  },
  bell: {
    color: '#000',
    paddingLeft: 20,
    fontSize: 18
  }
});

@connect(state => ({
  total: path.get(state, 'screen.notifications.total', 0)
}))
export default class NotificationBell extends Component {
  render() {
    return (
      <TouchableOpacity
        hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
        style={{
          paddingVertical: 10
        }}
        onPress={() =>
          Navigation.handleDeepLink({
            link: 'notifications'
          })
        }
      >
        <CustomIcon name="bell" style={styles.bell} />
        {!!this.props.total && ( // bugandroid  =))))
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>
              {this.props.total > 10 ? '10+' : this.props.total}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
