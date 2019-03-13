import React from 'react';
import { Button, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import SafeArea from '../SafeArea';
import platform from '../../theme/variables/platform';

export default class Notification extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    level: PropTypes.oneOf(['info', 'warning', 'danger', 'success']),
    message: PropTypes.any.isRequired,
    onPress: PropTypes.func
  };

  static defaultProps = {
    level: 'info'
  };

  render() {
    const { level, message, onPress } = this.props;
    let levelStyle = {
      paddingVertical: platform.isAndroid ? 0 : 20,
      width: platform.deviceWidth
    };
    switch (level) {
      case 'info':
        levelStyle = { info: true };
        break;
      case 'warning':
        levelStyle = { warning: true };
        break;
      case 'danger':
        levelStyle = { danger: true };
        break;
      case 'success':
        levelStyle = { success: true };
        break;

      default:
        break;
    }
    if (typeof message === 'string') {
      return (
        <SafeArea style={{ backgroundColor: platform.toolbarDefaultBg }}>
          <Button
            {...levelStyle}
            full
            onPress={onPress}
            style={{
              width: platform.deviceWidth,
              paddingTop: platform.isAndroid || platform.isIphoneX ? 8 : 20
            }}
            title={message}
          />
        </SafeArea>
      );
    }
    return (
      <SafeArea style={{ backgroundColor: platform.toolbarDefaultBg }}>
        <View style={levelStyle}>{message}</View>
      </SafeArea>
    );
  }
}
