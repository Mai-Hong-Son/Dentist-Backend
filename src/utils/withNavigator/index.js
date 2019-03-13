import React, { Component } from 'react';
import NavigationContext from './Context';
import NavigatorProvider from './Provider';

export { NavigatorProvider };

// withNavigator(propsName)
export default (navigator = 'navigator') => WrappedComponent => {
  class EnhancerContainer extends Component {
    static navigatorButtons = WrappedComponent.navigatorButtons;
    static navigatorStyle = WrappedComponent.navigatorStyle;

    constructor(props) {
      super(props);
      this._rootRefs = React.createRef();
    }

    render() {
      return (
        <NavigationContext.Consumer>
          {context => {
            const contextProps = { [navigator]: () => {} };
            if (context.navigationContext) {
              contextProps[navigator] = context.navigationContext;
            }

            return <WrappedComponent {...this.props} {...contextProps} />;
          }}
        </NavigationContext.Consumer>
      );
    }
  }

  return EnhancerContainer;
};
