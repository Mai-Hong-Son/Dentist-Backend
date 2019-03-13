import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ScrollView, View } from 'react-native';
import FullGradient from '../../components/FullGradient';
import InfoPanel from './InfoPanel';
import FooterInformation from './FooterInformation';
import MenuItem from '../../theme/components/MenuItem';

import Divider from '../../elements/Divider/index';
import { t } from '../../utils/common';

export default class SideBar extends React.Component {
  renderItems() {
    return [
      {
        icon: 'tooth_search',
        title: t('sidebar.questions'),
        onPress: () => Navigation.handleDeepLink({ link: 'questions' })
      },
      {
        icon: 'bell',
        title: t('sidebar.notifications'),
        onPress: () =>
          Navigation.handleDeepLink({
            link: 'notifications'
          })
      }
    ].map((item, index) => <MenuItem key={index} {...item} />);
  }

  render() {
    return (
      <FullGradient>
        <View
          style={{
            flex: 1,
            marginRight: 30,
            marginLeft: 10
          }}
        >
          <InfoPanel />
          <Divider style={{ marginLeft: 0, marginRight: 0 }} />
          <ScrollView
            style={{
              marginTop: 14
            }}
          >
            {this.renderItems()}
          </ScrollView>
          <FooterInformation />
        </View>
      </FullGradient>
    );
  }
}
