import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from '../../../elements/Icon/CustomIcon';

const Icon = ({ name, ...props, style }) => (
  <CustomIcon
    {...props}
    name={name}
    style={[style, { fontSize: 18, paddingBottom: 5 }]} // 1.5
    resizeMode="contain"
  />
);

export default class MenuItem extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    icon: PropTypes.string
  };

  static defaultProps = {
    onPress: () => {}
  };

  render() {
    const { title, icon } = this.props;
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          paddingVertical: 6,
          justifyContent: 'space-between'
        }}
        onPress={this.props.onPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name={icon}
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              paddingTop: 5
            }}
          />

          <Text
            style={{
              fontSize: 14,
              color: '#FFF',
              fontWeight: '800',
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {title}
          </Text>
        </View>
        {/* {icon && <Icon
                        source={icon}
                    />} */}

        <CustomIcon
          name="arrow_right"
          style={{
            // alignSelf: 'flex-end',
            color: '#fff',
            fontSize: 10,
            paddingTop: 5
          }}
        />
      </TouchableOpacity>
    );
  }
}
