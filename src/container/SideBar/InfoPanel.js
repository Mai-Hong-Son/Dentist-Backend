import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getIdentity } from '../../store/selectors/auth';

@connect(state => ({
  identity: getIdentity(state)
}))
export default class InfoPanel extends Component {
  render() {
    const { identity } = this.props;
    if (!identity) {
      return <View />;
    }

    return (
      <TouchableOpacity
        onPress={() =>
          Navigation.handleDeepLink({
            link: 'profile'
          })
        }
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          alignItems: 'center'
        }}
      >
        <Image
          source={{ uri: identity.avatar_url }}
          resizeMode="contain"
          style={{ width: 54, height: 54, marginRight: 15, borderRadius: 32 }}
        />
        <View>
          <Text style={{ fontSize: 14, fontWeight: '800', color: '#fff' }}>
            {identity.username}
          </Text>
          {identity.position && (
            <Text style={{ fontSize: 12, color: '#fff' }}>
              {identity.position}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
