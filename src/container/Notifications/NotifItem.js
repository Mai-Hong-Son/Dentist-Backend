import React from 'react';
import { Navigation } from 'react-native-navigation';
import path from 'object-path';
import RNUtils from 'react-native-agiletech';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import { connect } from 'react-redux';

import Interactable from 'react-native-interactable';
import Scale from '../../utils/Scale';
import platform from '../../theme/variables/platform';
import Icon from '../../elements/Icon/index';
import { markAsReadNotification } from '../../store/actions/notification';

@connect()
export default class NotifItem extends React.PureComponent {
  state = {
    animateDeltaX: new Animated.Value(0),
    animateOpacity: new Animated.Value(1),
    animateScale: new Animated.Value(1),

    currentMode: 'view',
    status: null
  };

  static getDerivedStateFromProps(props, state) {
    if (props.item.status !== state.status) {
      return {
        status: props.item.status
      };
    }

    return null;
  }

  onDeleteItem = () => {
    const { item } = this.props;

    Animated.parallel([
      Animated.timing(this.state.animateOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease
      }),
      Animated.timing(this.state.animateScale, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease
      })
    ]).start(() => {
      this.props.onDeleteOneItem(item);
      this.setState({
        animageOpacity: new Animated.Value(1),
        animateScale: new Animated.Value(1),
        animateDeltaX: new Animated.Value(0)
      });
    });
  };

  notificationClick = () => {
    const link = path.get(this, 'props.item.meta.onesignal.url');
    // CLICK AS STATUS = READ
    if (String(this.props.item.status) === '1') {
      this.props.dispatch(markAsReadNotification(this.props.item));
      this.setState({
        status: 3
      });
    }

    if (link) {
      const scheme = RNUtils.bundleIdentifier;
      console.log('link to', `${scheme}:${link}`);
      Navigation.handleDeepLink({
        link: `${scheme}:${link}`
      });
    }
  };

  render() {
    const { title, content } = this.props.item;
    const { status } = this.state;

    return (
      <View>
        <Animated.View style={[styles.container]}>
          <Interactable.View
            style={styles.contentTitleStyle}
            horizontalOnly
            snapPoints={[{ x: 0 }, { x: -20 }]}
            boundaries={{ right: 0 }}
            animatedValueX={this.state.animateDeltaX}
            onStop={e => {
              const { x } = e.nativeEvent;
              if (x > -10) {
                this.setState({
                  currentMode: 'view'
                });
              } else {
                this.setState({
                  currentMode: 'delete'
                });
              }
            }}
          >
            <TouchableOpacity onPress={this.notificationClick}>
              <Text
                style={[
                  styles.txtTitle,
                  status === 1 ? styles.txtContentUnread : styles.txtContentRead
                ]}
              >
                {title}
              </Text>
              <Text
                style={[
                  styles.txtContent,
                  status === 1 ? styles.txtContentUnread : styles.txtContentRead
                ]}
                numberOfLines={1}
              >
                {content}
              </Text>
            </TouchableOpacity>
          </Interactable.View>

          <View
            style={{
              justifyContent: 'center',
              paddingRight: Scale.getSize(15)
            }}
          >
            {this.state.currentMode === 'view' ? (
              <Animated.View
                style={{
                  position: 'absolute',
                  transform: [
                    {
                      scale: this.state.animateDeltaX.interpolate({
                        inputRange: [-20, -15, -5, 0],
                        outputRange: [0, 0, 1, 1]
                      })
                    }
                  ]
                }}
              >
                <TouchableOpacity
                  onPress={this.notificationClick}
                  hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                >
                  <Icon
                    name="arrow_right"
                    color={'rgb(91,91,91)'}
                    size={Scale.getSize(12)}
                  />
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <Animated.View
                style={{
                  position: 'absolute',
                  transform: [
                    {
                      scale: this.state.animateDeltaX.interpolate({
                        inputRange: [-20, -15, -5, 0],
                        outputRange: [1, 1, 0, 0]
                      })
                    }
                  ]
                }}
              >
                <TouchableOpacity
                  onPress={this.onDeleteItem}
                  hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                >
                  <Icon
                    name="times"
                    color={platform.primaryOrange}
                    size={Scale.getSize(16)}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </Animated.View>
        <View style={styles.line} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 20
  },
  txtTitle: {
    fontSize: Scale.getSize(16),
    fontWeight: '800',
    paddingBottom: Scale.getSize(8),
    color: platform.titleFontColor
  },
  txtContent: {
    fontSize: Scale.getSize(12),
    fontWeight: '800',
    color: platform.titleFontColor
  },

  txtContentUnread: {
    color: '#000'
  },
  txtContentRead: {
    color: 'rgb(137,137,137)'
  },
  contentTitleStyle: {
    flex: 1
  },
  line: {
    height: 1,
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: 'rgb(235,235,235)'
  }
});
