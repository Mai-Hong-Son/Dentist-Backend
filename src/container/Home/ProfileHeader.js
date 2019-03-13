import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import platform from '../../theme/variables/platform';
import { getIdentity } from '../../store/selectors/auth';

@connect(state => ({
  identity: getIdentity(state)
}))
export default class ProfileHeader extends Component {
  render() {
    const { identity } = this.props;
    if (!identity) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: identity.avatar_url }} />
        <Text style={styles.username}>{identity.fullname}</Text>
        {identity.workplace && (
          <Text style={styles.workplace}>{identity.workplace}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    height: platform.deviceHeight * 0.30
  },
  avatar: {
    width: platform.deviceWidth / 4,
    height: platform.deviceWidth / 4,
    borderRadius: platform.deviceWidth / 8
  },
  username: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '700',
    color: '#515151'
  },
  workplace: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b0b0b0',
    marginTop: 5
  }
});
