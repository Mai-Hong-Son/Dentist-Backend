import React from 'react';
import { NativeModules, Linking, View } from 'react-native';
import I18n from 'react-native-i18n';
import { SubmissionError } from 'redux-form'; // ES6
import { connect } from 'react-redux';

import NetworkState from '../components/NetworkState';
import platform from '../theme/variables/platform';

const CommonUtils = NativeModules.CommonUtils;
/**
 * export all utils native methods
 */
export default { ...CommonUtils };

/**
 * Wrap component by theme
 * High Order Component
 */
export const HOC = WrappedComponent => {
  class EnhancerContainer extends React.Component {
    static navigatorButtons = WrappedComponent.navigatorButtons;
    static navigatorStyle = WrappedComponent.navigatorStyle;

    constructor(props) {
      super(props);
      this._rootRefs = React.createRef();
    }

    async componentDidMount() {
      if (platform.isAndroid === 'android') {
        Linking.getInitialURL().then(url => this.navigate(url));
      } else {
        Linking.addEventListener('url', this.handleOpenURL.bind(this));
      }
    }

    componentWillUnmount() {
      Linking.removeEventListener('url', this.handleOpenURL);
    }

    setToast = ({ navigator, level = 'info', message, delay = 3, onPress }) => {
      navigator.showInAppNotification({
        screen: 'notification',
        passProps: {
          level,
          message,
          onPress
        },
        autoDismissTimerSec: delay
      });
    };

    handleOpenURL(event) {
      this.navigate(event.url);
    }

    navigate = url => {
      const { navigator } = this.props;
      const route = url && url.replace(/.*?:\/\//g, '');
      const id = route && route.match(/\/([^/]+)\/?$/)[1];
      const routeName = route && route.split('/')[0];
      console.log('deeplink', route, id, routeName);
      // if (routeName === 'payment') {
      //   navigator.push({
      //     screen: findScreenById('my_order'),
      //     title: 'My Order',
      //     passProps: {
      //       status: id
      //     }
      //   });
      // }

      // if (routeName === 'payment') {
      //   navigate('People', { id, name: 'chris' });
      // }

      console.log('zzzz', navigator);
    };

    openBrowser = ({
      navigator,
      uri,
      title = getDomainName(uri),
      animationType = 'slide-up'
    }) =>
      navigator.showModal({
        screen: 'browser',
        title,
        passProps: { uri },
        animationType
      });

    exec(method = null, params = {}) {
      if (!method) {
        return false;
      }
      let element = this._rootRefs.current;
      if (!element) {
        return false;
      }
      let whatdog = 10;
      while (element._reactInternalFiber && whatdog > 0) {
        if (element[method]) {
          element[method](params);
          break;
        }
        element =
          element._reactInternalFiber.child &&
          element._reactInternalFiber.child.stateNode;
        if (!element) {
          break;
        }
        whatdog--;
      }
    }

    render() {
      const props = {
        // findScreenById,
        setToast: this.setToast.bind(this),
        openBrowser: this.openBrowser.bind(this),
        ...this.props
      };
      return (
        <View style={{ flex: 1 }}>
          <NetworkState
            onConnected={() => this.exec('onConnected')}
            onDisconnected={() => this.exec('onDisconnected')}
          />
          <WrappedComponent ref={this._rootRefs} {...props} />
        </View>
      );
    }
  }

  return EnhancerContainer;
};

// function mapStateToProps(state) {
//   return {
//     theme: state.theme
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({ ...commonActions }, dispatch)
//   };
// }

/**
 * Some function bellow is just for calculate snap carousel slide
 */
export const wp = percentage =>
  Math.round((percentage * platform.deviceWidth) / 100);
export const itemHorizontalMargin = wp(2);
const slideWidth = wp(75);
export const sliderWidth = platform.deviceWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

// reformat domain name to domain.example
export const getDomainName = url => {
  let hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf('://') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }
  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];
  hostname = hostname.replace('www.', '');

  return hostname;
};

// open uri in browser
export const openBrowser = ({
  navigator,
  uri,
  title = getDomainName(uri),
  animationType = 'slide-up'
}) =>
  navigator.showModal({
    screen: 'browser',
    title,
    passProps: { uri },
    animationType
  });

// setToast
export const setToast = ({
  navigator,
  level = 'info',
  message,
  onPress,
  delay = 3
}) =>
  navigator.showInAppNotification({
    screen: 'notification',
    passProps: {
      level,
      message,
      onPress
    },
    autoDismissTimerSec: delay
  });

export const dispatchAsync = dispatch => {
  return function __something_magic_creative_best_ever__(action) {
    return new Promise((resolve, reject) => {
      // inject callback function
      action.args.push((err, data) => {
        if (err) {
          // transform to redux form validate error
          if (err.statusCode === 422) {
            return reject(new SubmissionError(err.errors));
          }

          return reject(err);
        }

        resolve(data);
      });

      dispatch(action);
    });
  };
};

export const hiddenPhone = phone => {
  if (phone) {
    if (phone.length >= 9) {
      return (
        phone.substr(0, 4) +
        'x'.repeat(Math.max(0, phone.length - 4 - 3)) +
        phone.substr(-3, 3)
      );
    }
  }

  return '';
};

// short func
export const t = (...args) => I18n.t(...args);

export const connectAsync = (map2Props, map2Dispatch) =>
  connect(
    map2Props,
    dispatch => ({
      dispatch,
      dispatchAsync: dispatchAsync(dispatch),
      ...map2Dispatch
    })
  );
