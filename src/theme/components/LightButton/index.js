import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../theme-context';

export default class LightButton extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        textStyle: PropTypes.object,
    };

    static defaultProps = {
        style: {},
        textStyle: {},
    };

    render() {
        const { children, style, textStyle } = this.props;

        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        {...this.props}
                        style={{ ...theme.LightButton, ...style }}
                    >
                        {typeof children === 'string'
                            ? <Text
                                style={{
                                    ...theme.LightButtonText,
                                    ...textStyle
                                }}
                            >{children}</Text> : children}
                    </TouchableOpacity>
                )}
            </ThemeContext.Consumer>
        );
    }
}
