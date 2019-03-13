import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';

import CustomIcon from './CustomIcon';

export default class Icon extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.any,
    onPress: PropTypes.func
  };

  static defaultProps = {
    component: CustomIcon
  };

  renderIcon() {
    const IconComponent = this.props.component;

    const props = {
      ...this.props
    };
    delete props.component;

    return <IconComponent {...props} />;
  }

  render() {
    const { onPress } = this.props;

    if (onPress) {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          {this.renderIcon()}
        </TouchableWithoutFeedback>
      );
    }

    return this.renderIcon();
  }
}
