import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, WebView, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import SafeArea from '../SafeArea';
import Dialog from './Dialog';
import styles from './styles';

export default class Browser extends React.Component {
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'browser_btn_back',
        icon: require('../../assets/images/buttons/arrow_back.png')
      }
    ],
    rightButtons: [
      {
        id: 'browser_btn_more',
        icon: require('../../assets/images/buttons/ellipsis_v.png')
      }
    ]
  };
  static propTypes = {
    uri: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    // this.setAnimation = this.setAnimation.bind(this);
    this.onShouldStartLoadWithRequest = this.onShouldStartLoadWithRequest.bind(this);
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start(() => this.animation && this.animation.play());
  }

  setAnimation(animation) {
    this.animation = animation;
  }

  onNavigatorEvent({ type, id }) {
    if (type === 'NavBarButtonPress') {
      switch (id) {
        case 'browser_btn_more':
          this.refs._dialog.setState(prev => ({
            shown: !prev.shown
          }));
          break;
        case 'browser_btn_back':
          this.props.navigator.dismissModal({
            animationType: 'slide-down'
          });
          break;

        default:
          break;
      }
    }
  }

  onShouldStartLoadWithRequest = ({ url, canGoBack, canGoForward, loading, target, title }) => {
    if (url === this.props.uri) {
      return true;
    }
    this.webviewRef.stopLoading();
    return false;
  };

  renderLoading = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.loading}>
        <LottieView
          ref={this.setAnimation}
          progress={this.state.progress}
          source={require('../../assets/lotties/material_wave_loading.json')}
          loop
          autoPlay
          enableMergePathsAndroidForKitKatAndAbove
        />
      </View>
    </View>
  );

  renderError = error => (
    <View style={styles.anounceContainer}>
      <View style={styles.error}>
        <LottieView
          ref={this.setAnimation}
          style={{ }} // disable warning - https://github.com/react-community/lottie-react-native/issues/243
          progress={this.state.progress}
          source={require('../../assets/lotties/empty_list.json')}
          loop
          autoPlay
          enableMergePathsAndroidForKitKatAndAbove
        />
      </View>
      <Text style={styles.msgError}>{error}</Text>
      <Text style={styles.msgError2}>
        We can't display the webpage because your mobile phone isn't connected to internet (and/or
        website not available etc...)
      </Text>
    </View>
  );

  render() {
    const { uri } = this.props;
    return (
      <SafeArea>
        <WebView
          ref={ref => (this.webviewRef = ref)}
          source={{ uri }}
          style={styles.webview}
          javaScriptEnabled
          scalesPageToFit
          startInLoadingState
          thirdPartyCookiesEnabled={false}
          mediaPlaybackRequiresUserAction
          allowsInlineMediaPlayback
          shouldRasterizeIOS
          renderToHardwareTextureAndroid
          automaticallyAdjustContentInsets
          renderError={this.renderError}
          renderLoading={this.renderLoading}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
          onNavigationStateChange={this.onShouldStartLoadWithRequest}
          onError={() => this.animation && this.animation.play()}
          onLoadStart={() => this.animation && this.animation.play()}
          onLoadStart={() => this.animation && this.animation.play()}
        />
        <Dialog ref="_dialog" uri={uri} reload={() => this.webviewRef.reload()} />
      </SafeArea>
    );
  }
}
