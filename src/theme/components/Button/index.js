import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../theme-context';

export default class Button extends React.Component {
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
          <TouchableOpacity
            activeOpacity={0.8}
            {...this.props}
            style={{ ...theme.Button, ...style }}
          >
            {children}
          </TouchableOpacity>
        )}
      </ThemeContext.Consumer>
    );
  }
}
