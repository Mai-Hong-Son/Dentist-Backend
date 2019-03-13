import React from 'react';
import InputFieldBase from '../../theme/components/LightInputField';

const InputField = ({ input, ...inputProps }) => (
    <InputFieldBase
        {...inputProps}
        placeholder={this.props.label}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
    />
);

export default InputField;
