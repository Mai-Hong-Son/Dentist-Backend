import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// import I18n from 'react-native-i18n';
// import * as commonActions from '../../store/actions/common';

import GenericModal from './GenericModal';
import Scale from '../utils/Scale';

const BUTTON_BACKGROUND_COLOR = ['#FB9F28', '#FC872B', '#FE712F'];

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: '700',
    fontSize: 13, //Scale.getSize(16),
    textAlign: 'center'
  },
  containerStyle: {
    paddingHorizontal: Scale.getSize(10),
    paddingVertical: Scale.getSize(10),
  }
});

export default class OptionButton extends React.PureComponent {
  static propTypes = {
    caption: PropTypes.string,
    highlight: PropTypes.bool,
    onPress: PropTypes.func,
    borderRadius: PropTypes.number,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    textStyle: PropTypes.object
  };

  static defaultProps = {
    caption: '',
    highlight: false,
    onPress: null,
    borderRadius: Scale.getSize(15)
  };

  render() {
    const { caption, highlight, onPress, style } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <GenericModal
          borderRadius={this.props.borderRadius}
          backgroundColor={
            highlight ? BUTTON_BACKGROUND_COLOR : ['#fff', '#fff', '#fff']
          }
          style={[styles.containerStyle, this.props.containerStyle]}
        >
          <Text
            style={[
              styles.textStyle,
              this.props.textStyle,
              { color: highlight ? '#fff' : '#474747' }
            ]}
          >
            {caption}
          </Text>
        </GenericModal>
      </TouchableOpacity>
    );
  }
}
