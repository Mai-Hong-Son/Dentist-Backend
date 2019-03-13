import { Navigation } from 'react-native-navigation';
import { t } from './utils/common';
import { iconsMap } from './utils/AppIcons';
import platform from './theme/variables/platform';

// console.disableYellowBox = true;
const styles = {
  iconInsets: {
    top: 0, // optional, default is 0.
    left: 0, // optional, default is 0.
    bottom: 0, // optional, default is 0.
    right: 0 // optional, default is 0.
  }
};

export default currentState => {
  const tabs = [
    {
      label: t('tabs.home'),
      screen: 'home',
      icon: iconsMap.home,
      // selectedIcon: iconsMap.home,
      iconInsets: styles.iconInsets,
      passProps: { iconsMap },
      title: t('home.title'),
      navigatorButtons: {
        leftButtons: [
          {
            testID: 'menu',
            title: 'Menu',
            id: 'menu',
            icon: iconsMap['drawer--nav']
          }
        ],
        rightButtons: [
          {
            component: 'notification_bell'
          }
        ]
      }
    },
    {
      label: t('tabs.question'),
      screen: 'question',
      icon: iconsMap.tooth_search,
      iconInsets: styles.iconInsets,
      title: t('questions.screen_title'),

      navigatorButtons: {
        leftButtons: [
          {
            testID: 'go_home',
            title: null,
            // title: undefined, //'Back',
            id: 'go_home',
            icon: iconsMap['arrow_back--nav']
          }
        ]
      }
    },
    // {
    //   label: undefined,
    //   screen: 'home',
    //   icon: require('./assets/images/buttons/ursmiles.png'),
    //   disableOverlay: true,
    //   iconInsets: {
    //     top: 6, // optional, default is 0.
    //     left: 0, // optional, default is 0.
    //     bottom: -6, // optional, default is 0.
    //     right: 0 // optional, default is 0.
    //   },
    //   disabled: true
    // },
    // {
    //   label: t('tabs.schedule'), //I18n.t('tabs.schedule'),
    //   screen: 'my_schedule',
    //   icon: iconsMap.calendar_check,
    //   selectedIcon: iconsMap.calendar_check,
    //   iconInsets: styles.iconInsets,
    //   title: 'Lịch hẹn', // I18n.t('tabs.my_account')
    //   navigatorButtons: {
    //     leftButtons: [
    //       {
    //         testID: 'go_home',
    //         title: null,
    //         // title: undefined, //'Back',
    //         id: 'go_home',
    //         icon: iconsMap['arrow_back--nav']
    //       }
    //     ]
    //   }
    // },
    // {
    //   label: t('tabs.service'), // I18n.t('tabs.service')
    //   screen: 'service',
    //   icon: iconsMap.service,
    //   selectedIcon: iconsMap.service,
    //   iconInsets: styles.iconInsets,
    //   title: t('tabs.service') // I18n.t('tabs.my_account')
    // }
  ];

  Navigation.startTabBasedApp({
    tabs,
    tabsStyle: {
      tabBarButtonColor: platform.tabBarButtonColor,
      tabBarSelectedButtonColor: platform.tabBarSelectedButtonColor,
      tabBarBackgroundColor: platform.tabBarBackgroundColor,
      initialTabIndex: 0,
      tabBarHideShadow: false
    },
    appStyle: {
      forceTitlesDisplay: platform.forceTitlesDisplay,
      // tabBarButtonColor: '#999',
      navBarNoBorder: true,
      statusBarHidden: false,
      drawUnderStatusBar: platform.drawUnderStatusBar,
      tabBarSelectedButtonColor: platform.tabBarSelectedButtonColor,
      navBarTitleTextCentered: platform.navBarTitleTextCentered,
      // keepStyleAcrossPush: platform.keepStyleAcrossPush,
      topBarElevationShadowEnabled: platform.topBarElevationShadowEnabled,
      navBarTextColor: platform.navBarTextColor,
      navBarButtonColor: platform.navBarButtonColor,
      navBarLeftButtonColor: platform.navBarLeftButtonColor,
      navBarBackgroundColor: platform.toolbarDefaultBg,
      screenBackgroundColor: platform.containerBg,
      // orientation: 'both',
      orientation: 'portrait',
      // bottomTabBadgeTextColor: platform.bottomTabBadgeTextColor,
      // bottomTabBadgeBackgroundColor: platform.bottomTabBadgeBackgroundColor,
      backButtonImage: iconsMap['arrow_back--nav'],
      backButtonIconColor: platform.backButtonIconColor,
      hideBackButtonTitle: platform.hideBackButtonTitle,
      statusBarTextColorScheme: platform.iosStatusbar,
      statusBarColor: platform.statusBarColor,

      navBarTextFontFamily: platform.navBarTextFontFamily,
      navBarTextFontSize: platform.navBarTextFontSize
    },
    drawer: {
      left: {
        screen: 'sidebar',
        passProps: { locale: currentState.locale, iconsMap }
      },
      right: {
        screen: 'notifications',
        passProps: { locale: currentState.locale, iconsMap }
      },
      style: {
        // ( iOS only )
        drawerShadow: false,
        contentOverlayColor: 'rgba(0,0,0,0.5)',
        leftDrawerWidth: 80,
        rightDrawerWidth: 80
      },
      disableOpenGesture: false
    },
    passProps: {
      locale: currentState.locale,
      iconsMap
    },
    animationType: 'fade'
  });
};
