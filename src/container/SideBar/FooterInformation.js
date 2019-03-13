import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { t } from '../../utils/common';
import CustomIcon from '../../elements/Icon/CustomIcon';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20
  }
});

const LogoutIcon = () => (
  <CustomIcon name="logout" style={{ fontSize: 18, color: '#fff' }} />
);

const FooterInformation = () => (
  <View
    style={{
      flexDirection: 'row-reverse'
    }}
  >
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        Navigation.handleDeepLink({
          link: 'logout'
        })
      }
    >
      <LogoutIcon />
      <Text style={styles.text}>
        {'  '}
        {t('sidebar.logout_link')}
      </Text>
    </TouchableOpacity>
  </View>
);

export default FooterInformation;
