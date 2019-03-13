import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// import platform from '../../theme/variables/platform';

import GenericModal from '../GenericModal';
import Scale from '../../utils/Scale';

export default class GenericButton extends React.PureComponent {
  static propTypes = {
    caption: PropTypes.string,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.array,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    textStyle: PropTypes.object
  };

  static defaultProps = {
    caption: '',
    onPress: null,
    backgroundColor: ['#FB9F28', '#FC872B', '#FE712F'],
    containerStyle: {
      paddingVertical: 13, // Scale.getSize(16),
      paddingHorizontal: 20, //Scale.getSize(42),
      minWidth: 210 // Scale.getSize(220)
    },
    textStyle: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: '800',
      fontSize: 14, // Scale.getSize(18)
    }
  };

  render() {
    const { caption } = this.props;

    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.7}>
        <GenericModal
          backgroundColor={this.props.backgroundColor}
          borderRadius={40}
          style={this.props.containerStyle}
        >
          <Text style={this.props.textStyle}>{caption}</Text>
        </GenericModal>
      </TouchableOpacity>
    );
  }
}
