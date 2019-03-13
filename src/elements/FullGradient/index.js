import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

export default class FullGradient extends React.PureComponent {

  render() {
    return (
      <LinearGradient
        colors={['#FB9F28', '#FC872B', '#FE712F']}
        style={this.props.style}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}
