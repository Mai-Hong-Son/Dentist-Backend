import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import { PixelRatio, StyleSheet, Clipboard, ToastAndroid, Button, Text, View } from 'react-native';
// import { Content, Card, CardItem, Button, Text, View, Icon } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import RNUtils from 'react-native-agiletech';
import platform from '../../theme/variables/platform';

export default class Dialog extends React.Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    reload: PropTypes.func.isRequired
  };

  state = {
    shown: false
  };

  onCopy = () => {
    Clipboard.setString(this.props.uri);
    this.setState({ shown: false }, () => {
      platform.isAndroid
        ? ToastAndroid.showWithGravity(
            I18n.t('systems.browser.toast_copy'),
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        : alert(I18n.t('systems.browser.toast_copy'));
    });
  };

  onShare = () => {
    RNUtils.share({
      url: this.props.uri,
      subject: '',
      message: 'Share',
      title: 'Share'
    });
    this.setState({ shown: false });
  };

  onReload = () => {
    this.props.reload();
    this.setState({ shown: false });
  };

  render() {
    if (!this.state.shown) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Button onPress={this.onCopy} title={I18n.t('systems.browser.copy')} />
        <View style={styles.divider} />
        <Button onPress={this.onReload} title={I18n.t('systems.browser.refresh')} />
        <View style={styles.divider} />
        <Button onPress={this.onShare} title={I18n.t('systems.browser.share')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -5,
    right: -5
  },
  divider: {
    height: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    backgroundColor: '#ccc'
  }
});
