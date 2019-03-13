import React, { Component } from 'react';
import InputFieldBase from '../../theme/components/LightInputField';

export default class InputField extends Component {
    render() {
        const { input, ...inputProps } = this.props;

        return (
            <InputFieldBase
                {...inputProps}
                placeholder={this.props.label}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
            />
        );
    }
}
