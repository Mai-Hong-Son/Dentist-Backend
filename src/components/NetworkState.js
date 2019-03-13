import React from 'react';
import PropType from 'prop-types';
import { View, Text, NetInfo, StyleSheet, LayoutAnimation, UIManager } from 'react-native';
import I18n from 'react-native-i18n';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type Props = {
  onDisconnected: Function,
  onConnected: Function
};
export default class NetworkState extends React.Component<Props> {
  static defaultProps = {
    onDisconnected: undefined,
    onConnected: undefined
  };

  constructor(props) {
    super(props);

    NetInfo.addEventListener('connectionChange', this.onConnectionChange);
    this._rootRef = React.createRef();
    this.state = {
      isConnected: true,
      hide: true
    };
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(this.onConnectionChange);
  }

  onConnectionChange = ({ type }) => {
    const isConnected = type.toLowerCase() !== 'none' && type.toLowerCase() !== 'unknown';
    if (isConnected && this.state.isConnected) {
      return;
    }

    // callback function
    const { onConnected, onDisconnected } = this.props;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ isConnected, hide: false });
    if (isConnected) {
      onConnected && onConnected();
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.setState({ hide: true });
      }, 2000);
      return;
    }
    onDisconnected && onDisconnected();
  };

  render() {
    if (this.state.isConnected && this.state.hide) {
      return <View />;
    }

    return (
      <View
        style={[
          styles.connectionContainer,
          this.state.isConnected && { backgroundColor: '#8BC34A' }
        ]}
      >
        <Text style={styles.connectionText}>
          {this.state.isConnected
            ? I18n.t('systems.netinfo.online')
            : I18n.t('systems.netinfo.offline')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionContainer: {
    backgroundColor: '#FDAE3A'
  },
  connectionText: {
    alignSelf: 'center',
    color: '#fff',
    paddingVertical: 3
  }
});
