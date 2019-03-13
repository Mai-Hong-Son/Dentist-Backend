import { Navigation } from 'react-native-navigation';
import platform from './theme/variables/platform';

export default () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'login',
      navBarHidden: true
    },
    appStyle: {
      backButtonImage: require('./assets/images/buttons/arrow_back.png'),
      backButtonIconColor: platform.backButtonIconColor,
      hideBackButtonTitle: platform.hideBackButtonTitle
    }
  });
};
