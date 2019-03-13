import path from 'object-path';
import qs from 'qs';
import RNUtils from 'react-native-agiletech';
import screenPayload from './store/actions/screen';
import { logout } from './store/actions/auth';
import { t } from './utils/common';

// let beforeLink = '';
const linkPrefix = `${RNUtils.bundleIdentifier}://screens/`;

export default (dispatch, navigator, event) => {
  const { type, id, link } = event;

  if (type === 'DeepLink') {
    // onesignal deeplink
    console.log(event, '1s-deep');

    // match
    // vn.agiletech.ursmilesforad://screens/<SCREENID>

    if (link.startsWith(linkPrefix)) {
      navigator.toggleDrawer({
        side: 'right',
        animated: true,
        to: 'closed'
      });

      // open screen
      // in list
      const [screen, query] = link.substr(linkPrefix.length).split('?', 2);
      if (!['question_detail'].indexOf(screen)) {
        return;
      }

      const passProps = qs.parse(
        query.startsWith('?') ? query.substr(1) : query
      );
      navigator.push({
        screen,
        passProps
      });
      return;
    }
  }

  if (type === 'DeepLink' && link === 'notifications') {
    navigator.toggleDrawer({
      side: 'right',
      animated: true,
      to: 'open'
    });

    return;
  }

  if (type === 'DeepLink' && link === 'logout') {
    dispatch(logout());
    return;
  }

  if (type === 'DeepLink' && link === 'logout_via_sidebar') {
    navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'closed'
    });
    navigator.push({
      screen: 'login',
      title: t('profile.screen_title'),
      passProps: {
        from: 'sidebar'
      }
    });
    return;
  }

  if (type === 'DeepLink' && link === 'profile') {
    navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'closed'
    });

    navigator.push({
      screen: 'profile',
      title: t('profile.screen_title')
    });
    return;
  }

  if (type === 'DeepLink' && link === 'questions') {
    navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'closed'
    });

    navigator.switchToTab({
      tabIndex: 1
    });

    dispatch(screenPayload('question', event.payload));
    return;
  }

  if (type === 'DeepLink' && link === 'question_detail') {
    navigator.push({
      screen: 'question_detail',
      // title: t('tabs.question_detail'),
      passProps: {
        item: event.payload
      }
    });
    return;
  }

  if (type === 'NavBarButtonPress') {
    switch (id) {
      case 'menu':
        navigator.toggleDrawer({
          side: 'left',
          animated: true,
          to: 'open'
        });

        break;

      case 'go_home':
        navigator.switchToTab({
          tabIndex: 0
        });
        break;
      default:
    }
  }
};
