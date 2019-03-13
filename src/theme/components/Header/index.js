import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../theme-context';

export default class Header extends React.Component {
  static propTypes = {
    style: PropTypes.object
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { children, style } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <View {...this.props} style={{ ...theme.Header, ...style }}>
            {children}
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}
