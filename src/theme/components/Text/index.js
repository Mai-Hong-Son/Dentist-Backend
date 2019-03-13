import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../theme-context';

export default class Text extends React.Component {
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
          <RNText {...this.props} style={{ ...theme.Text, ...style }}>
            {children}
          </RNText>
        )}
      </ThemeContext.Consumer>
    );
  }
}
