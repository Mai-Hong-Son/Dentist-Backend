import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
// import firebase from 'react-native-firebase';
import * as commonActions from '../../store/actions/common';
import SafeArea from '../../components/SafeArea';
import { getIdentity } from '../../store/selectors/auth';
import { t } from '../../utils/common';
import NavigationEvent from '../../NavigationEvent';
import platform from '../../theme/variables/platform';

@connect(
  state => ({
    identity: getIdentity(state)
  }),
  null
)
export default class Profile extends React.Component {
  static navigatorStyle = {
    // tabBarHidden: true, // use toggleTab
    drawUnderTabBar: true
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);

      if (event.id === 'willAppear') {
        this.props.navigator.setDrawerEnabled({
          side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
          enabled: false // should the drawer be enabled or disabled (locked closed)
        });

        this.props.navigator.toggleTabs({
          to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
          animated: true // does the toggle have transition animation or does it happen immediately (optional)
        });
        return;
      }
    }

    if (event.id === 'willDisappear') {
      this.props.navigator.setDrawerEnabled({
        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        enabled: true // should the drawer be enabled or disabled (locked closed)
      });
      this.props.navigator.toggleTabs({
        to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        animated: true // does the toggle have transition animation or does it happen immediately (optional)
      });

      return;
    }
  }

  render() {
    const { identity } = this.props;

    return (
      <SafeArea>
        <View style={styles.avaContainer}>
          <Image style={styles.avatar} source={{ uri: identity.avatar_url }} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{identity.fullname}</Text>
          <View style={styles.underline} />
          <Text style={styles.otherTxt}>{identity.username}</Text>
          <View style={styles.underline} />
          <Text style={styles.otherTxt}>{identity.email}</Text>
          <View style={styles.underline} />
          <Text style={styles.otherTxt}>{identity.phone}</Text>
          <View style={styles.underline} />
          <Text style={styles.otherTxt}>{identity.position}</Text>
          <View style={styles.underline} />
        </View>
      </SafeArea>
    );
  }
}

const styles = {
  avatar: {
    width: platform.deviceWidth / 4,
    height: platform.deviceWidth / 4,
    borderRadius: platform.deviceWidth / 8
  },
  avaContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
    flex: 1
  },
  infoContainer: {
    flex: 2,
    marginHorizontal: 30
  },
  userName: {
    fontSize: 20,
    color: '#515151',
    fontWeight: '800'
  },
  otherTxt: {
    fontSize: 15,
    color: '#515151',
    fontWeight: '700'
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
    marginTop: 10,
    marginBottom: 20
  }
};
