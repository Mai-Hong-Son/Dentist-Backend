import React from 'react';
import { View, Animated, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-fast-image';
import platform from '../../theme/variables/platform';
import Dot from './Dot';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    // alignContent: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    height: platform.deviceHeight
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  image: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1
  }
});

export default class Gallery extends React.PureComponent {
  static propTypes = {
    initialIndex: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
    imageSize: PropTypes.number
  };

  static defaultProps = {
    imageSize: (platform.deviceWidth * 2.0) / 3
  };

  static getDerivedStateFromProps(props, state) {
    if (props.initialIndex !== state.index) {
      return {
        index: props.initialIndex
      };
    }
  }

  state = {
    index: 0,
    listHeight: platform.deviceHeight - 240
  };

  onPressItem(index) {
    this.gallery.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5
    });
  }

  onViewableItemsChanged = ({ viewableItems }) => {
    const index = viewableItems[0].index;
    Object.keys(this.dotRefs).forEach(field => {
      const ref = this.dotRefs[field];
      ref.setState({ active: String(index) === field });
    });
  };

  gallery = null;
  pagination = null;
  dotRefs = {};
  imagesHeight = {};

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: 40, width: '100%', alignItems: 'flex-end', paddingRight: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigator.dismissLightBox()}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{'XONG'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          pagingEnabled
          ref={ref => (this.gallery = ref)}
          data={this.props.items}
          horizontal
          style={{
            width: platform.deviceWidth,
            height: this.state.listHeight
          }}
          onViewableItemsChanged={this.onViewableItemsChanged.bind(this)}
          onScrollToIndexFailed={() => { }}
          initialScrollIndex={this.state.index}
          keyExtractor={(item, index) => String(index)}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              style={[
                styles.image,
                {
                  // marginHorizontal:
                  //   (platform.deviceWidth - this.props.imageSize) / 2,
                  width: platform.deviceWidth
                }
              ]}
              source={{ uri: item }}
              resizeMode={Image.resizeMode.contain}
            />
          )}
        />

        {/* <View style={styles.dotContainer} ref={ref => (this.pagination = ref)}>
          {this.props.items.map((item, index) => (
            <Dot
              ref={ref => (this.dotRefs[`${index}`] = ref)}
              key={index}
              active={index === this.props.initialIndex}
              onPress={() => this.onPressItem(index)}
            />
          ))}
        </View> */}
      </View>
    );
  }
}
