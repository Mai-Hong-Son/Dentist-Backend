

import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import platform from '../../theme/variables/platform';


export default class FullGradient extends Component {
    render() {
        return (
            <LinearGradient
                colors={[platform.primaryColor, platform.primaryColorDarkness]}
                style={{
                    flex: 1,
                    padding: 20,
                    ...this.props.style
                }}
            >
                {this.props.children}
            </LinearGradient>
        )
    }
}