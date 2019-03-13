import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Scale from '../../utils/Scale';

export default class GenericModal extends React.PureComponent {
  static propTypes = {
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.array,
    justifyContent: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    borderRadius: 15, //Scale.getSize(12),
    backgroundColor: ['#fff', '#fff'],
    justifyContent: 'center'
  };

  render() {
    const { borderRadius, backgroundColor, justifyContent } = this.props;

    return (
      <LinearGradient
        colors={backgroundColor}
        style={[styles.container, { borderRadius, justifyContent }, this.props.style]}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: Scale.getSize(3) },
    shadowColor: '#777',
    shadowOpacity: 0.3,
    shadowRadius: Scale.getSize(3),
    elevation: Scale.getSize(1)
  }
});
