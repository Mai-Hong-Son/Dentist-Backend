import React from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { View, TouchableOpacity } from 'react-native';
import Image from 'react-native-fast-image';

const styles = {
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5
  },
  picture: {
    margin: 5,
    flexWrap: 'wrap',
    borderRadius: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4
    // elevation: 1
  }
};

const Picture = ({ size, url }) => (
  <Image
    style={{
      width: size,
      height: size
    }}
    source={{ uri: url }}
    resizeMode={Image.resizeMode.contain}
  />
);

export { Picture };

export default class Gallery extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    itemSize: PropTypes.number.isRequired
  };

  onShowImage(initialIndex) {
    Navigation.showLightBox({
      screen: 'gallery', // unique ID registered with Navigation.registerScreen
      passProps: {
        initialIndex,
        items: this.props.items
      },
      style: {
        backgroundBlur: 'none',
        backgroundColor: 'rgba(0,0,0, .68)',
        tapBackgroundToDismiss: true,

        justifyContent: 'center',
        alignItems: 'center'
      }
    });
  }

  render() {
    const { items, itemSize } = this.props;
    return (
      <View style={styles.gallery}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={String(index)}
            style={styles.picture}
            onPress={() => this.onShowImage(index)}
          >
            <Picture size={itemSize} url={item} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
