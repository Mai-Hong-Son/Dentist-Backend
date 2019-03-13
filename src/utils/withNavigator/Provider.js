import React, { Component } from 'react';
import NavigationContext from './Context';

export default WrappedComponent => {
    class EnhancerContainer extends Component {
        static navigatorButtons = WrappedComponent.navigatorButtons;
        static navigatorStyle = WrappedComponent.navigatorStyle;

        constructor(props) {
            super(props);
            this._rootRefs = React.createRef();
        }

        render() {
            return (
                <NavigationContext.Provider value={{ navigationContext: this.props.navigator }}>
                    <WrappedComponent {...this.props} />
                </NavigationContext.Provider>
            );
        }
    }

    return EnhancerContainer;
};
